import app from './app'

// Store connected WebSocket clients
const clients = new Set<any>();

Bun.serve({
  port: 3001,
  fetch(req, server) {
    // Handle WebSocket upgrade
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    
    // Handle HTTP requests with Hono
    return app.fetch(req);
  },
  websocket: {
    open(ws) {
      // Add new client to the set
      clients.add(ws);
      console.log('Client connected. Total clients:', clients.size);
      
      // Send welcome message
      ws.send(JSON.stringify({
        type: 'system',
        message: 'Welcome to the chatroom!',
        timestamp: new Date().toISOString()
      }));
    },
    message(ws, message) {
      try {
        const data = JSON.parse(message as string);
        
        // Broadcast message to all connected clients
        const chatMessage = {
          type: 'chat',
          username: data.username || 'Anonymous',
          message: data.message,
          timestamp: new Date().toISOString()
        };
        
        // Send to all clients including sender
        clients.forEach((client: any) => {
          if (client.readyState === 1) { // WebSocket.OPEN
            client.send(JSON.stringify(chatMessage));
          }
        });
        
        console.log(`Message from ${chatMessage.username}: ${chatMessage.message}`);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    },
    close(ws) {
      // Remove client from the set
      clients.delete(ws);
      console.log('Client disconnected. Total clients:', clients.size);
    },
  },
});