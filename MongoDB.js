import  { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_USER_PWD, MONGO_USER, MONGO_CLUSTER_URI } from "./config.js"
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_USER_PWD}@${MONGO_CLUSTER_URI}/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const usersCollection = client.db("Bingo").collection("users")
const bingoCollection = client.db("Bingo").collection("bingo")
const boardCollection = client.db("Bingo").collection("board")

// run().catch(console.dir);

export {client, usersCollection, bingoCollection, boardCollection}