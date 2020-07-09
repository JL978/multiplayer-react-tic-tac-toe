class Board{
    constructor() {
        this.game = new Array(9).fill(null);
        this.winStates = [
            [0, 1, 2], [3, 4, 5],[6, 7, 8],
            [0, 3, 6], [1, 4, 7],[2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        this.end = false
        this.turn = 'X'
        this.switch = new Map([['X', 'O'], ['O', 'X']])
    }

    move(index, piece){
        if (!this.game[index] && !this.end){
            const newState = [...this.game]
            newState.splice(index, 1, piece)
            this.game = newState
        }
    }

    switchTurn(){
        this.turn = this.switch.get(this.turn)
    }

    checkWinner(player){
        return this.winStates.some(state =>(
          state.every((position => this.game[position] === player))
        ))
    }
    
    checkDraw(){
        return this.game.every(value => value !== null)
    }

    reset(){
        this.game = new Array(9).fill(null)
        this.tur = 'X'
    }
}

module.exports = Board