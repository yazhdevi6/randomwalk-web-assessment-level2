document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resetBtn = document.getElementById("resetBtn");
    const scoreXElement = document.getElementById("scoreX");
    const scoreOElement = document.getElementById("scoreO");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let winner = null;
    let scoreX = 0;
    let scoreO = 0;

    // Initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }

    // Handle cell click event
    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === "" && !winner) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWin()) {
                winner = currentPlayer;
                updateScore();
                alert(`Player ${currentPlayer} wins!`);
            } else if (gameBoard.every(cell => cell !== "")) {
                alert("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Check for a winning pattern
    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    // Update the score and reset the board
    function updateScore() {
        if (winner === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else if (winner === "O") {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }

        resetBoard();
    }

    // Reset the game board
    function resetBoard() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        winner = null;
        currentPlayer = "X";
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });
    }

    // Reset the entire game
    resetBtn.addEventListener("click", function () {
        scoreX = 0;
        scoreO = 0;
        scoreXElement.textContent = scoreX;
        scoreOElement.textContent = scoreO;
        resetBoard();
    });

    // Initialize the game board
    initializeBoard();
});
