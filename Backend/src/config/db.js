const mongoose= require("mongoose");

async function ConnectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI) 
    console.log("Connected to MongoDB")
  }catch(err){
    console.log("Error connecting to MongoDB", err)
    throw err
  }
}

module.exports= ConnectDB;