const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: [true, "Email is required."], unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"] },
    password: { type: String, required: [true, "Password is required."], },
    name: { type: String, required: [true, "Name is required."], },
    currentLocation: { type: String, required: [true, "Current Location is required."], },
    city: { type: String, },
    level: { type: String, enum: ["Entry Level", "Junior", "Intermediate", "Senior", "Lead"], required: true, },
    // is this a valid match for URL using regex? 
    linkedin: { type: String, match: [/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/, "Please use valid URL"] },
    github: { type: String, match: [/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/, "Please use valid URL"] },
    newOpps: { type: Boolean, },
    eventsAttended: [{type: Schema.Types.ObjectId, ref: 'Meetup'}],
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
