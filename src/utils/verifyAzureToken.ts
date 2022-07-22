import { ApolloError } from "apollo-server";
import JWT from 'jsonwebtoken';

export function verifyAccessToken (token: string) {
    try {
        if (!token || !token.startsWith("Bearer ")) {
            return new ApolloError('No token!');
        }
        token = token.slice(7, token.length).trimLeft(); // Remove 'Bearer ' characters from start of Auth header value
        const key = process.env.AAD_PRIVATE_KEY;
        const settings = {
            audience: process.env.AAD_TOKEN_AUDIENCE,
            openIdConfigUrl: process.env.AAD_TOKEN_OPEN_ID_CONNECT_METADATA_DOCUMENT,
            tenantId: process.env.AAD_TOKEN_TENANT_ID,
        };

        let results: any = JWT.verify(
            token,
            key as string, 
            {
            audience: settings.audience,
            issuer: settings.tenantId
            }
        )
        const user: any = {
            name: results.name,
            email: results.upn
        }
        return user;
    }catch (error){
        console.log(error);
    }
}