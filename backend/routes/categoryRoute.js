const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/categoryController");
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

router.post("/createCategory", requireLogin, isAdmin, controller.createCategory);
router.get("/allCategory", controller.getAllCategory);
router.put("/updateCategory/:id", controller.updateCateogry);
router.delete("/deleteCategory/:id", controller.deleteCategory);


module.exports = router;