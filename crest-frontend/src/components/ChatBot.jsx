import React, { useState, useEffect } from 'react';
import { BsChatRightFill } from 'react-icons/bs';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Messaging Modal component
function MessagingModal({ isOpen, onClose }) {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Clear message and response when modal opens
            setMessage('');
            setResponse('');
        }
    }, [isOpen]);

    const genAI = new GoogleGenerativeAI("AIzaSyDv5AsvRiDXJaY8MD1JdQAvU5pjjFK4Zzs");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = async () => {
        setIsLoading(true);
        try {
            console.log('Model:', model);
            const chat = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chat.sendMessage(message);
            const response = await result.response;
            const text = await response.text();
            setResponse(text);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center  ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-6 w-[450px] max-h-[600px] overflow-scroll">
                <h2 className="text-2xl font-bold mb-4">ChatBot Messaging</h2>
                <textarea
                    className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleMessageChange}
                />
                <div className="flex justify-end mt-4">
                    <button onClick={sendMessage} disabled={isLoading} className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                        Close
                    </button>
                </div>
                {response && (
                    <div className="mt-4">
                        <h3 className="text-xl font-bold mb-2">Response:</h3>
                        <p>{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ChatBot component
export default function ChatBot() {
    const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);

    const toggleMessagingModal = () => {
        setIsMessagingModalOpen(!isMessagingModalOpen);
    };

    return (
        <div>
            <button className='fixed bottom-16 right-20' onClick={toggleMessagingModal}>
                <BsChatRightFill size={32} />
            </button>
            <MessagingModal isOpen={isMessagingModalOpen} onClose={toggleMessagingModal} />
        </div>
    );
}
