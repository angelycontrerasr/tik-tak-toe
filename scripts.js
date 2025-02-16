console.log('Happy developing ✨')

let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
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
    // The move will now be set in handleCellClick
    const winner = winCases(board);
    if (winner) {
        alert(`Player ${winner} wins!`);
        return board;
    }

    return board; // Return updated board
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

// eventually I'll need to replace the text board with images
//render the board with a  loop in the board object and an if to determine whether to show an x or an image
function RenderBoard(board) {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; // Clear existing board

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        for (let colIndex = 0; colIndex < 3; colIndex++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.row = rowIndex.toString();
            cellDiv.dataset.col = colIndex.toString();

            if (board[rowIndex][colIndex] === "O") {
                const img = document.createElement("img");
                img.src = "OIcon.png";
                cellDiv.appendChild(img);
            } else if (board[rowIndex][colIndex] === "X") {
                const img = document.createElement("img");
                img.src = "XIcon.png";
                cellDiv.appendChild(img);
            }

            // Add click event listener
            cellDiv.addEventListener("click", handleCellClick);

            rowDiv.appendChild(cellDiv);
        }

        boardDiv.appendChild(rowDiv);
    }
}
let currentPlayer = WhoGoesFirst(playerX, playerO); // Start with player X

function handleCellClick(event) {
    let cellDiv = event.target;

    // If the user clicked on the image, we need to get its parent div
    if (cellDiv.tagName === "IMG") {
        cellDiv = cellDiv.parentElement;
    }

    const row = parseInt(cellDiv.dataset.row);
    const col = parseInt(cellDiv.dataset.col);

    // Check if the cell is empty before making a move
    if (board[row][col] === null) {
        board[row][col] = currentPlayer.player; // Update board with the current player's symbol

        // Check for a winner
        const winner = winCases(board);
        if (winner) {
            alert(`Player ${winner} wins!`);
            return;
        }

        // Switch player
        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;

        // Re-render the board
        RenderBoard(board);
    }
}
// Call RenderBoard without assigning its return value
document.addEventListener("DOMContentLoaded", () => {
    RenderBoard(board);
});