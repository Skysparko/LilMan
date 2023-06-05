import {Client, Account, Databases} from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('646f82dc5d2dc807d616');

export const account = new Account(client);

export const database = new Databases(client);
