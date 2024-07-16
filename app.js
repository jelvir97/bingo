import express from "express";
import {Bingo} from "./Bingo.js"
import {client, usersCollection} from "./MongoDB.js"

// initialize express app
const app = express();

// connect to MongoDB
try{
    await client.connect()
}catch(err){
    await client.close()
}


app.get('/',async (req, res, next)=>{
    // const b = new Bingo()

    const u = await usersCollection.findOne({username:"shufflemazter"});
    return res.json({user: u});
})


export default app;