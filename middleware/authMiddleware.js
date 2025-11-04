import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { user } from "../models/user.js";

const authBook = async (req, res,next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Auth Token Required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const {_id} = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await user.findOne({_id}).select("_id");
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authBook;
