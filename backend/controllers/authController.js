import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    if (!hash) {
      console.error("Error hashing password: No hash returned.");
      return next(createError(500, "Error hashing password."));
    }
    console.log(hash, "balaji");
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    const savedUser = await newUser.save();
    if (!savedUser) {
      console.error("Error saving user: No user returned.");
      return next(createError(500, "Error saving user."));
    }
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("access_token", null, {
      httpOnly: true,
    });
    res.status(200).json("User has been logged out.");
  } catch (err) {
    next(err);
  }
};
