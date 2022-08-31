import { getModelForClass, prop, ReturnModelType, index } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';


@ObjectType()
@InputType()
export class Fullfillment {

    @Field(() => String)
    @prop({required: true})
    question: string

    @Field(() => String)
    @prop({required: true})
    context: string

    @Field(() => String)
    @prop({required: true})
    answer: string
}
@index({ intent: 1 })
@ObjectType()
export class ContextForAnswer {

    @Field(() => String)
    @prop({required: true})
    intent: string

    @Field(() => String)
    @prop({required: true})
    context: string
}

export const ContextForAnswerModel: ReturnModelType<typeof ContextForAnswer> = getModelForClass(ContextForAnswer);