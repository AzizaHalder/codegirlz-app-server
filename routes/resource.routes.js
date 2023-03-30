const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

const Resource = require("../models/Resource.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

// GET /resource --> Show all Resources
router.get("/", (req, res, next) => {
  Resource.find()
    // .populate("author") // if I forget, this is commented out to let the page load and is an existing error 
    .populate("author", "-password")
    .then((allResource) => res.json(allResource))
    .catch((error) => res.json(error));
});

// POST /upload --> upload resource image file to cloudinary
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

// POST /resource --> create a resource
router.post("/create", (req, res, next) => {
  const {
    resourceTitle,
    resourceImage,
    resourceURL,
    resourceContent,
    resourceType,
    author,
  } = req.body;

  Resource.create({
    resourceTitle,
    resourceImage,
    resourceURL,
    resourceContent,
    resourceType,
    author,
  })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET /resource/:resourceId --> resource details page
router.get("/:resourceId", (req, res, next) => {
  const { resourceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resourceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Resource.findById(resourceId)
    .populate("comments")
    .then((resource) => res.status(200).json(resource))
    .catch((error) => res.json(error));
});

// PUT /resource/edit/:resourceId --> edit resource
router.put("/edit/:resourceId", (req, res, next) => {
  const { resourceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resourceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Resource.findByIdAndUpdate(resourceId, req.body, { new: true })
    .then((updatedResource) => res.json(updatedResource))
    .catch((error) => res.json(error));
});

// DELETE /resource/edit/:resourceId--> delete resource
router.delete("/edit/:resourceId", (req, res, next) => {
  const { resourceId } = req.params;

  Resource.findByIdAndDelete(resourceId)
    .then((deleteResource) => res.json(deleteResource))
    .catch((error) => res.json(error));
});



module.exports = router;
