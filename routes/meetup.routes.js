const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Meetup = require("../models/Meetup.model");
const User = require("../models/User.model");

// GET /meetup --> Show all Meetup Events
router.get("/", (req, res, next) => {
  Meetup.find()
    .then((allMeetup) => res.json(allMeetup))
    .catch((error) => res.json(error));
});

// POST /meetup --> create a meetup
router.post("/create", (req, res, next) => {
  const {
    eventName,
    eventType,
    eventCountry,
    eventCity,
    eventAddress,
    eventLink,
    eventDescription,
    eventImage,
    eventDateAndTime,
  } = req.body;

  Meetup.create({
    eventName,
    eventType,
    eventCountry,
    eventCity,
    eventAddress,
    eventLink,
    eventDescription,
    eventImage,
    eventDateAndTime,
  })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET /meetup/:meetupId --> meetup details page
router.get("/:meetupId", (req, res, next) => {
  const { meetupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(meetupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Meetup.findById(meetupId)
    .then((meetup) => res.status(200).json("meetup"))
    .catch((error) => res.json(error));
});

// PUT /meetup/edit/6419f68980b77e9438d2e48c --> edit meetup
router.put("/edit/:meetupId", (req, res, next) => {
  const { meetupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(meetupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Meetup.findByIdAndUpdate(meetupId, req.body, { new: true })
    .then((updatedMeetup) => res.json(updatedMeetup))
    .catch((error) => res.json(error));
});

// DELETE /meetup/edit/6419f68980b77e9438d2e48c --> delete meetup
router.delete("/edit/:meetupId", (req, res, next) => {
  const { meetupId } = req.params;

  Meetup.findByIdAndDelete(meetupId)
    .then((deleteMeetup) => res.json(deleteMeetup))
    .catch((error) => res.json(error));
});

module.exports = router;
