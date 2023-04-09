const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

const Resource = require("../models/Resource.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// GET /resource --> Show all Resources
router.get("/", (req, res, next) => {
  Resource.find()
    .populate("author", "-password")
    .then((allResource) => res.json(allResource))
    .catch((error) => res.json(error));
});

// POST /upload --> upload resource image file to cloudinary
router.post(
  "/upload",
  isAuthenticated,
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ fileUrl: req.file.path });
  }
);

// POST /resource --> create a resource
router.post("/create", isAuthenticated, (req, res, next) => {
  let {
    resourceTitle,
    resourceImage,
    resourceURL,
    resourceContent,
    resourceType,
    author,
    videoUpload,
    podcastUpload,
  } = req.body;

  videoUpload = videoUpload.split("/watch?v=").pop();
  podcastUpload = podcastUpload.split("/episode").pop();

  Resource.create({
    resourceTitle,
    resourceImage,
    resourceURL,
    resourceContent,
    resourceType,
    author,
    videoUpload,
    podcastUpload,
  })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET A SAVED RESOURCE
router.get("/save", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  console.log("userId", userId);
  User.findById(userId)
    .select("-password -email")
    .populate("myResource")
    .then((savedResources) => res.json(savedResources))
    .catch((error) => res.json(error));
});

// PUT /resource/edit/:resourceId --> edit resource
router.put("/edit/:resourceId", isAuthenticated, (req, res, next) => {
  const { resourceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resourceId)) {
    res.status(400).json({ errorMessage: "Specified id is not valid" });
    return;
  }

  Resource.findByIdAndUpdate(resourceId, req.body, { new: true })
    .then((updatedResource) => res.json(updatedResource))
    .catch((error) => res.json(error));
});

// DELETE /resource/edit/:resourceId--> delete resource
router.delete("/edit/:resourceId", isAuthenticated, (req, res, next) => {
  const { resourceId } = req.params;

  Resource.findByIdAndDelete(resourceId)
    .then((deleteResource) => res.json(deleteResource))
    .catch((error) => res.json(error));
});

// GET /resource/:resourceId --> resource details page
router.get("/:resourceId", isAuthenticated, (req, res, next) => {
  const { resourceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resourceId)) {
    res.status(400).json({ errorMessage: "Specified id is not valid" });
    return;
  }

  Resource.findById(resourceId)
    .populate("comments")
    .then((resource) => res.status(200).json(resource))
    .catch((error) => res.json(error));
});

// SAVE A RESOURCE
router.post("/:resourceId/save", isAuthenticated, (req, res, next) => {
  const { user } = req.body;
  const { resourceId } = req.params;
  User.findById(user)
    .then((oneUser) => {
      if (oneUser.myResource.includes(resourceId)) {
        /**@todo remove resource */
        // $pull from myResource the resourceId $in this array.
        // First we find use we want to update
        // Then we decide whether to toggle resource
        return User.findByIdAndUpdate(
          oneUser._id,
          {
            $pull: {
              myResource: { $in: [resourceId] },
            },
          },
          { new: true }
        ).select("-password -email");
      } else {
        return User.findByIdAndUpdate(
          oneUser._id,
          {
            $push: { myResource: resourceId },
          },
          { new: true }
        ).select("-password -email");
      }
    })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
});

module.exports = router;
