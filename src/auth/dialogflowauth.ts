import * as authData from './tealagentCredentials.json';
import { v4 as uuidv4 } from 'uuid';
const dialogflow = require('@google-cloud/dialogflow');

export async function sessionGenerator() {
  try {
    const sessionId = uuidv4();
    const configuration = {
        credentials: {
            private_key: authData.private_key,
            client_email: authData.client_email,
        }
    }
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient(configuration);
    const sessionPath = sessionClient.projectAgentSessionPath(
        'tealagent-yaqw',
        sessionId
    );
    return {sessionPath: sessionPath, sessionClient: sessionClient};
  } catch (err) {
    console.error('ERROR:', err);
  }
}