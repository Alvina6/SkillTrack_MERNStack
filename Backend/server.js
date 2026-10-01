const dotenv= require("dotenv")
dotenv.config();
const app= require("./src/app")
const ConnectDB= require("./src/config/db")


const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URI || !process.env.JWT_SECRET || Buffer.byteLength(process.env.JWT_SECRET) < 32) {
  throw new Error("MONGO_URI and a JWT_SECRET of at least 32 bytes must be configured.");
}

if (process.env.NODE_ENV === "production" && !process.env.CLIENT_ORIGINS) {
  throw new Error("CLIENT_ORIGINS must list the allowed frontend origins in production.");
}

if (!(["lax", "strict", "none"].includes((process.env.AUTH_COOKIE_SAME_SITE || "lax").toLowerCase()))) {
  throw new Error("AUTH_COOKIE_SAME_SITE must be lax, strict, or none.");
}

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Could not connect to the database:", error.message);
    process.exit(1);
  });