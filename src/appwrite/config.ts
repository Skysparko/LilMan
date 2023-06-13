import {Client, Account, Databases} from 'appwrite';

// Create a new instance of the Appwrite Client
const client = new Client();

// Configure the client with the Appwrite endpoint and project ID
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('646f82dc5d2dc807d616');

// Create an instance of the Account service using the client
export const account = new Account(client);

// Create an instance of the Databases service using the client
export const database = new Databases(client);
