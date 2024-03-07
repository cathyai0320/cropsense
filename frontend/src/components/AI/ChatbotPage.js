import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';


function ChatbotPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </header>
        </div>
    );
}

export default ChatbotPage;