console.log('Happy developing ✨')

const board =[
        ["X", "X", null],
        ["O", null, null],
        ["O", null, null]
    ]
function CreatePlayer(symbol) {
    const player = symbol
    return {player}
}

const playerX = CreatePlayer("X")
const playerO = CreatePlayer("O")

function WhoGoesFirst(playerX, playerO) {
    let randomNumber = Math.random() * 2;  // Generates a number between 0 and 2

    if (randomNumber < 1) {
        console.log("O first");
        return playerO;
    } else {
        console.log("X first");
        return playerX;
    }
    }

function winCases(board) {
    // Check rows for a win
    for (let row = 0; row < 3; row++) {
        if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return board[row][0]; // Return the winning player ('X' or 'O')
        }
    }

    // Check columns for a win
    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col]; // Return the winning player ('X' or 'O')
        }
    }

    // Check diagonals for a win
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0]; // Return the winning player ('X' or 'O')
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2]; // Return the winning player ('X' or 'O')
    }

    // No winner yet
    return null;
}

// if player x or player O winCases
// if not null and nobody win yet then play

function Game(board, currentPlayer) {
    // Simulate a move (for simplicity, we'll place "O" at [0][2])
    if (board[0][2] === null) {
        board[0][2] = currentPlayer; // Place the current player's symbol
    }

    // Check if the move resulted in a win
    const winner = winCases(board);
    if (winner) {
        return `Player ${winner} wins!`; // Declare the winner
    }

    // If no winner, return the updated board
    return board;
}
let firstPlayer = WhoGoesFirst(playerX, playerO);
console.log("The first player is:", firstPlayer);
console.log(Game(board, "X"))
