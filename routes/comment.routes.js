const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Resource = require("../models/Resource.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// POST /resource/:resourceId/comment --> post comment to a resource
router.post("/:resourceId/comment", isAuthenticated, (req, res, next) => {
  const { comment, user } = req.body;
  const { resourceId } = req.params;
  //   How do we access username / author in this route so we can display it with the comment
  //   do we need author in our comment routes to access the author name by using author Object Id with props
  Comment.create({
    comment: comment,
    author: user,
    resource: resourceId,
  })
    .then((newComment) => {
      return Resource.findByIdAndUpdate(resourceId, {
        $push: { comments: newComment._id },
      });
    })
    .then((updatedResource) => res.json(updatedResource))
    .catch((error) => res.json(error));
});

// GET all the comments
router.get("/:resourceId/comment-list", isAuthenticated, (req, res, next) => {
  const { resourceId } = req.params;

  Comment.find({ resource: resourceId })
    /*.populate("user")*/
    .then((userComment) => res.json(userComment))
    .catch((error) => res.json(error));
});

// DELETE /
router.delete(
  "/:resourceId/comment/:commentId",
  isAuthenticated,
  (req, res, next) => {
    const { resourceId } = req.params;
    const { commentId } = req.params;

    //check if Author or not

    Comment.findByIdAndDelete(commentId)
      .then((deleteComment) => {
        return Resource.findByIdAndUpdate(resourceId, {
          $pull: { comments: deleteComment._id },
        });
      })
      .then((updatedResource) => res.json(updatedResource))
      .catch((error) => res.json(error));
  }
);

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFjNjZjYTJjMGRmYzA0M2YwMjA3NDYiLCJlbWFpbCI6ImhpQGVtYWlsLmNvbSIsIm5hbWUiOiJIaSIsImlhdCI6MTY3OTU5NzQzOSwiZXhwIjoxNjc5NjE5MDM5fQ.IkbWPMDem2eyUKUqImGYGptuPMVF12qzExNK7_l373M
