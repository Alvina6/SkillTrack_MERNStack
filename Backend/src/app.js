const express= require("express");
const authRouter= require("./routes/auth.routes")
const applicationRouter = require("./routes/application.routes")
const skillRouter= require("./routes/skill.route")
const cookieParser= require("cookie-parser")
const GoalRouter= require("./routes/goal.router")
const cors = require("cors")
const helmet = require("helmet")

const app= express();

const clientOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5174,http://127.0.0.1:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(express.json({ limit: "20kb" }))
app.use(cookieParser())
app.use(cors({
  origin: (origin, callback) => {
    callback(null, !origin || clientOrigins.includes(origin));
  },
  credentials:true
}))
app.use('/auth', authRouter)
app.use("/dashboard", applicationRouter)
app.use("/dashboard", skillRouter)
app.use("/dashboard", GoalRouter)


module.exports= app;