import { Ctx, Query, Resolver, Arg } from "type-graphql";
import { ChatInput } from "../schemas/chat.schema";
import ChatService from "../services/chat.service";
import FullfillmentService from "../services/fullfillment.service";
import IntentService from "../services/intent.service";
import Context from "../types/context";

@Resolver()

export default class chatResolver{
    constructor(private chatService: ChatService){
        const intentService = new IntentService();
        const fullfillmentService = new FullfillmentService();
        this.chatService = new ChatService(intentService, fullfillmentService);
    }

    @Query (() => String)
    respond(@Arg('input') chatInput: ChatInput, @Ctx() context: Context) {
        return this.chatService.respond(chatInput, context);
    }
}