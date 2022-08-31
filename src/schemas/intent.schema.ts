import { prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
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