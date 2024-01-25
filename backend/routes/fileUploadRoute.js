const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/fileUploadController");
const { requireLogin } = require("../middlewares/authMiddleware");


router.post("/uploadimg",requireLogin, controller.imageUpload);
router.get("/getAllRoom", controller.getAllRoom);
router.get("/singleRoom/:id", controller.getSingleRoom);
router.put("/updateRoom/:id", controller.updateRoom);
router.delete("/deleteRoom/:id", controller.deleteRoom);


router.get("/roomCount", requireLogin, controller.userRoomCount);


module.exports = router;


