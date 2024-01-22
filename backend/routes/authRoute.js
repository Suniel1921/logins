const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/authController");
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

router.post("/singup", controller.register);
router.post("/login", controller.login);

//protected route
router.get("/proctedRoute", requireLogin, controller.protectedRoute);
router.get("/admin", requireLogin, isAdmin, controller.admin);





module.exports = router;