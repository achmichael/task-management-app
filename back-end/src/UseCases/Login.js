import { ResponseError } from "../Config/Error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthService from "../Services/AuthService.js";
export class Login {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.authService = new AuthService();
  }

  async execute(data, req) {
    const { email, password, verification_code } = data;

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (!existingUser) {
      throw new ResponseError(400, "Email Not Found");
    }

    //check password
    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      throw new ResponseError(400, "Incorrect Password");
    }

    if (existingUser.verification_code !== verification_code) {
      throw new ResponseError(400, "Invalid Verification Code");
    }

    const token = await this.authService.authenticate(email, password, req);

    return token;
  }
}

