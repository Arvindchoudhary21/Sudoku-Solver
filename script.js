let arr = [[], [], [], [], [], [], [], [], []]

for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


let board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = '';
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')


GetPuzzle.onclick = function () {
	let xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		let response = JSON.parse(xhrRequest.response)
		// console.log(response)
		board = response.newboard.grids[0].value;
		// console.log(board);
		// console.log(board[0][0]);
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	
	sudukoSolver(board, 9);
	FillBoard(board);
};

function sudukoSolver(board, n) {

	solve(board, n)


}
function isvalid(board, row, col, num) {
	for (let i = 0; i < 9; i++) {
		if (board[row][i] === num || board[i][col] === num || board[(3 * Math.floor(row / 3) + Math.floor(i / 3))][(3 * Math.floor(col / 3) + (i % 3))] === num) {
			return false;
		}
	}
	return true;
}
function solve(board, n) {
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (board[i][j] === 0) {
				for (let num = 1; num <= 9; num++) {
					if (isvalid(board, i, j, num) == true) {
						board[i][j] = num;

						if (solve(board, n) == true) {
							return true;
						}

						board[i][j] = 0;
					}
				}
				return false;
			}
		}
	}
	return true;
}




