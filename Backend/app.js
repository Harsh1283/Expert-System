import express from "express";
import cors from "cors";

import expertRoutes from "./src/routes/expert.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/experts", expertRoutes);

app.use("/api/bookings", bookingRoutes);

export default app;