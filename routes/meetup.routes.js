const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

const Meetup = require("../models/Meetup.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// GET /meetup --> Show all Meetup Events
router.get("/", (req, res, next) => {
  Meetup.find()
    .populate("author", "-password")
    .then((allMeetup) => res.json(allMeetup))
    .catch((error) => res.json(error));
});

// POST Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post(
  "/upload",
  fileUploader.single("eventImage"),
  isAuthenticated,
  (req, res, next) => {
    console.log("file is: ", req.file);

    if (!req.file) {
      next(new Error("No image uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

    res.json({ fileUrl: req.file.path });
  }
);

// POST /meetup --> create a meetup
router.post("/create", isAuthenticated, (req, res, next) => {
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
    attendees,
    author,
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
    attendees,
    author,
  })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET ATTEND(SAVED) MEETUP
router.get("/attend", (req, res, next) => {
  const { user } = req.body;
  User.find({ user })
    .select("-password -email")
    .populate("eventsAttended")
    .then((attendMeetup) => res.json(attendMeetup))
    .catch((error) => res.json(error));
});

// GET /meetup/:meetupId --> meetup details page
router.get("/:meetupId", isAuthenticated, (req, res, next) => {
  const { meetupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(meetupId)) {
    res.status(400).json({ errorMessage: "Specified id is not valid" });
    return;
  }

  Meetup.findById(meetupId)
    .then((meetup) => res.status(200).json(meetup))
    .catch((error) => res.json(error));
});

// PUT /meetup/edit/6419f68980b77e9438d2e48c --> edit meetup
router.put("/edit/:meetupId", isAuthenticated, (req, res, next) => {
  const { meetupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(meetupId)) {
    res.status(400).json({ errorMessage: "Specified id is not valid" });
    return;
  }

  Meetup.findByIdAndUpdate(meetupId, req.body, { new: true })
    .then((updatedMeetup) => res.json(updatedMeetup))
    .catch((error) => res.json(error));
});

// DELETE /meetup/edit/:meetupId --> delete meetup
router.delete("/edit/:meetupId", isAuthenticated, (req, res, next) => {
  const { meetupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(meetupId)) {
    res.status(400).json({ errorMessage: "Specified id is not valid" });
    return;
  }

  Meetup.findByIdAndDelete(meetupId)
    .then((deleteMeetup) => res.json(deleteMeetup))
    .catch((error) => res.json(error));
});

router.post("/:meetupId/attend", (req, res, next) => {
  const { user } = req.body;
  const { meetupId } = req.params;
  User.findById(user)
    .then((oneUser) => {
      if (oneUser.eventsAttended.includes(meetupId)) {
        return User.findByIdAndUpdate(
          oneUser._id,
          {
            $pull: {
              eventsAttended: { $in: [meetupId] },
            },
          },
          { new: true }
        ).select("-password -email");
      } else {
        return User.findByIdAndUpdate(
          oneUser._id,
          {
            $push: { eventsAttended: meetupId },
          },
          { new: true }
        ).select("-password -email");
      }
    })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
});

module.exports = router;
