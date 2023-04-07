const { Schema, model } = require("mongoose");

const resourceSchema = new Schema(
  {
    resourceTitle: { type: String, required: [true, "Title is required."] },
    resourceImage: {
      type: String,
      trim: true,
    },
    // required
    resourceURL: {
      type: String,
    },
    resourceContent: {
      type: String,
      required: [true, "Please add your resource."],
    },
    resourceType: {
      type: String,
      enum: ["Article", "Podcast", "Video"],
      required: [true, "Please select a resource type."],
    },
    videoUpload: {
      type: String,
    },
    podcastUpload: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Resource = model("Resource", resourceSchema);

module.exports = Resource;
