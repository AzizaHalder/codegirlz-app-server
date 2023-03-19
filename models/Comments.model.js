const { Schema, model } = require("mongoose");

const commentsSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Cannot leave an empty comment."],
    },
    resource: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comments = model("Comments", commentsSchema);

module.exports = Comments;
