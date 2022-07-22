import mongoose from 'mongoose';
import config from 'config';

export async function connectToMongo(){
    try{
        await mongoose.connect(config.get('dbUri'));
        console.log('Successfully connected to the databse!');
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}