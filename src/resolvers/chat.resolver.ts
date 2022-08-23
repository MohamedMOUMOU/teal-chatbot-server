import { Ctx, Query, Resolver, Arg } from "type-graphql";
import { ChatInput } from "../schemas/chat.schema";
import ChatService from "../services/chat.service";
import IntentService from "../services/intent.service";
import Context from "../types/context";

@Resolver()

export default class chatResolver{
    constructor(private chatService: ChatService){
        const intentService = new IntentService();
        this.chatService = new ChatService(intentService);
    }

    @Query (() => String)
    respond(@Arg('input') chatInput: ChatInput, @Ctx() context: Context) {
        return this.chatService.respond(chatInput, context);
    }
}