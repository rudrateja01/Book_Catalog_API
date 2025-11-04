import { user } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register
export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExist = await user.findOne({ email });
    if (userExist) {
      res.status(400).send({ message: "Email Already Exists" });
    }
    const hash = await bcrypt.hash(password, 10);

    const newUser = await new user({ name, email, password: hash }).save();

    res.status(201).json({ message: "User Created Successfully", newUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const Exists = await user.findOne({ email });
    if (!Exists) {
      return res.status(401).json({ message: "Email Not Found" });
    }

    const match = await bcrypt.compare(password, Exists.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3h"});
    console.log(token);

    res.status(200).json({message:"User Login Successfully",email,token})
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
