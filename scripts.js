console.log('Happy developing ✨')

const board =[
        ["X", "X", null],
        ["O", "O", null],
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
    let row = 0;
    let col = 2;

    if (board[row][col] === null) {
        board[row][col] = currentPlayer; // Place the current player's symbol
    }

    // Check if the move resulted in a win
    const winner = winCases(board);
    if (winner) {
        return `Player ${winner} wins!`; // Declare the winner
    }

    // If no winner, return the updated board
    return board;
}
function renderTextBoard(board) {
    return board.map(row =>
        row.map(cell => cell === null ? " " : cell).join(" | ")
    ).join("\n---------\n");
}

// Render the board and set it as the innerHTML
document.getElementById("text-board").textContent = renderTextBoard(board);
let firstPlayer = WhoGoesFirst(playerX, playerO);
console.log("The first player is:", firstPlayer);
console.log(Game(board, "X"))

// eventually I'll need to replace the text board with images
//render the board with a  loop in the board object and an if to determine whether to show an x or an image
function RenderBoard(board) {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; // Clear existing board

    for (let row of board) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        for (let cell of row) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");

            if (cell === "O") {
                const img = document.createElement("img");
                img.src = "OIcon.png";
                cellDiv.appendChild(img);
            } else if (cell === "X") {
                const img = document.createElement("img");
                img.src = "XIcon.png";
                cellDiv.appendChild(img);
            } else {
                cellDiv.textContent = ""; // Empty cell
            }

            rowDiv.appendChild(cellDiv);
        }

        boardDiv.appendChild(rowDiv);
    }
}
// Call RenderBoard without assigning its return value
RenderBoard(board);