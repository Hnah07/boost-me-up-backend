import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/UserModel";

const { JWT_SECRET } = process.env;

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded._id) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
      return;
    }

    // Set user information in the request object
    req.user = {
      _id: decoded._id,
      email: decoded.email,
      name: decoded.name
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
      return;
    }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Unauthorized - Token expired" });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
