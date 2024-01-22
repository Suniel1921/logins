const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/categoryController");
const { requireLogin } = require("../middlewares/authMiddleware");

router.post("/createCategory", requireLogin, controller.createCategory);
router.get("/allCategory", controller.getAllCategory);
router.put("/updateCategory/:id", controller.updateCateogry);
router.delete("/deleteCategory/:id", controller.deleteCategory);


module.exports = router;