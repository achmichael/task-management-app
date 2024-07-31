import { ResponseError } from "../Config/Error.js";
import jwt from "jsonwebtoken";

function accessValidation(req, res, next) {
  const { authorization } = req.headers;

  const token = extractToken(authorization, next);
  
  if (!token) {
    return next(new ResponseError(401, "Unauthorized"));
  }

  try {
    //memverifikasi token jika berhasil maka decoded berisi payload dari token tersebut
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //menyimpan payload ke dalam object request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ResponseError(400, "Token Is Expired"));
    } else if (error.name === "JsonWebTokenError") {
      return next(new ResponseError(401, "Invalid Token"));
    } else {
      return next(new ResponseError(500, "Token Verification Failed"));
    }
  }
}

export function extractToken(authorization, next) {
  if (!authorization) {
    return next(new ResponseError(400, "Token is Required"));
  }

  const tokens = authorization.split(" ");

  if (tokens.length !== 2 || tokens[0] !== "Bearer") {
    return next(new ResponseError(400, "Invalid Token Format"));
  }

  return tokens[1];
}

export default accessValidation;
