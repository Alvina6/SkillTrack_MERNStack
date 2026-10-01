const express = require("express");
const authController= require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { loginRateLimiter, registerRateLimiter } = require("../middlewares/authRateLimiters");

const router = express.Router();

router.post("/register",registerRateLimiter,authController.register)
router.post("/login",loginRateLimiter,authController.login)
router.post('/logout',authController.logout)
router.get("/get-me",authMiddleware.authMiddleware,authController.get_me )
router.patch("/updateProfile", authMiddleware.authMiddleware, authController.updateProfile)
router.patch("/changePassword", authMiddleware.authMiddleware, authController.changePassword)



module.exports= router