import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../schemas/user.schema";
import Context from "../types/context";
import bcrypt from 'bcrypt';
import { signJwt } from "../utils/jwt";


class UserService {
    async createUser(input: CreateUserInput) {
        return UserModel.create(input);
    }
    async login(input: LoginInput, context: Context){
        const e = 'Invalid Email or Password';
        const user = await UserModel.findByEmail(input.email);
        if(!user){
            throw new ApolloError(e);
        }
        const passwordIsValid = await bcrypt.compare(input.password, user.password);
        if(!passwordIsValid){
            throw new ApolloError(e);
        }
        const token = signJwt(user);
        context.res.cookie("accessToken", token, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
        return token;
    }
}

export default UserService;