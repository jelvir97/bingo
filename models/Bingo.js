
import { usersCollection, bingoCollection, boardCollection } from '../MongoDB.js';
import { ObjectId } from 'mongodb';


class Bingo {
    constructor(_id, title, host_id, choices){
        this._id = _id;
        this.title = title;
        this.host_id = host_id;
        this.choices = choices;
    }
    /**
     * 
     * @param {String} title 
     * @param {ObjectId} host_id 
     * @param {Array} choices 
     * 
     * Creates Bingo instance and assigns game to host(game creator).
     */
    static create = async(title, host_id, choices)=>{
        const res = await bingoCollection.insertOne({ title, host_id, choices });
        const _id = res.insertedId
        return new Bingo( _id, title, host_id, choices);
    }

    /**
     * @param {ObjectId} user_id 
     * 
     * Creates board tied to a particular game. Assigns board to player. Returns board.
     */
    addBoard = async (user_id)=>{
        const bingo_id = this._id, choices = this.choices;

        const b = new Board(null, user_id, bingo_id, choices, null)
        const res = await boardCollection.insertOne({user_id, bingo_id : this._id, cells: b.cells})
        b._id =  res.insertedId

        const res2 =  await bingoCollection.updateOne({_id: this._id}, {$push : {boards_ids: b._id}})

        console.log(res2)
        return b;
    }

    /**
     * 
     * @param {ObjectId} _id 
     * Finds bingo game from db with ObjectId. Mostly for dev purposes.
     */
    static findGame = async (_id)=>{
        return await bingoCollection.findOne({_id})
    }

    title;

    host_id;

    board_ids = [];

    choices = [];

    wins = [];

}


class User {
    static async register(phone, username){
        const user = await usersCollection.insertOne({phone, username})
        
        return {_id:user.insertedId, username, phone}
    }
}

export {Bingo, User}