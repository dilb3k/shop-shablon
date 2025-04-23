import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ChatList = ({ user }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const response = await axios.get('/api/chat-rooms/');
                const roomsWithDefaults = response.data.map(room => ({
                    ...room,
                    name: room.name || 'Unnamed Chat',
                    participants: room.participants || [],
                    last_message: room.last_message ? {
                        ...room.last_message,
                        sender: room.last_message.sender || { username: 'Unknown' },
                        content: room.last_message.content || ''
                    } : null
                }));
                setChatRooms(roomsWithDefaults);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching chat rooms:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchChatRooms();
    }, []);

    const filteredRooms = chatRooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.participants.some(p =>
            p?.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Chats</h2>
                <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="divide-y">
                {filteredRooms.length > 0 ? (
                    filteredRooms.map(room => (
                        <Link
                            key={room.id}
                            to={`/chat/${room.id}`}
                            className="block p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{room.name}</h3>
                                    {room.last_message && (
                                        <p className="text-sm text-gray-500 truncate">
                                            {room.last_message.sender.username}: {room.last_message.content}
                                        </p>
                                    )}
                                </div>
                                {room.last_message && (
                                    <span className="text-xs text-gray-400">
                                        {new Date(room.last_message.timestamp).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No chat rooms found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;