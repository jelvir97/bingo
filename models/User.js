import { usersCollection, bingoCollection, boardCollection } from '../MongoDB.js';
import { ObjectId } from 'mongodb';

class User {
    static register = async (phone, username)=>{
        const user = await usersCollection.insertOne({phone, username})
        
        return {_id:user.insertedId, username, phone}
    }

    static findGames = async (u_id)=>{
        const games = boardCollection.aggregate([
            {
              $match: { // Filter boards based on user criteria (replace with your condition)
                user_id: u_id // Replace with your field name and user id
              }
            },
            {
              $lookup: {
                from: 'game',
                localField: 'game_id', // Field in board referencing bingo game
                foreignField: '_id',
                as: 'associatedGame' // Name for the lookup result
              }
            },
            // {
            //   $unwind: '$associatedGame' // Deconstruct the array from the lookup (optional)
            // },
            {
              $project: {
                _id: 1, // Exclude board id if not needed
                user_id: 1, // User id from the board collection
                cells: 1,
                bingoTitle: '$associatedGame.title', // Title from the bingo game
                bingoHost: '$associatedGame.host_id'
              }
            }
          ])

          return games;
    }


}

export default User;