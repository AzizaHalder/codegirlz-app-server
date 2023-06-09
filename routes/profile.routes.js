const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/:profileId", (req, res, next) => {
  const { profileId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ errorMessage: "Specified Profile Id is not valid" });
    return;
  }

  User.findById(profileId)
    .select("-password -email")
    .then((profile) => res.status(200).json(profile))
    .catch((error) => res.json(error));
});

// PUT /profile/edit/:profileId --> edit profile profile
router.put("/:profileId/edit", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;

  User.findByIdAndUpdate(profileId, req.body, { new: true })
    .then((updatedProfile) => res.json(updatedProfile))
    .catch((error) => res.json(error));
});

// DELETE /profile/edit/:profileId --> delete profile profile
router.delete("/:profileId/edit", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;

  User.findByIdAndDelete(profileId)
    .then((deleteProfile) => res.json(deleteProfile))
    .catch((error) => res.json(error));
});

module.exports = router;
