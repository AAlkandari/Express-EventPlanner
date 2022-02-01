const express = require("express");

const router = express.Router();

const { getEvents, getDetails, postEvents, deleteEvents, updateEvents, bookedEvents, searchForEvent } = require("./controllers")

router.get("/booked", bookedEvents);

router.get("/search/:eventName", searchForEvent);

router.get("/", getEvents);

router.get("/:id", getDetails);

router.post("/", postEvents)

router.delete("/:eventId", deleteEvents)

router.put("/:eventId", updateEvents);

module.exports = router;