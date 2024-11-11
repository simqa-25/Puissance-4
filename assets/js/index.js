// let currentPlayer = "red"; // Le joueur qui commence (rouge)
// let gameOver = false; 
// let gameMode = ""; 
// const cells = document.querySelectorAll(".cell");
// const messageElement = document.querySelector("#message");
// const replayButton = document.querySelector("#replayButton");

// // Fonction pour générer un nombre aléatoire
// function randomize(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }


// const humanVsHumanTab = document.querySelector("#humanVsHuman");
// const humanVsComputerTab = document.querySelector("#humanVsComputer");

// // Pour selectionner le mode de jeu
// humanVsHumanTab.addEventListener("click", () => selectGameMode("humanVsHuman"));
// humanVsComputerTab.addEventListener("click", () =>
//   selectGameMode("humanVsComputer")
// );

// function selectGameMode(mode) {
//   document.querySelector(".tabButton.active")?.classList.remove("active");
//   if (mode === "humanVsHuman") {
//     humanVsHumanTab.classList.add("active");
//   } else {
//     humanVsComputerTab.classList.add("active");
//   }
//   gameMode = mode;
//   resetGame();
// }

// // Ajout des événements de clic sur les cellules
// cells.forEach((cell) => {
//   cell.addEventListener("click", handleCellClick);
// });

// // Pour vérifier les combinaisons gagnantes
// const winningCombinations = [
//   [0, 1, 2, 3],
//   [7, 8, 9, 10],
//   [14, 15, 16, 17],
//   [21, 22, 23, 24],
//   [28, 29, 30, 31],
//   [35, 36, 37, 38],
//   // Colonnes
//   [0, 7, 14, 21],
//   [1, 8, 15, 22],
//   [2, 9, 16, 23],
//   [3, 10, 17, 24],
//   [4, 11, 18, 25],
//   [5, 12, 19, 26],
//   [6, 13, 20, 27],
//   // Diagonales
//   [0, 8, 16, 24],
//   [3, 9, 15, 21],
//   [6, 12, 18, 24],
//   [35, 29, 23, 17]
// ];

// // Fonction pour gérer les clics sur les cellules
// function handleCellClick(event) {
//   const cell = event.target;

//   // Si la cellule est déjà occupée ou si le jeu est terminé, on ne fait rien
//   if (cell.style.backgroundColor !== "" || gameOver) return;

//   // Remplace le fond de la cellule par la couleur du joueur
//   cell.style.backgroundColor = currentPlayer;

//   // Vérifie si un joueur a gagné
//   if (checkWinner(currentPlayer)) {
//     gameOver = true;
//     messageElement.textContent = `${currentPlayer === "red" ? "Le joueur rouge" : "Le joueur jaune"} a gagné !`;
//     replayButton.style.display = "inline-block";
//   } else {
//     // Change de joueur
//     currentPlayer = currentPlayer === "red" ? "yellow" : "red";
//     messageElement.textContent = `C'est au tour du joueur ${currentPlayer === "red" ? "rouge" : "jaune"}`;
//   }
// }

// // Pour verifier des combinaisons gagnantes
// function checkWinner(player) {
//   return winningCombinations.some((combination) => {
//     return combination.every((index) => {
//       return cells[index].style.backgroundColor === player;
//     });
//   });
// }

// // Pour relancer le jeu
// replayButton.addEventListener("click", resetGame);

// // Fonction pour réinitialiser le jeu
// function resetGame() {
//   gameOver = false;
//   currentPlayer = "red";
//   cells.forEach((cell) => (cell.style.backgroundColor = ""));
//   messageElement.textContent = `C'est au tour du joueur ${currentPlayer === "red" ? "rouge" : "jaune"}`;
//   replayButton.style.display = "none";
// }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------


let currentPlayer = "red"; // Le joueur qui commence (rouge)
let gameOver = false;
let gameMode = ""; // Mode de jeu: "humanVsHuman" ou "humanVsComputer"
const cells = document.querySelectorAll(".cell");
const messageElement = document.querySelector("#message");
const replayButton = document.querySelector("#replayButton");

// Fonction pour générer un nombre aléatoire
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const humanVsHumanTab = document.querySelector("#humanVsHuman");
const humanVsComputerTab = document.querySelector("#humanVsComputer");

// Pour sélectionner le mode de jeu
humanVsHumanTab.addEventListener("click", () => selectGameMode("humanVsHuman"));
humanVsComputerTab.addEventListener("click", () => selectGameMode("humanVsComputer"));

function selectGameMode(mode) {
  document.querySelector(".tabButton.active")?.classList.remove("active");
  if (mode === "humanVsHuman") {
    humanVsHumanTab.classList.add("active");
  } else {
    humanVsComputerTab.classList.add("active");
  }
  gameMode = mode;
  resetGame();
}

// Paramètres de la grille (6 lignes et 7 colonnes)
const rows = 6;
const cols = 7;
const winningCombinations = [];

// Fonction pour ajouter une combinaison gagnante
const addWinningCombination = (startRow, startCol, rowIncrement, colIncrement) => {
  let combination = [];
  for (let i = 0; i < 4; i++) {
    combination.push((startRow + i * rowIncrement) * cols + (startCol + i * colIncrement));
  }
  winningCombinations.push(combination);
};

// Lignes horizontales (gauche à droite)
for (let row = 0; row < rows; row++) {
  for (let col = 0; col <= cols - 4; col++) {
    addWinningCombination(row, col, 0, 1);
  }
}

// Colonnes verticales (haut en bas)
for (let col = 0; col < cols; col++) {
  for (let row = 0; row <= rows - 4; row++) {
    addWinningCombination(row, col, 1, 0);
  }
}

// Diagonales descendantes (gauche en bas, droite en haut)
for (let row = 0; row <= rows - 4; row++) {
  for (let col = 0; col <= cols - 4; col++) {
    addWinningCombination(row, col, 1, 1);
  }
}

// Diagonales montantes (gauche en haut, droite en bas)
for (let row = 3; row < rows; row++) {
  for (let col = 0; col <= cols - 4; col++) {
    addWinningCombination(row, col, -1, 1);
  }
}

// Fonction pour gérer les clics sur les cellules
function handleCellClick(event) {
  const cell = event.target;
  const columnIndex = Array.from(cell.parentElement.children).indexOf(cell);  // Trouver l'index de la colonne

  // Si le jeu est déjà terminé, on ne fait rien
  if (gameOver) return;

  // Pour trouver la première cellule vide de la colonne
  const columnCells = getColumnCells(columnIndex);
  let emptyCell = null;

  // Pour chercher la première cellule vide de bas en haut
  for (let row = rows - 1; row >= 0; row--) {
    const currentCell = columnCells[row];
    if (currentCell.style.backgroundColor === "") {
      emptyCell = currentCell;
      break; // Sortir dès qu'on trouve une cellule vide
    }
  }

  if (!emptyCell) return; // Si la colonne est pleine, on ne fait rien

  // Pour remplir la cellule vide avec la couleur du joueur
  emptyCell.style.backgroundColor = currentPlayer;

  // Vérifie si un joueur a gagné
  if (checkWinner(currentPlayer)) {
    gameOver = true;
    messageElement.textContent = `${currentPlayer === "red" ? "Le joueur rouge" : "Le joueur jaune"} a gagné !`;
    replayButton.style.display = "inline-block";
  } else {
    // Change de joueur
    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
    messageElement.textContent = `C'est au tour du joueur ${currentPlayer === "red" ? "rouge" : "jaune"}`;

    // Si c'est le mode "humanVsComputer", faire jouer l'ordinateur après un délai
    if (gameMode === "humanVsComputer" && currentPlayer === "yellow" && !gameOver) {
      setTimeout(computerMove, 500); // L'ordinateur joue après un délai
    }
  }
}

// Fonction pour obtenir les cellules d'une colonne donnée
function getColumnCells(colIndex) {
  const columnCells = [];
  for (let row = 0; row < rows; row++) {
    const index = row * cols + colIndex;
    columnCells.push(cells[index]);
  }
  return columnCells;
}

// Fonction pour vérifier les combinaisons gagnantes
function checkWinner(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].style.backgroundColor === player;
    });
  });
}

// Fonction pour gérer le coup de l'ordinateur
function computerMove() {
  if (gameOver) return; // Si le jeu est déjà terminé, l'ordinateur ne joue pas

  // Trouve la première cellule vide dans une colonne choisie aléatoirement
  const availableColumns = [];
  for (let col = 0; col < cols; col++) {
    const columnCells = getColumnCells(col);
    let emptyCellFound = false;
    for (let row = rows - 1; row >= 0; row--) {
      if (columnCells[row].style.backgroundColor === "") {
        emptyCellFound = true;
        break;
      }
    }
    if (emptyCellFound) {
      availableColumns.push(col);
    }
  }

  if (availableColumns.length === 0) {
    // Si toutes les cellules sont occupées, terminer le jeu
    messageElement.textContent = "Match nul!";
    replayButton.style.display = "inline-block";
    return;
  }

  // Choisis une colonne au hasard parmi les colonnes disponibles
  const randomCol = availableColumns[randomize(0, availableColumns.length - 1)];
  const columnCells = getColumnCells(randomCol);
  let emptyCell = null;

  // Cherche la première cellule vide de bas en haut
  for (let row = rows - 1; row >= 0; row--) {
    if (columnCells[row].style.backgroundColor === "") {
      emptyCell = columnCells[row];
      break;
    }
  }

  // L'ordinateur joue avec le jaune
  emptyCell.style.backgroundColor = "yellow";

  // Vérifie si l'ordinateur a gagné
  if (checkWinner("yellow")) {
    gameOver = true;
    messageElement.textContent = "L'ordinateur (jaune) a gagné !";
    replayButton.style.display = "inline-block";
  } else {
    // Change de joueur
    currentPlayer = "red";
    messageElement.textContent = `C'est au tour du joueur rouge`;
  }
}

// Pour relancer le jeu
replayButton.addEventListener("click", resetGame);

// Fonction pour réinitialiser le jeu
function resetGame() {
  gameOver = false;
  currentPlayer = "red";
  cells.forEach((cell) => (cell.style.backgroundColor = ""));
  messageElement.textContent = `C'est au tour du joueur ${currentPlayer === "red" ? "rouge" : "jaune"}`;
  replayButton.style.display = "none";
}

// Pour attacher l'événement `click` aux cellules du jeu
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
