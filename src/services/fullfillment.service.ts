import { Query } from "type-graphql";
import { ChatInput } from "../schemas/chat.schema";
import Context from "../types/context";
import { ContextForAnswerModel, ContextForAnswer } from "../schemas/fullfillment.schema";


class FullfillmentService {

    async contextForAnswerLookUp(intent: String | undefined) {
        let queryResult: any = await ContextForAnswerModel.find({intent: intent});
        let contextForAnswer: ContextForAnswer = {
            intent: queryResult[0].intent,
            context: queryResult[0].context
        }
        return contextForAnswer.context;
    }

    async fullfill (chatInput: ChatInput, intent: String | undefined, context: Context) {
        let axios = require('axios');
        let question = chatInput.message;
        let contextForAnswer = await this.contextForAnswerLookUp(intent);
        let query = 'http://127.0.0.1:5000/qa?question=' + question + '&context=' + contextForAnswer;
        let response: any = await axios.get(encodeURI(query))
        .then((response : any) => {
            return response.data;
        })
        .catch((error : any) => {
            console.log(error);
        });
        const output = {
            question: response.question,
            context: response.context,
            answer: response.answer ? response.answer : "Please consider reaching to the HR department to answer your query",
        }
        return output;
    }
}

export default FullfillmentService;