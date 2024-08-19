import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  _id: string;
  // Add other expected properties of your JWT payload here
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (!token) {
      return res.status(403).json({
        message: "No access",
      });
    }

    const decoded = jwt.verify(token, "secret_key") as JwtPayload;
    req.body.userId = decoded._id;
    next();
  } catch (err) {
    console.log(`Err: ${err}`);
    res.status(403).json({
      message: "No access",
    });
  }
};
