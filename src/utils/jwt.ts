import config from 'config';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/user.schema';

const publicKey = Buffer.from(config.get<string>('publicKey'), 'base64').toString('ascii');
const privateKey = Buffer.from(config.get<string>('privateKey'), 'base64').toString('ascii');

export function signJwt(user: User, options?: jwt.SignOptions | undefined){
    return jwt.sign(JSON.stringify(user), privateKey, { ...(options && options), algorithm: 'RS256' });
}

export function verifyJwt<T>(token: string): T | null {
    try{
        const decoded = jwt.verify(token, publicKey) as T;
        return decoded;
    }catch(error){
        console.log(error);
        return null;
    }
}