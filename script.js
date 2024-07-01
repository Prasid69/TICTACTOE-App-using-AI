document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const message = document.querySelector(".message");
  const newGameBtn = document.getElementById("new-game-btn");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalNewGameBtn = document.getElementById("modal-new-game-btn");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = cell;
      cellElement.addEventListener("click", () => handleCellClick(index));
      board.appendChild(cellElement);
    });
  };

  const handleCellClick = (index) => {
    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      renderBoard();
      if (checkWinner()) {
        displayResult(`Player ${currentPlayer} wins!`);
      } else if (gameBoard.every((cell) => cell !== "")) {
        displayResult("It's a draw!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] !== "" &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return true;
      }
    }

    return false;
  };

  const displayResult = (result) => {
    message.textContent = result;
    modalMessage.textContent = result;
    modal.style.display = "block";
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  window.startNewGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    renderBoard();
    message.textContent = "";
    modal.style.display = "none";
  };

  renderBoard();
});
