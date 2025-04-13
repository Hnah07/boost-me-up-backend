import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/UserModel";
import { signToken } from "../utils/helpers";

const saltRounds = 10;
const SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const response = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!SECRET) {
      throw new Error("Internal error");
    }

    const user = {
      _id: response._id.toString(),
      email: response.email,
      username: response.username,
    };

    const token = signToken({
      user: user,
      secret: SECRET,
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".boostmeup.hannahc.be",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: response });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    if (!SECRET) {
      throw new Error("Internal error");
    }

    const tokenUser = {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
    };

    const token = signToken({
      user: tokenUser,
      secret: SECRET,
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".boostmeup.hannahc.be",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
    return;
  } catch (error: unknown) {
    console.error("Login error:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".boostmeup.hannahc.be",
      path: "/",
      maxAge: 1,
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
// Example backend code (authController.js or similar)
export const getProfile = async (req: Request, res: Response) => {
  try {
    // Get the user from the database using the authenticated user's ID
    const user = await User.findById(req.user?._id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Send the user data including username
    res.json({
      user: {
        _id: user._id,
        username: user.username, // Make sure this is included
        email: user.email,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error fetching profile", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error fetching profile", error: "Unknown error" });
    }
  }
};
