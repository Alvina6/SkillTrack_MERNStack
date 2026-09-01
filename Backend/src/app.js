const express= require("express");
const authRouter= require("./routes/auth.routes")
const applicationRouter = require("./routes/application.routes")
const skillRouter= require("./routes/skill.route")
const cookieParser= require("cookie-parser")
const cors = require("cors")

const app= express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5174',
  credentials:true
}))
app.use('/auth', authRouter)
app.use("/dashboard", applicationRouter)
app.use("/dashboard", skillRouter)


module.exports= app;