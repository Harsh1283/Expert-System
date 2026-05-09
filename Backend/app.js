import express from "express";
import cors from "cors";

import expertRoutes from "./src/routes/expert.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";

const app = express();

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

app.use("/api/experts", expertRoutes);

app.use("/api/bookings", bookingRoutes);

export default app;