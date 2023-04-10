const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Recruiter = require("../models/Recruiter.model");

// GET /profile/:recruiterId --> show user profile
router.get("/:recruiterId", (req, res, next) => {
  const recruiterId = req.payload._id;
  //   const { recruiterId } = req.body;
  console.log(recruiterId);
  console.log("payload", req.payload);

  if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
    res.status(400).json({ errorMessage: "Specified Recruiter Id is not valid" });
    return;
  }

  Recruiter.findById(recruiterId)
    .select("-password -email")
    .then((recruiter) => res.status(200).json(recruiter))
    .catch((error) => res.json(error));
});

// PUT /recruiter/edit/:recruiterId --> edit profile profile
router.put("/edit/:recruiterId", (req, res, next) => {
  const { recruiterId } = req.params;

  Recruiter.findByIdAndUpdate(recruiterId, req.body, { new: true })
    .then((updatedProfile) => res.json(updatedProfile))
    .catch((error) => res.json(error));
});

// DELETE /recruiter/edit/:recruiterId --> delete profile profile
router.delete("/edit/:recruiterId", (req, res, next) => {
  const { recruiterId } = req.params;

  Recruiter.findByIdAndDelete(recruiterId)
    .then((deleteProfile) => res.json(deleteProfile))
    .catch((error) => res.json(error));
});

module.exports = router;
