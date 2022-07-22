import { getModelForClass, prop, pre, ReturnModelType, index } from '@typegoose/typegoose';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import bcrypt from 'bcrypt';


@pre<User>('save', async function () {
    if(!this.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
})

@index({ email: 1 })
@ObjectType()

export class User {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({required: true})
    name: string

    @Field(() => String)
    @prop({required: true})
    email: string

    @Field(() => String)
    @prop({required: false})
    password: string

    public static findByEmail(this: ReturnModelType<typeof User>, email: string){
        return this.findOne({ email }).exec();
    }
}

export const UserModel: ReturnModelType<typeof User> = getModelForClass(User);

@InputType()
export class LoginInput {
    @IsEmail()
    @Field(() => String)
    email: string

    @MinLength(6, {
        message: 'password must be at least 6 caracters long',
    })
    @MaxLength(50, {
        message: 'The password length can not e more than 50 caracters',
    })
    @Field(() => String)
    password: string
}

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string

    @IsEmail()
    @Field(() => String)
    email: string

    @MinLength(6, {
        message: 'password must be at least 6 caracters long',
    })
    @MaxLength(50, {
        message: 'The password length can not e more than 50 caracters',
    })
    @Field(() => String)
    password: string
}