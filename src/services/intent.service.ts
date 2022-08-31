import { ChatInput } from "../schemas/chat.schema";
import Context from "../types/context";
import { sessionGenerator } from '../auth/dialogflowauth';
import { Intent } from "../schemas/intent.schema";


class IntentService {
    async detectIntent (chatInput: ChatInput, context: Context) {
        const session = await sessionGenerator();

        // The text query request.
        const request = {
            session: session?.sessionPath,
            queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: chatInput.message,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
            },
        };

        // Send request and log result
        const responses = await session?.sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        const output: Intent = {
            message: result.queryText,
            intent: (result.intent) ? result.intent.displayName: 'No intent detected',
            fullfillment: result.fulfillmentText,
        }
        return output;
    }
}

export default IntentService;