let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	newGame();
}

function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], 
		[0, 3, 6], [1, 4, 7], [2, 5, 8], 
		[0, 4, 8], [2, 4, 6] 
	];

	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	return gameStatus.DRAW_GAME;
}

function newGame() {
   clearTimeout(computerMoveTimeout);
   computerMoveTimeout = 0;
   const buttons = getGameBoardButtons();
   for(const button of buttons){
      button.textContent = "";
      button.className = '';
      button.disabled = false;
   }

   playerTurn = true;
   document.getElementById("turnInfo").textContent = "Your turn";
}

function boardButtonClicked(button) {
   if(playerTurn === true){
      button.textContent = 'X';
      button.classList.add("x");
      button.disabled = true;
      switchTurn();
   }
}

function switchTurn() {
   const status = checkForWinner();
   const turnInfo = document.getElementById('turnInfo'); 

   if (status === gameStatus.MORE_MOVES_LEFT) {
      playerTurn = !playerTurn; 

      if (playerTurn) {
         turnInfo.textContent = "Your turn";
      } else {
         computerMoveTimeout = setTimeout(makeComputerMove, 1000); 
         turnInfo.textContent = "Computer's turn";
      }
   } else {
      playerTurn = false; 

      if (status === gameStatus.HUMAN_WINS) {
         turnInfo.textContent = "You win!";
      } else if (status === gameStatus.COMPUTER_WINS) {
         turnInfo.textContent = "Computer wins!";
      } else { // DRAW_GAME
         turnInfo.textContent = "Draw game";
      }
   }
}


function makeComputerMove() {
   const buttons = getGameBoardButtons();
   const arr = [];
   for(const button of buttons){
      if(button.textContent === ''){
         arr.push(button);
      }
   }

   if(arr.length > 0){
      const index = Math.floor(Math.random() * arr.length);
      const b = arr[index];
      b.textContent = "O";
      b.classList.add('o');
      b.disabled = true;
   }
   
   switchTurn();

}