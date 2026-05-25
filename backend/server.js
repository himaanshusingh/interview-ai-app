const express = require("express");
const path = require("path");
require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

if (process.env.NODE_ENV === "production") {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
