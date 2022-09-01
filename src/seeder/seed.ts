import config from 'config';
import * as seedData from './data.json';

const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
    // Connection URL
    const uri = config.get('dbUri');

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");
        console.log("Seeding starts...");
        const db = await client.db("hr-chatbot");
        await db.dropDatabase();
        const collection = await client.db("hr-chatbot").collection("contextforanswers");
        let data = seedData.contextForAanswers;
        await collection.insertMany(data);
        console.log("Database seeded! :)");
        await client.close();
    } catch (err: any) {
        console.log(err.stack);
    }
}

seedDB();