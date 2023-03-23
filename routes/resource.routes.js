const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Resource = require("../models/Resource.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

// GET /resource --> Show all Resources
router.get("/", (req, res, next) => {
  Resource.find()
    .then((allResource) => res.json(allResource))
    .catch((error) => res.json(error));
});

// POST /resource --> create a resource
router.post("/create", (req, res, next) => {
  const {
    resourceTitle,
    resourceImage,
    resourceURL,
    resourceContent,
    resourceType,
  } = req.body;

  Resource.create({
    resourceTitle,
    resourceImage,
    resourceURL,
    resourceContent,
    resourceType,
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
