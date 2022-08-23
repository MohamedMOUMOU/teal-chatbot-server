import { getModelForClass, prop, ReturnModelType, index } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';


@ObjectType()

export class Intent {

    @Field(() => String)
    @prop({required: true})
    message: string

    @Field(() => String)
    @prop({required: true})
    intent: string | undefined

    @Field(() => String)
    @prop({required: true})
    fullfillment: string
}

export const IntentModel: ReturnModelType<typeof Intent> = getModelForClass(Intent);
