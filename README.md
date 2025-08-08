# Chatroom Application

A real-time chatroom application built with React (frontend) and Bun + Hono (backend) using WebSocket connections.

## Features

- Real-time messaging using WebSocket
- Username-based chat system
- Connection status indicator
- Modern, responsive UI
- System messages for user notifications
- Auto-scroll to latest messages
- Mobile-friendly design

## Project Structure

```
bun-hono-tut/
├── server/           # Backend (Bun + Hono)
│   ├── index.ts     # WebSocket server
│   ├── app.ts       # Hono HTTP app
│   └── package.json
└── vite-client/     # Frontend (React + Vite)
    ├── src/
    │   ├── App.tsx  # Main chat component
    │   └── App.css  # Styling
    └── package.json
```

## Prerequisites

- [Bun](https://bun.sh/) installed on your system
- Node.js (for Vite development server)

## Setup and Running

### 1. Install Dependencies

First, install the backend dependencies:

```bash
cd server
bun install
```

Then install the frontend dependencies:

```bash
cd ../vite-client
npm install
```

### 2. Start the Backend Server

In the `server` directory:

```bash
bun run index.ts
```

The server will start on port 3001 with WebSocket support.

### 3. Start the Frontend Development Server

In the `vite-client` directory:

```bash
npm run dev
```

The React app will start on `http://localhost:5173`.

### 4. Open the Application

Open your browser and navigate to `http://localhost:5173`. You'll see:

1. A username input screen - enter your username to join the chat
2. The main chatroom interface with connection status
3. Real-time messaging with other connected users

## How It Works

### Backend (Bun + Hono)

- **WebSocket Server**: Handles real-time connections on port 3001
- **Message Broadcasting**: Sends messages to all connected clients
- **Client Management**: Tracks connected users and handles disconnections
- **HTTP Server**: Serves the Hono app for potential API endpoints

### Frontend (React)

- **WebSocket Client**: Connects to the backend WebSocket server
- **Real-time Updates**: Receives and displays messages instantly
- **User Interface**: Modern, responsive chat interface
- **State Management**: Manages messages, connection status, and user input

## Features in Detail

### Real-time Messaging
- Messages are sent instantly to all connected users
- No page refresh required
- Automatic reconnection handling

### User Experience
- Username-based identification
- Connection status indicator (green/red dot)
- System messages for user notifications
- Auto-scroll to latest messages
- Responsive design for mobile devices

### Message Types
- **Chat Messages**: User-generated messages with username and timestamp
- **System Messages**: Server notifications (welcome messages, etc.)

## Development

### Backend Development
- The server uses Bun's built-in WebSocket support
- Messages are broadcasted to all connected clients
- Error handling for malformed messages

### Frontend Development
- Built with React 18 and TypeScript
- Uses Vite for fast development
- Modern CSS with gradients and animations
- Responsive design with mobile support

## Troubleshooting

### Connection Issues
- Ensure the backend server is running on port 3001
- Check that the frontend is connecting to `ws://localhost:3001`
- Verify no firewall is blocking the connection

### Build Issues
- Make sure all dependencies are installed
- Check that Bun and Node.js are properly installed
- Clear node_modules and reinstall if needed

## Future Enhancements

- User typing indicators
- Message persistence
- Private messaging
- File sharing
- Emoji support
- Message reactions
- User avatars
- Room-based chat system

## Technologies Used

- **Backend**: Bun, Hono, WebSocket
- **Frontend**: React, TypeScript, Vite, CSS3
- **Real-time**: WebSocket protocol
- **Styling**: Modern CSS with gradients and animations
