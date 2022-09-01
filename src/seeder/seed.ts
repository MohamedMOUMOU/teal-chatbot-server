import config from 'config';

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
        const collection = await client.db("hr-chatbot").collection("contextforanswers");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        await collection.drop();

        // make a bunch of time series data
        let data = [
            {
                intent: "Leave policy",
                context: "All employees at Teal are eligible for leaves. Leave is a fundamental right of each employee. The Request of a paid leave must be submitted on the intranet: Tealer must specify the leave, return dates, and type of leave. (Duly filled form) The request for a paid leave must be submitted 72 hours in advance. If the manager is unavailable, he can delegate the approval of the paid leave to the HR department. During  remote work, email submission of a paid leave is accepted, and the manager's approval is sufficient. HR approval for a paid leave is required for exceptional cases. The duration of a maternity leave is 14 weeks. The Tealer has the right to take up to 6 weeks of maternity leave before the due date. In case of a maternity leave, the medical certificate submitted to HR should indicate the expected delivery date. The Tealer must inform the HR Department of the planned day of Maternity leave. The maternity leave dates are to be set by the HR administrator based on the information provided by the employee. The dates of the maternity leave must be corrected upon receipt of the birth certificate. In case the employee wishes to apply for unpaid leave after maternity leave, she must submit a signed and certified handwritten letter 15 days before the end of her maternity leave. The Tealer must inform the HR Department of the planned day of Maternity leave. Examples of exceptional leaves include: circumcision, marriage, surgery, death, birth, etc. An exceprional/ circumcision/ marriage/ surgery leave request is filled out 2 weeks in advance on the intranet, the supporting documents are given to the HR department. If the exceptional/ death/ birth leave is not planned, the employee can fill out and submit the request on Sage Intranet at their return. The duration of a sick leave is 5 Days per year (not consecutive) unless exceptional approval is provided by the manager. Employees on Bench can go systematically on leave. In case the employees’ balance is negative, specifications regarding the bench leave duration will be communicated by HR. Any Tealer is entitled to apply for paid vacation leave as soon as they successfully complete 6 months within Teal. Employees can go for a paid vacation leave before 6 months only if it is approved by their manager. A filled-out request for the paid vacation leave must be submitted to HR 72 hours before the requested paid vaaction leave date. Only 10 days of last year's leaves can be carried over to the next year. Marriage leave must be consumed within one month from the date mentioned in the marriage license. The days of a marriage leave must be taken in a row unless approved by manager and HR. Child's marriage leave must be consumed within one month from the date mentioned in the child's marriage license. The number of days allowed for a marriage leave is 4 days. The number of days allowed for a of a child marriage leave is 2 days. The number of days allowed for a a paternity leave is 5 days. The number of days allowed for a circumcision leave is 2 days. The number of days allowed for an annual paid vacation is at least 20 days."
            }
        ]
        await collection.insertMany(data);

        console.log("Database seeded! :)");
        await client.close();
    } catch (err: any) {
        console.log(err.stack);
    }
}

seedDB();