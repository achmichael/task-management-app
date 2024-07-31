import { ResponseError } from "../Config/Error.js";
import bcrypt from 'bcrypt';
import User from '../Models/User.js';

export class Register {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute (data) {
        
        const {email, password} = data;

        const existingUser = await this.userRepository.getUserByEmail(email);

        if(existingUser){
            throw new ResponseError(400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User(email, hashedPassword);

        return await this.userRepository.createUser(user);
    }
}