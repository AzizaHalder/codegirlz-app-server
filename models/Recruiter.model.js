const { Schema, model } = require("mongoose");

const recruiterSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: { type: String, required: [true, "Password is required."] },
    recruiterName: { type: String, required: [true, "Name is required."] },
    company: { type: String, required: [true, "Company is required."] },
    city: { type: String },
    linkedin: {
      type: String,
    },
    createEvent: [{ type: Schema.Types.ObjectId, ref: "Meetup" }],
    jobCandidates: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Recruiter = model("Recruiter", recruiterSchema);

module.exports = Recruiter;
