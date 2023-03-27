const express = require("express");
const router = express.Router();
const { Schema, model } = require("mongoose");

const meetupSchema = new Schema(
  {
    eventName: { type: String, required: [true, "Event name is required."] },
    // required
    eventType: {
      type: String,
      enum: ["Digital", "In-Person"],
      required: [true, "Event type is required."],
    },
    // determine if eventCountry, city, address and link should be required?
    // conditionally rendered if event is in person
    eventCountry: { type: String },
    eventCity: { type: String },
    // maps javascript API could possibly be an option on this form
    eventAddress: { type: String },
    // conditionally rendered if event is digital
    eventLink: { type: String },
    eventDescription: {
      type: String,
      required: [
        true,
        "Event Description is required. Please tell more about your event!",
      ],
    },
    eventImage: { type: String, trim: true },
    // use "datetime-local" as form field input
    eventDateAndTime: {
      type: String,
      required: [
        true,
        "Time and Date is required. Please tell more about your event!",
      ],
    },
    // the people attending
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // who created it
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Meetup = model("Meetup", meetupSchema);

module.exports = Meetup;
