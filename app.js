// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
app.use("/", require("./routes/index.routes"));

app.use("/auth", require("./routes/auth.routes"));

app.use("/auth/recruiter", require("./routes/authRecruiter.routes"));

app.use("/meetup", require("./routes/meetup.routes"));

app.use("/resource", require("./routes/resource.routes"));

app.use("/profile", require("./routes/profile.routes"));

app.use("/resource", isAuthenticated, require("./routes/comment.routes"));

app.use("/recruiter", isAuthenticated, require("./routes/recruiter.routes"));

// app.use("/resource", require("./routes/comment.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
