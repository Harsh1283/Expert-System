import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./src/config/db.js";

import initializeSocket from "./src/socket/socket.js";

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH"],
  },
});

app.set("io", io);

initializeSocket(io);

server.listen(process.env.PORT, () => {
  console.log(
    `Server running on port http://localhost:${process.env.PORT}`
  );
});