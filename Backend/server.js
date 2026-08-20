const dotenv= require("dotenv")
dotenv.config();
const app= require("./src/app")
const ConnectDB= require("./src/config/db")


ConnectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT} at http://localhost:${PORT}`)
})