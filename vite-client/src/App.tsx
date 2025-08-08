import { useState, useEffect, useRef } from 'react'
import './App.css'

interface ChatMessage {
  type: 'chat' | 'system';
  username?: string;
  message: string;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Connect to WebSocket
    const socket = new WebSocket('ws://localhost:3001');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Connected to chat server');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message: ChatMessage = JSON.parse(event.data);
        setMessages(prev => [...prev, message]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from chat server');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !username.trim() || !socketRef.current) return;

    const messageData = {
      username: username,
      message: inputMessage.trim()
    };

    socketRef.current.send(JSON.stringify(messageData));
    setInputMessage('');
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setShowUsernameInput(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (showUsernameInput) {
    return (
      <div className="chat-container">
        <div className="username-input">
          <h2>Enter Chatroom</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
          />
          <button onClick={handleUsernameSubmit}>Join Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chatroom</h2>
        <div className="connection-status">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === 'system' ? (
              <div className="system-message">
                <span className="message-text">{message.message}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            ) : (
              <div className="chat-message">
                <div className="message-header">
                  <span className="username">{message.username}</span>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
                <div className="message-text">{message.message}</div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!isConnected}
        />
        <button onClick={handleSendMessage} disabled={!isConnected || !inputMessage.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App
