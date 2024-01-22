const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/fileUploadController");
const fileUploadModel = require("../models/fileUploadModel");

router.post("/uploadimg", controller.imageUpload);
router.get("/getAllRoom", controller.getAllRoom);
router.get("/singleRoom/:id", controller.getSingleRoom);
router.put("/updateRoom/:id", controller.updateRoom);
router.delete("/deleteRoom/:id", controller.deleteRoom);




module.exports = router;
