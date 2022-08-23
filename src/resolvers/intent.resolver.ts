import { Ctx, Query, Resolver, Arg } from "type-graphql";
import { ChatInput } from "../schemas/chat.schema";
import IntentService from "../services/intent.service";
import { Intent } from "../schemas/intent.schema";
import Context from "../types/context";

@Resolver()

export default class intentResolver{
    constructor(private intentService: IntentService){
        this.intentService = new IntentService();
    }

    @Query (() => Intent)
    detectIntent(@Arg('input') chatInput: ChatInput, @Ctx() context: Context) {
        return this.intentService.detectIntent(chatInput, context);
    }
}