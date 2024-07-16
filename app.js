import express from "express";
import {Bingo} from "./models/Bingo.js"
import {Board} from "./models/Board.js"
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
    const b = new Bingo()

    const u = await usersCollection.findOne({username:"shufflemazter"});
    return res.json({user: u});
})

app.get('createGame', async (req, res, next) => {
    const game = new Board(req.body?._id, req.body?.user_id, req.body?.bingo, choices);
})
_id ,user_id, bingo_id, choices, cells

export default app;