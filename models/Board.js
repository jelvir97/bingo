import { usersCollection, bingoCollection, boardCollection } from '../MongoDB.js';
import { ObjectId } from 'mongodb';
import { makeBoard } from '../helpers/boardHelpers.js';

class Board {
    constructor(board_id ,user_id, bingo_id, choices){
        this.board_id = board_id;
        this.user_id = user_id;
        this.bingo_id = bingo_id;
        this.cells = choices ? makeBoard(choices) : cells;
    }

    cells = [];

    /**
     * 
     * @param {Cell} c 
     * Marks cell and updates db.
     * 
     * Checks for win.
     */
    markCell = async (c)=>{
        c.marked = true;
        const res = await boardCollection.updateOne({_id: this._id}, {$set: {cells : this.cells}})
        console.log(res)

        if(this.checkWin()){
            console.log("You won!")
            bingoCollection.updateOne({_id:this.bingo_id}, {$push: {wins: this._id}})
        }

        return this
    }

    /**
     * Finds board for dev purposes.
     */
    static findBoard = async (board_id)=>{
        const b = await boardCollection.findOne({_id: board_id})
        return new Board(b._id, b.user_id, b.bingo_id, null, b.cells);
    }
    /**
     * Checks if player has won.
     * 
     * Statically checks every possibility.
     * 
     */
    checkWin = ()=>{
        let c = this.cells;
        console.log("in check win", c)
        //check rows
        if(c[0][0].marked && c[0][1].marked && c[0][2].marked && c[0][3].marked && c[0][4].marked) return true;
        if(c[1][0].marked && c[1][1].marked && c[1][2].marked && c[1][3].marked && c[1][4].marked) return true;
        if(c[2][0].marked && c[2][1].marked && c[2][2].marked && c[2][3].marked && c[2][4].marked) return true;
        if(c[3][0].marked && c[3][1].marked && c[3][2].marked && c[3][3].marked && c[3][4].marked) return true;
        if(c[4][0].marked && c[4][1].marked && c[4][2].marked && c[4][3].marked && c[4][4].marked) return true;

        //check cols
        if(c[0][0].marked && c[1][0].marked && c[1][0].marked && c[1][0].marked && c[4][0].marked) return true;
        if(c[0][1].marked && c[1][1].marked && c[1][1].marked && c[1][1].marked && c[4][1].marked) return true;
        if(c[0][2].marked && c[1][2].marked && c[1][2].marked && c[1][2].marked && c[4][2].marked) return true;
        if(c[0][3].marked && c[1][3].marked && c[1][3].marked && c[1][3].marked && c[4][3].marked) return true;
        if(c[0][4].marked && c[1][4].marked && c[1][4].marked && c[1][4].marked && c[4][4].marked) return true;

        //check diagonals
        if(c[0][0].marked && c[1][1].marked && c[2][2].marked && c[3][3].marked && c[4][4].marked) return true;
        if(c[0][4].marked && c[1][3].marked && c[2][2].marked && c[3][1].marked && c[4][0].marked) return true;

        return false;
    }
    
}

export default Board;