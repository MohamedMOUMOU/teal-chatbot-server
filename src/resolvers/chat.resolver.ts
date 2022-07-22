import { Ctx, Query, Resolver, Arg } from "type-graphql";
import { ChatInput } from "../schemas/chat.schema";
import ChatService from "../services/chat.service";
import Context from "../types/context";

@Resolver()

export default class chatResolver{
    constructor(private chatService: ChatService){
        this.chatService = new ChatService();
    }

    @Query (() => String)
    respond(@Arg('input') chatInput: ChatInput, @Ctx() context: Context) {
        console.log(chatInput, context);
        return this.chatService.respond();
    }
}