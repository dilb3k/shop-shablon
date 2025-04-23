import React, { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, Phone, MoreVertical } from "lucide-react";
import { getChatRooms, sendMessage, getMessages, markMessageAsRead } from "../../../api/message/router";

const ChatBox = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [showChatList, setShowChatList] = useState(true);
    const messagesEndRef = useRef(null);
    const [websocket, setWebsocket] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("disconnected");

    // Get user data
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
    }, []);

    // Load chat rooms
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("access_token");
                if (!token) return;

                const roomsData = await getChatRooms(token);
                setChatRooms(roomsData);
            } catch (error) {
                console.error("Error loading chat rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatRooms();
    }, []);

    // Load messages and setup WebSocket
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedRoom) return;

            try {
                setLoading(true);
                const token = localStorage.getItem("access_token");
                if (!token) return;

                const messagesData = await getMessages(token, selectedRoom.id);
                setMessages(messagesData);
            } catch (error) {
                console.error("Error loading messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();

        if (selectedRoom) {
            let ws = null;
            let connectionAttempts = 0;
            const maxAttempts = 3;
            let pollingInterval = null;

            const connectWebSocket = () => {
                try {
                    const token = localStorage.getItem("access_token");
                    if (!token) return;

                    // Use current host for WebSocket URL
                    const wsUrl = `ws://${window.location.host}/ws/chat/${selectedRoom.id}/?token=${token}`;

                    console.log(`Connecting to WebSocket: ${wsUrl}`);

                    ws = new WebSocket(wsUrl);
                    setConnectionStatus("connecting");

                    ws.onopen = () => {
                        console.log('WebSocket connected');
                        setConnectionStatus("connected");
                        connectionAttempts = 0;
                        if (pollingInterval) {
                            clearInterval(pollingInterval);
                            pollingInterval = null;
                        }
                    };

                    ws.onmessage = (event) => {
                        try {
                            const data = JSON.parse(event.data);
                            setMessages(prevMessages => [
                                ...prevMessages,
                                {
                                    id: Date.now(),
                                    content: data.message,
                                    sender: { id: parseInt(data.sender_id) },
                                    timestamp: new Date().toISOString(),
                                    read: false
                                }
                            ]);
                        } catch (error) {
                            console.error('Error parsing message:', error);
                        }
                    };

                    ws.onerror = (error) => {
                        console.error('WebSocket error:', error);
                        setConnectionStatus("error");
                        if (connectionAttempts < maxAttempts) {
                            connectionAttempts++;
                            console.log(`Retrying connection (attempt ${connectionAttempts})`);
                            setTimeout(connectWebSocket, 2000);
                        } else {
                            console.log('Max connection attempts reached, falling back to polling');
                            setupPollingFallback();
                        }
                    };

                    ws.onclose = (event) => {
                        console.log(`WebSocket closed: ${event.code} - ${event.reason}`);
                        setConnectionStatus("disconnected");
                        if (event.code !== 1000) {
                            if (connectionAttempts < maxAttempts) {
                                connectionAttempts++;
                                setTimeout(connectWebSocket, 2000);
                            }
                        }
                    };

                    setWebsocket(ws);
                } catch (error) {
                    console.error('WebSocket connection error:', error);
                    setConnectionStatus("error");
                }
            };

            const setupPollingFallback = () => {
                if (pollingInterval) return;

                console.log('Setting up polling fallback');
                const poll = async () => {
                    try {
                        const token = localStorage.getItem("access_token");
                        if (!token) return;

                        const messagesData = await getMessages(token, selectedRoom.id);
                        setMessages(messagesData);
                    } catch (error) {
                        console.error("Polling error:", error);
                    }
                };

                // Immediate poll
                poll();
                // Then every 5 seconds
                pollingInterval = setInterval(poll, 5000);
            };

            connectWebSocket();

            return () => {
                if (ws) {
                    ws.close();
                }
                if (pollingInterval) {
                    clearInterval(pollingInterval);
                }
            };
        }
    }, [selectedRoom]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Mark messages as read
    useEffect(() => {
        const markUnreadMessages = async () => {
            if (!selectedRoom || !user) return;

            try {
                const token = localStorage.getItem("access_token");
                if (!token) return;

                const unreadMessages = messages.filter(
                    (msg) => !msg.read && msg.sender.id !== user.id
                );

                for (const msg of unreadMessages) {
                    await markMessageAsRead(token, msg.id);
                }
            } catch (error) {
                console.error("Error marking messages as read:", error);
            }
        };

        markUnreadMessages();
    }, [messages, selectedRoom, user]);

    // Send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !selectedRoom || !user) return;

        let tempId;
        try {
            const token = localStorage.getItem("access_token");
            if (!token) return;

            // Optimistic UI update
            tempId = Date.now();
            setMessages(prev => [
                ...prev,
                {
                    id: tempId,
                    content: newMessage,
                    sender: { id: user.id },
                    timestamp: new Date().toISOString(),
                    read: true
                }
            ]);

            // Send via WebSocket if available
            if (websocket && websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify({
                    message: newMessage,
                    sender_id: user.id
                }));
            } else {
                // Fallback to REST API
                await sendMessage(token, {
                    room: selectedRoom.id,
                    content: newMessage
                });
                // Refresh messages
                const messagesData = await getMessages(token, selectedRoom.id);
                setMessages(messagesData);
            }

            setNewMessage("");
            scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
            // Remove optimistic update if failed
            setMessages(prev => prev.filter(msg => msg.id !== tempId));
        }
    };

    // Helper functions
    const selectChatRoom = (room) => {
        setSelectedRoom(room);
        setShowChatList(false);
    };

    const goBackToList = () => {
        setShowChatList(true);
    };

    const getChatRoomName = (room) => {
        if (!room || !user) return "";
        if (!room.is_group) {
            const otherParticipant = room.participants.find(p => p.id !== user.id);
            return otherParticipant?.username || "Unknown";
        }
        return room.name;
    };

    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const isCurrentUser = (senderId) => {
        return user && user.id === senderId;
    };

    return (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-96 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-yellow-500 text-black p-4 flex items-center justify-between">
                {!showChatList && (
                    <button onClick={goBackToList} className="mr-2">
                        <ArrowLeft size={20} />
                    </button>
                )}
                <h2 className="font-bold text-lg flex-grow">
                    {showChatList ? "Chatlar" : getChatRoomName(selectedRoom)}
                </h2>
                {!showChatList && (
                    <div className="flex gap-3">
                        <button className="text-black/70 hover:text-black">
                            <Phone size={20} />
                        </button>
                        <button className="text-black/70 hover:text-black">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Chat list or messages */}
            <div className="flex-grow overflow-auto bg-black/5">
                {showChatList ? (
                    // Chat rooms list
                    <div className="divide-y divide-gray-200">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                            </div>
                        ) : chatRooms.length === 0 ? (
                            <div className="text-center p-6 text-white/60">
                                <p>Hozircha chat xonalari yo'q</p>
                            </div>
                        ) : (
                            chatRooms.map((room) => (
                                <div
                                    key={room.id}
                                    onClick={() => selectChatRoom(room)}
                                    className="p-4 hover:bg-white/10 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500/70 flex items-center justify-center text-black font-bold">
                                            {getChatRoomName(room).charAt(0).toUpperCase()}
                                        </div>
                                        <div className="ml-3 flex-grow">
                                            <h3 className="font-medium text-white/80">{getChatRoomName(room)}</h3>
                                            <p className="text-white/60 text-sm truncate">
                                                {room.last_message?.content || "Hozircha xabarlar yo'q"}
                                            </p>
                                        </div>
                                        {room.unread_count > 0 && (
                                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-black font-bold">
                                                {room.unread_count}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    // Messages
                    <div className="flex flex-col-reverse p-4 space-y-reverse space-y-3">
                        <div ref={messagesEndRef} />
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-10 text-white/60">
                                <p>Hozircha xabarlar yo'q</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${isCurrentUser(msg.sender.id) ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${isCurrentUser(msg.sender.id)
                                            ? "bg-yellow-500 text-black"
                                            : "bg-white/20 text-white/90"
                                            }`}
                                    >
                                        <p>{msg.content}</p>
                                        <p className={`text-xs mt-1 ${isCurrentUser(msg.sender.id) ? "text-black/70" : "text-white/60"
                                            }`}>
                                            {formatMessageTime(msg.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Message input */}
            {!showChatList && (
                <form onSubmit={handleSendMessage} className="p-3 bg-black/10 border-t border-white/10 flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Xabar yozing..."
                        className="flex-grow bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white/80 placeholder-white/50 focus:ring-2 focus:ring-yellow-500/50"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="ml-2 bg-yellow-500 text-black p-2 rounded-xl disabled:opacity-50"
                    >
                        <Send size={20} />
                    </button>
                </form>
            )}
        </div>       
    );
};

export default ChatBox;