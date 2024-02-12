// Importing required modules and dependencies
const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

// Routes for authentication and user-related operations

// POST request to handle user login
router.post("/login", controller.login);

// POST request to handle user signup/registration
router.post("/signup", controller.register);

// POST request to verify user OTP (One-Time Password)
router.post("/verifyOTP", controller.verifyOTP);

// Protected routes that require authentication

// GET request for a protected route, requires user login
router.get("/proctedRoute", requireLogin, controller.protectedRoute);

// GET request for an admin-specific route, requires user login and admin role
router.get("/admin", requireLogin, isAdmin, controller.admin);

// Exporting the router to be used in the main application
module.exports = router;
