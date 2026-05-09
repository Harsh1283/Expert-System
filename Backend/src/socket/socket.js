const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(
      "User connected:",
      socket.id
    );

    // making expert room
    socket.on(
      "join-expert-room",
      (expertId) => {
        socket.join(
          `expert-${expertId}`
        );

        console.log(
          `Socket ${socket.id} joined expert-${expertId}`
        );
      }
    );

    socket.on(
      "leave-expert-room",
      (expertId) => {
        socket.leave(
          `expert-${expertId}`
        );

        console.log(
          `Socket ${socket.id} left expert-${expertId}`
        );
      }
    );

    socket.on("disconnect", () => {
      console.log(
        "User disconnected:",
        socket.id
      );
    });
  });
};

export default initializeSocket;