
import { usersCollection, gameCollection, boardCollection } from '../MongoDB.js';
import { ObjectId } from 'mongodb';
import { Game } from './Game.js'


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
        const res = await gameCollection.insertOne({ title, host_id, choices });
        return new Bingo( _id, title, host_id, choices);
    }

        /**
     * 
     * @param {String} username 
     * @param {Number} phoneNumber 
     * 
     * Creates user account
     */
        static createUser = async(username, phoneNumber)=>{
            const res = await usersCollection.insertOne({ phoneNumber, username });
            return User.register( _id, title, host_id, choices);
        }

    /**
     * 
     * @param {ObjectId} _id 
     * Finds bingo game from db with ObjectId. Mostly for dev purposes.
     */
    static findGame = async (_id)=>{
        return await gameCollection.findOne({_id})
    }

}

export default Bingo ;

// ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]