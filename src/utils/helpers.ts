import jwt, { SignOptions, Secret } from "jsonwebtoken";
import * as ms from "ms";

interface SignTokenParams {
  user: {
    _id: string;
    email: string;
    username: string;
  };
  secret: string;
  expiresIn: number | ms.StringValue | undefined;
}

export const signToken = ({ user, secret, expiresIn }: SignTokenParams): string => {
    const token = jwt.sign(user, secret, { expiresIn });
    return token;
}; 