const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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
    name: { type: String, required: [true, "Name is required."] },
    currentLocation: {
      type: String,
    },
    city: { type: String },
    level: {
      type: String,
      enum: ["Entry Level", "Junior", "Intermediate", "Senior", "Lead"],
      required: true,
    },
    // is this a valid match for URL using regex?
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    newOpp: {
      type: Boolean,
      required: [true, "Open to new opportunities preference is required."],
    },
    eventsAttended: [{ type: Schema.Types.ObjectId, ref: "Meetup" }],
    myResource: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
    profileImg: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
