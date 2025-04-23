"use client"

import { useState } from "react"
import { LoginForm } from "../components/Componients/Login/LoginForm"
import { SidebarProvider } from "../components/Componients/Message/ui/sidebar"
import ChatInterface from "../components/Componients/Message/chat-interface"
import UserSidebar from "../components/Componients/Message/user-sidebar"
import { AuthProvider } from "../components/Componients/Message/Context/AuthContext"
import { ChatProvider } from "../components/Componients/Message/Context/ChatCotext"


// Wrapper component to handle authentication state
function ChatApp() {
    const { isAuthenticated, isLoading } = useAuth()
    const [selectedUser, setSelectedUser] = useState < string | null > (null)

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <LoginForm />
    }

    return (
        <main className="flex min-h-screen bg-gray-50">
            <SidebarProvider>
                <UserSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
                <div className="flex-1 p-4 flex items-center justify-center">
                    <div className="w-full max-w-4xl h-[80vh] shadow-xl rounded-xl overflow-hidden border border-gray-200">
                        <ChatInterface selectedUser={selectedUser} />
                    </div>
                </div>
            </SidebarProvider>
        </main>
    )
}

export default function Home() {
    return (
        <AuthProvider>
            <ChatProvider>
                <ChatApp />
            </ChatProvider>
        </AuthProvider>
    )
}

