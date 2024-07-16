
import { usersCollection, bingoCollection, boardCollection } from '../MongoDB.js';
import Board from "./Board.js"
import { ObjectId } from 'mongodb';


class Bingo {
    /**
     * 
     * @param {String} title 
     * @param {ObjectId} host_id 
     * @param {Array} choices 
     * 
     * Creates Bingo instance and assigns game to host(game creator).
     */
    static createGame = async(title, host_id, choices)=>{
        const res = await bingoCollection.insertOne({ title, host_id, choices });
        const _id = res.insertedId;
        return new Bingo( _id, title, host_id, choices);
    }

    /**
     * 
     * @param {ObjectId} _id 
     * Finds bingo game from db with ObjectId. Mostly for dev purposes.
     */
    static findGame = async (_id)=>{
        return await bingoCollection.findOne({_id})
    }

}

export default Bingo ;

// ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]