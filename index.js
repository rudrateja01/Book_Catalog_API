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

app.use("/api/users",userRoutes);
app.use("/api/books",bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);  
});