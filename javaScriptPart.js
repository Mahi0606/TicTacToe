var gameBoard = document.querySelector('.game-board')
if (gameBoard) {
    gameBoard.style.justifyContent = 'center'
    gameBoard.style.width = '100wh'
}

// Update .cell styles
var cells = document.querySelectorAll('.cell')
cells.forEach(function (cell) {
    cell.style.borderStyle = 'solid'
    cell.style.borderWidth = '2px'
})

// Update #restartButton styles
var restartButton = document.querySelector('#restartButton')
if (restartButton) {
    restartButton.style.marginTop = '20px'
    restartButton.style.padding = '5px'
}



let currentPlayer = 'X'
let gameOn = true
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
]

function checkWin(currentPlayer) {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cells[index].textContent === currentPlayer
        })
    })
}

function checkDraw() {
    return [...cells].every((cell) => cell.textContent)
}

var undoButton = document.createElement("button");
undoButton.id = "undoButton";
undoButton.textContent = "Undo";
document.body.appendChild(undoButton);

var moveHistory = [];

function updateUndoButton() {
    if (moveHistory.length > 0) {
        undoButton.disabled = false;
    } else {
        undoButton.disabled = true;
    }
}

undoButton.addEventListener('click', () => {
    if (moveHistory.length > 0) {
        var lastMoveIndex = moveHistory.pop();
        cells[lastMoveIndex].textContent = '';
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateUndoButton();
    }
});

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameOn = true;
}

restartButton.addEventListener('click', () => {
    if (!gameOn) {
        alert("Game over! Click OK to restart.");
    }
    resetGame();
});


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '' && gameOn) {
            cell.textContent = currentPlayer


            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer} wins!`)
                gameOn = false
                return
            }
            if (checkDraw()) {
                alert("It's a draw!")
                gameOn = false
            }
            moveHistory.push(index);
            currentPlayer = currentPlayer === 'X' ? 'Y' : 'X'
            updateUndoButton();
        }
    })
})
