import { boardCollection, gameCollection } from "../MongoDB"
import { v5 as generateUuid } from 'uuid'; 

class Game {
    constructor(game_id, owner_id, choices) {
        this.game_id = game_id; // identify the specific game
        this.owner_id = owner_id; // user that created the game
        this.choices = choices; // choices that every Board will have 
        this.users = [];
    }

    /**
     * @param {ObjectId} user_id 
     * 
     * Adds user to the game
     */
    addUser = async (user_id)=>{
        // create new Board for this user
        const board = new Board(generateUuid(), user_id, bingo_id, choices)

        // insert into boardCollector for records
        const res = await boardCollection.insertOne({user_id, bingo_id: this._id, cells: b.cells})

        // update the game with new user 
        const res2 =  await gameCollection.updateOne({game_id: this.game_id}, {$push : {boards_ids: board.board_id}})
        this.users.append(user_id);

        console.log(res2)
    }

    /**
     * @param {ObjectId} user_id uuidv5
     * 
     * Start game
     */
        beginGame = async (users)=>{
            
        }
}