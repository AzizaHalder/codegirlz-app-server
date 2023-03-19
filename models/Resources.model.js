const { Schema, model } = require("mongoose");

const resourcesSchema = new Schema(
  {
    resourceTitle: { type: String, required: [true, "Title is required."] },
    resourceImage: {
      type: String,
      trim: true,
      required: [true, "Image is required"],
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
      enum: ["Articles", "Podcasts", "Videos"],
      required: [true, "Please select a resource type."],
    },
    userNameObjectId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Resources = model("Resources", resourcesSchema);

module.exports = Resources;
