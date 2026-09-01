const express = require("express")
const { createSkill, updateSkill, getSkills, deleteSkill } = require("../controllers/skill.controller")
const { authMiddleware } = require("../middlewares/auth.middleware");


const router = express.Router()

router.post("/createSkills", authMiddleware
  , createSkill)
router.patch("/updateSkill/:id", authMiddleware, updateSkill)
router.delete("/deleteSkill/:id", authMiddleware, deleteSkill)
router.get("/getSkills", authMiddleware, getSkills)


module.exports = router;