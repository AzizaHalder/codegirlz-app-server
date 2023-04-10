const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Recruiter = require("../models/Recruiter.model");
const Resource = require("../models/Resource.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

// POST /auth/signup  - Creates a new recruiter in the database
router.post("/signup", (req, res, next) => {
  const { email, password, recruiterName, company, city, linkedin } = req.body;

  if (
    email === "" ||
    password === "" ||
    recruiterName === "" ||
    company === "" ||
    city === "" ||
    linkedin === ""
  ) {
    res.status(400).json({ errorMessage: "Provide all form fields." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ errorMessage: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      errorMessage:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  Recruiter.findOne({ email })
    .then((foundRecruiter) => {
      if (foundRecruiter) {
        res.status(400).json({ errorMessage: "Recruiter already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return Recruiter.create({
        email,
        password: hashedPassword,
        recruiterName,
        company,
        city,
        linkedin,
      });
    })
    .then((createdRecruiter) => {
      const { email, recruiterName, _id, company, city, linkedin } =
        createdRecruiter;

      const recruiter = {
        email,
        recruiterName,
        _id,
        company,
        city,
        linkedin,
      };

      res.status(201).json({ recruiter: recruiter });
    })
    .catch((err) => next(err));
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ errorMessage: "Provide email and password." });
    return;
  }

  // Check the recruiter collection if a recruiter with the same email exists
  Recruiter.findOne({ email })
    .then((foundRecruiter) => {
      if (!foundRecruiter) {
        res
          .status(401)
          .json({ errorMessage: "Unable to authenticate the recruiter" });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(
        password,
        foundRecruiter.password
      );

      if (passwordCorrect) {
        const { _id, email, recruiterName } = foundRecruiter;

        const payload = { _id, email, recruiterName };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res
          .status(401)
          .json({ errorMessage: "Unable to authenticate the recruiter" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
