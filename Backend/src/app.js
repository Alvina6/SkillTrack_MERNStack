const express= require("express");
const authRouter= require("./routes/auth.routes")
const applicationRouter = require("./routes/application.routes")
const cookieParser= require("cookie-parser")
const cors = require("cors")

const app= express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173/',
  credentials:true
}))
app.use('/auth', authRouter)
app.use("/dashboard", applicationRouter)


module.exports= app;