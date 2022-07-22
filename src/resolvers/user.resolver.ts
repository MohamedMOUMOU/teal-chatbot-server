import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput, User } from "../schemas/user.schema";
import UserService from "../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";
import Context from "../types/context";

@Resolver()

export default class userResolver{
    constructor(private userService: UserService){
        this.userService = new UserService();
    }
    @Mutation(() => User)
    createUser(@Arg('input') input: CreateUserInput) {
        return this.userService.createUser(input);
    }

    @Mutation(() => String) // returns the JWT
    login(@Arg('input') input: LoginInput, @Ctx() context: Context){
        return this.userService.login(input, context);
    }

    @Query (() => User)
    loggedIn(@Ctx() context: Context) {
        return context.user;
    }
}