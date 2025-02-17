

let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let scores = {
    X: 0,
    O: 0,
    ties: 0
};

function CreatePlayer(symbol) {
    const player = symbol
    return {player}
}

const playerX = CreatePlayer("X")
const playerO = CreatePlayer("O")

function WhoGoesFirst(playerX, playerO) {
    let randomNumber = Math.random() * 2;  // Generates a number between 0 and 2

    if (randomNumber < 1) {
        return playerO;
    } else {
        return playerX;
    }
    }

function winCases(board) {
    // Check rows for a win
    for (let row = 0; row < 3; row++) {
        if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return board[row][0]; // Return 'X' or 'O'
        }
    }

    // Check columns for a win
    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col]; // Return 'X' or 'O'
        }
    }

    // Check diagonals for a win
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0]; // Return 'X' or 'O'
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2]; // Return 'X' or 'O'
    }

    // Check for a tie (if all cells are filled and there's no winner)
    if (board.flat().every(cell => cell !== null)) {
        return "tie";
    }

    return null; // No winner yet
}
function resetGame() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    currentPlayer = WhoGoesFirst(playerX, playerO); // Pick new first player
    RenderBoard(board);
}

// if player x or player O winCases
// if not null and nobody win yet then play



// Render the board and set it as the innerHTML

let firstPlayer = WhoGoesFirst(playerX, playerO);
document.getElementById("who-starts").textContent = firstPlayer.player +" " + "starts!";
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
let currentPlayer = firstPlayer; // Start with player X

function handleCellClick(event) {
    let cellDiv = event.target;

    if (cellDiv.tagName === "IMG") {
        cellDiv = cellDiv.parentElement;
    }

    const row = parseInt(cellDiv.dataset.row);
    const col = parseInt(cellDiv.dataset.col);

    if (board[row][col] === null) {
        board[row][col] = currentPlayer.player;

        const winner = winCases(board);
        if (winner) {
            if (winner === "tie") {
                scores.ties++;
                alert("It's a tie!");
            } else {
                scores[winner]++;
                alert(`Player ${winner} wins!`);
            }
            updateScoreboard();
            resetGame();
            return;
        }

        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
        RenderBoard(board);
    }
}
function updateScoreboard() {
    document.getElementById("score-x").textContent = scores.X;
    document.getElementById("score-o").textContent = scores.O;
    document.getElementById("score-ties").textContent = scores.ties;
}

// Call RenderBoard without assigning its return value
document.addEventListener("DOMContentLoaded", () => {
    RenderBoard(board);
    updateScoreboard();
});