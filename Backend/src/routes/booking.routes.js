import express from "express";

import {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/create", createBooking);

router.get("/get", getBookingsByEmail);

router.patch(
  "/:id/status",
  updateBookingStatus
);

export default router;