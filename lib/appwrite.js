import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your endpoint
    .setProject('67e988c10036df4850dd');// Replace with your project ID
    
const account = new Account(client);
const databases = new Databases(client);

const databaseId = '67e989db000cff7e1caf';
const usersCollectionId = '67ea272b0003a0fd1722';
const servicesCollectionId = '67e989f0001ac5ab1537';
const ordersCollectionId = '67e98b4a00262501eba3';

export { 
    client, 
    account, 
    databases, 
    databaseId, 
    usersCollectionId, 
    servicesCollectionId, 
    ordersCollectionId,
    ID,
    Query
};