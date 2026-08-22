const express= require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createApplication, getApplications, updateApplication, deleteApplication } = require("../controllers/application.controllers");

const router= express.Router();

router.post("/create-application", authMiddleware, createApplication);
router.get("/get-applications", authMiddleware, getApplications);
router. patch("/update-application/:id", authMiddleware, updateApplication);
router.delete("/delete-application/:id",authMiddleware, deleteApplication)




module.exports = router 