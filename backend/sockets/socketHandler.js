export default function registerSocketHandlers(io, socket) {
  console.log('⚡ New socket connected:', socket.id);

  // Join Room
  socket.on('join-room', roomID => {
    socket.join(roomID);
    socket.to(roomID).emit('user-connected', socket.id);
    console.log(`🧑‍🤝‍🧑 ${socket.id} joined room ${roomID}`);

    // Handle disconnection
    socket.on('disconnect', () => {
      socket.to(roomID).emit('user-disconnected', socket.id);
      console.log(`❌ ${socket.id} left room ${roomID}`);
    });

    // Relay WebRTC signaling messages
    socket.on('signal', ({ target, data }) => {
      io.to(target).emit('signal', {
        sender: socket.id,
        data
      });
    });

    // Real-time chat
    socket.on('chat-message', ({ roomID, message, sender }) => {
      socket.to(roomID).emit('chat-message', { message, sender });
    });
  });
}
