import { getModelForClass, prop, ReturnModelType, index } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';


@index({ sender: 1 })
@ObjectType()

export class Chat {

    @Field(() => String)
    @prop({required: true})
    sender: string

    @Field(() => String)
    @prop({required: true})
    message: string
}

export const ChatModel: ReturnModelType<typeof Chat> = getModelForClass(Chat);

@InputType()
export class ChatInput {
    @Field(() => String)
    sender: string

    @Field(() => String)
    message: string
}