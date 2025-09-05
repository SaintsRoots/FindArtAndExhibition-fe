import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, MessageCircle, Image, Paperclip, X } from 'lucide-react';

const ChatSystem = ({ currentUser, apiBaseUrl = '/api/v1' }) => {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [artists, setArtists] = useState([]);
    const [showArtists, setShowArtists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (currentUser) {
            fetchConversations();
            fetchArtists();
        }
    }, [currentUser]);

    useEffect(() => {
        if (activeConversation) {
            fetchMessages();
        }
    }, [activeConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/messages/conversations/${currentUser._id}`);
            const result = await response.json();
            if (result.status === "200") {
                setConversations(result.data);
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchArtists = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/messages/artists/all`);
            const result = await response.json();
            if (result.status === "200") {
                setArtists(result.data);
            }
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const fetchMessages = async () => {
        if (!activeConversation) return;
        
        setLoading(true);
        try {
            const otherUser = activeConversation.participants.find(p => p._id !== currentUser._id);
            const response = await fetch(`${apiBaseUrl}/messages/${currentUser._id}/${otherUser._id}`);
            const result = await response.json();
            if (result.status === "200") {
                setMessages(result.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if ((!newMessage.trim() && !selectedFile) || !activeConversation) return;

        const otherUser = activeConversation.participants.find(p => p._id !== currentUser._id);
        
        try {
            const formData = new FormData();
            formData.append('sender', currentUser._id);
            formData.append('receiver', otherUser._id);
            formData.append('content', newMessage.trim() || 'File sent');
            
            if (selectedFile) {
                formData.append('file', selectedFile);
                formData.append('messageType', selectedFile.type.startsWith('image/') ? 'image' : 'file');
            }

            const response = await fetch(`${apiBaseUrl}/messages`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.status === "201") {
                setMessages([...messages, result.data]);
                setNewMessage('');
                setSelectedFile(null);
                fetchConversations(); // Refresh conversations
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const startNewConversation = async (artist) => {
        try {
            const response = await fetch(`${apiBaseUrl}/messages/conversation/${currentUser._id}/${artist._id}`);
            const result = await response.json();
            if (result.status === "200") {
                setActiveConversation(result.data);
                setMessages([]);
                setShowArtists(false);
            }
        } catch (error) {
            console.error('Error starting conversation:', error);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 bg-white border-r border-gray-200">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Messages</h2>
                        <button
                            onClick={() => setShowArtists(!showArtists)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                        >
                            <Users size={20} />
                        </button>
                    </div>
                </div>

                {/* Artists List */}
                {showArtists && (
                    <div className="p-4 bg-blue-50 border-b border-gray-200">
                        <h3 className="font-medium mb-2">Start a conversation</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {artists.map(artist => (
                                <div
                                    key={artist._id}
                                    onClick={() => startNewConversation(artist)}
                                    className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                                >
                                    <img
                                        src={artist.img}
                                        alt={artist.name}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <div>
                                        <div className="font-medium text-sm">{artist.name}</div>
                                        <div className="text-xs text-gray-500">{artist.province}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Conversations List */}
                <div className="overflow-y-auto">
                    {conversations.map(conversation => {
                        const otherUser = conversation.participants.find(p => p._id !== currentUser._id);
                        return (
                            <div
                                key={conversation._id}
                                onClick={() => setActiveConversation(conversation)}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                    activeConversation?._id === conversation._id ? 'bg-blue-50' : ''
                                }`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={otherUser.img}
                                        alt={otherUser.name}
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">{otherUser.name}</h3>
                                            <span className="text-xs text-gray-500">
                                                {formatTime(conversation.lastMessageAt)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">
                                            {conversation.lastMessage?.content || 'Start a conversation'}
                                        </p>
                                        <span className="text-xs text-blue-500">{otherUser.role}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 bg-white">
                            <div className="flex items-center">
                                {(() => {
                                    const otherUser = activeConversation.participants.find(p => p._id !== currentUser._id);
                                    return (
                                        <>
                                            <img
                                                src={otherUser.img}
                                                alt={otherUser.name}
                                                className="w-10 h-10 rounded-full mr-3"
                                            />
                                            <div>
                                                <h3 className="font-medium">{otherUser.name}</h3>
                                                <p className="text-sm text-gray-500">{otherUser.role}</p>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {loading ? (
                                <div className="text-center text-gray-500">Loading messages...</div>
                            ) : (
                                messages.map(message => (
                                    <div
                                        key={message._id}
                                        className={`flex ${message.sender._id === currentUser._id ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                message.sender._id === currentUser._id
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            {message.messageType === 'image' && message.fileUrl && (
                                                <img 
                                                    src={message.fileUrl} 
                                                    alt="Shared image" 
                                                    className="max-w-full h-auto rounded mb-2"
                                                />
                                            )}
                                            {message.messageType === 'file' && message.fileUrl && (
                                                <a 
                                                    href={message.fileUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
                                                >
                                                    <Paperclip size={16} className="mr-1" />
                                                    File attachment
                                                </a>
                                            )}
                                            <p>{message.content}</p>
                                            <p className="text-xs mt-1 opacity-75">
                                                {formatTime(message.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* File Preview */}
                        {selectedFile && (
                            <div className="p-2 bg-gray-50 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        {selectedFile.name}
                                    </span>
                                    <button
                                        onClick={removeSelectedFile}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Message Input */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    accept="image/*,.pdf,.doc,.docx"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 text-gray-500 hover:text-gray-700"
                                >
                                    <Paperclip size={20} />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() && !selectedFile}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <MessageCircle size={64} className="mx-auto mb-4" />
                            <p>Select a conversation to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSystem;