const container = document.querySelector(".container");

function checkForWin(board, playerIndex){
    console.log("board", board);
    const combinations = 
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i=0; i< combinations.length; i++){
        
        let [a,b,c ] = combinations[i];
        console.log(a,b,c)
        
       
        if(board[a] && board[a]  === board[b] && board[a]=== board[c]){

            return true
             
         }
       /// return false
    }


}

function checkForTie(board){
 return board.every(cell => cell !== "");
}
const Board = (() => {
    let board = ["", "","", "","", "","","", ""];


    const render = () =>{

        container.innerHTML = ""
        for (let i = 0; i < board.length; i++){
            container.innerHTML += `<div class="board-selection">${board[i]}</div>`;
        }
        const boardSelection = document.querySelectorAll(".board-selection");
        for(let i =0; i< boardSelection.length; i++){
            boardSelection[i].addEventListener("click", function(){

                if(Board.GetBoard()[i] === ""){
                    Game.handleClick(i)
              }

            })
    
    }
    }

    const update= (index, value)=>{
        board[index] = value;
        render()
    }

    const clear = () => {
        board = ["", "","", "","", "","","", ""];
        render()
    }

    const GetBoard = ()=> board

 return {render , board, update, GetBoard, clear}
})()



const Player = (name, symbol) => {
 return{name,symbol}

}
 
const Game =(() => {
    let gameOver = false;
    const player1 = Player("Player 1","X")
    const player2 = Player("Player 1","O")
     const players = [player1, player2];
     console.log("payer1", player1)
     let currentPlayerIndex = 0
   Board.render();
    const start = () => {
        const boardSelection = document.querySelectorAll(".board-selection");
        for(let i =0; i< boardSelection.length; i++){

            
            boardSelection[i].addEventListener("click", function(){

               if(Board.GetBoard()[i] === ""){
                    Game.handleClick(i)
              }
            })
    
    }
}

    const handleClick = (index) => {
        let selection = document.querySelector("#selection")
        const subtitle = document.getElementById("sub-title")
        
        if(gameOver != true){
            Board.update(index, players[currentPlayerIndex].symbol)
        }else {
                return
            //return
        }

        if (checkForWin(Board.GetBoard(), players[currentPlayerIndex].symbol)){
            subtitle.textContent = `Player ${players[currentPlayerIndex].symbol} has won!`
            gameOver = true
            //restart()

        }else if(checkForTie(Board.GetBoard())){
               subtitle.textContent = "It's a draw!"
               gameOver = true
        }

        
           
        
       
        
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
        selection.textContent =  players[currentPlayerIndex].symbol
    }


    const restart = () => {
        //const restartBtn = document.querySelector('#restart-btn');
       // let subtitle = document.querySelector("#sub-title")
        
Board.clear()
gameOver = false
        
}

  


    return{start, handleClick, restart}
    
})()

Game.start()



const restartBtn = document.querySelector('#restart-btn');
let subtitle = document.querySelector("#sub-title")
restartBtn.addEventListener("click", function(){
    subtitle.innerHTML = `Player <span id="selection">X</span>'s turn`
        Game.restart()
        Game.start()
    })