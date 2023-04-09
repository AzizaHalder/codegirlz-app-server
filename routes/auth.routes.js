const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const Resource = require("../models/Resource.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name, level, newOpp, city, currentLocation, profileImg, linkedin, github, description } =
    req.body;

  if (
    email === "" ||
    password === "" ||
    name === "" ||
    newOpp === null ||
    city === ""
  ) {
    res.status(400).json({ errorMessage: "Please provide: email, password, name, preference for new opportunities and city details." });
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

  User.findOne({ email })
    .then((foundUser) => {

      if (foundUser) {
        res.status(400).json({ errorMessage: "User already exists." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({
        email,
        password: hashedPassword,
        name,
        level,
        newOpp,
        city,
        currentLocation,
        profileImg,
        linkedin,
        github,
        description,
      });
    })
    .then((createdUser) => {

      const { email, name, level, _id, newOpp, city, currentLocation, profileImg, linkedin, github, description } =
        createdUser;
      const user = { email, name, level, _id, newOpp, city, currentLocation, profileImg, linkedin, github, description };
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ errorMessage: "Provide an email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {

        res.status(401).json({ errorMessage: "Please provide a valid email and password." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ errorMessage: "Please provide a valid email and password. Passwords must contain one uppercase letter, one lowercase letter, one number and be at least 6 characters long." });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
