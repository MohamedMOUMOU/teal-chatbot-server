import { Ctx, Query, Resolver, Arg } from "type-graphql";
import FullfillmentService from "../services/fullfillment.service";
import { ChatInput } from "../schemas/chat.schema";
import { Fullfillment } from "../schemas/fullfillment.schema";
import Context from "../types/context";

@Resolver()

export default class fullfillmentResolver{
    constructor(private fullfillmentService: FullfillmentService){
        this.fullfillmentService = new FullfillmentService();
    }

    @Query (() => Fullfillment)
    fullfill(@Arg('input') chatInput: ChatInput, @Ctx() context: Context) {
        return this.fullfillmentService.fullfill(chatInput, "", context);
    }
}