import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { resolvers } from './resolvers';
import { connectToMongo } from './utils/mongo';
import Context from './types/context';
import { verifyJwt } from './utils/jwt';
import { User } from './schemas/user.schema';
import { verifyAccessToken } from './utils/verifyAzureToken';

async function bootstrap(){
    // Build the schema
    const schema = await buildSchema({
        resolvers,
        //authchecker,
    });
    // Init express
    const app = express();
    app.use(cookieParser());
    // Create the apollo server
    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
            const context = ctx;
            if(ctx.req.headers["authorization"]){
                const user = verifyAccessToken(ctx.req.headers["authorization"]);
                context.user = user;
            }
            console.log(context.user);
            return context;
        },
        plugins: [process.env.NODE_ENV === 'production' ? 
            ApolloServerPluginLandingPageProductionDefault()
            : ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await server.start()
    // apply middleware to server
    server.applyMiddleware({
        app
    });
    // app.listen on express server
    app.listen({port: 4000}, ()=>{
        console.log('App is listenning on http://localhost:4000')
    });
    // connect to db
    connectToMongo();
}

bootstrap();