import { ChatInput } from "../schemas/chat.schema";
import Context from "../types/context";
import IntentService from "./intent.service";
import FullfillmentService from "./fullfillment.service";

class ChatService {
    constructor(private intentService: IntentService, private fullfillmentService: FullfillmentService){
        this.intentService = intentService;
        this.fullfillmentService = fullfillmentService;
    }

    async respond (chatInput: ChatInput, context: Context) {
        const response = await this.intentService.detectIntent(chatInput, context);
        let answer = response.fullfillment;
        if (answer == '') {
            let fullfillment = await this.fullfillmentService.fullfill(chatInput, response.intent, context);
            answer = fullfillment.answer;
        }
        return answer;
    }
}

export default ChatService;