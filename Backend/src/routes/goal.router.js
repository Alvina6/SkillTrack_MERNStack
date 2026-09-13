const express= require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { createGoal, deleteGoal, updateGoal, getGoals } = require("../controllers/goal.controller")

const router= express.Router()

router.post("/createGoals",authMiddleware, createGoal)
router.delete("/deleteGoal/:id" ,authMiddleware, deleteGoal)
router.patch("/updateGoal/:id",authMiddleware, updateGoal)
router.get("/getGoals",authMiddleware, getGoals)


module.exports= router