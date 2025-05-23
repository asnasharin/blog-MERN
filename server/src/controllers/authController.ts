import asyncHandler from "express-async-handler";
import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/userModel"
import { generateToken } from "../utils/generateToken";


export const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      res.status(409);
      next(Error("Email Alredy Exist!"));
    } else {
      const newUser = await User.create({
        email: email,
        password: password,
        name: name,
      });
      const token = generateToken(newUser.id);
      if (newUser && token) {
        res.status(200).json({
          success: true,
          message: "User Created Successfully!",
          token: token,
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            profile: newUser.profile
          },
        });
      }
    }
  }
);



export const loginUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password && (await user.comparePassword(password))) {
        const token = generateToken(user.id);
        res.status(200).json({
          success: true,
          token: token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        });
      } else {
        res.status(401);
        return next(Error("Invalid Credentials"));
      }
    } else {
      res.status(401);
      return next(Error("User Not Found!"));
    }
  }
);
