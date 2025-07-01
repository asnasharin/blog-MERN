import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("TOKEN RECEIVED:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      const user = await User.findById((decoded as any).userId).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("Unauthorized user");
      }

      req.user = user;
      next();
    } catch (error: any) {
      console.log("JWT verification error:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
