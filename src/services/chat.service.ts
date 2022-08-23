import { ChatInput } from "../schemas/chat.schema";
import Context from "../types/context";
import IntentService from "./intent.service";

class ChatService {
    constructor(private intentService: IntentService){
        this.intentService = new IntentService();
    }

    async respond (chatInput: ChatInput, context: Context) {
        const response = await this.intentService.detectIntent(chatInput, context);
        return response.fullfillment;
    }
}

export default ChatService;