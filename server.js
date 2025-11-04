import express from "express";
const app = express();
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import("./config/db.js");
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to Book Catalog API!");
});

app.use("/api/users",userRoutes);
app.use("/api/books",bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);  
});