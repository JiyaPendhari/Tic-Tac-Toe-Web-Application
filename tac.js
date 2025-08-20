let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let message = document.getElementById("message");

let turnO = true;  // O starts
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver || box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;

    checkWinner();
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      gameOver = true;

      // Highlight the winning boxes (keep their single letter)
      pattern.forEach(index => {
        boxes[index].classList.add("win");
      });

      message.textContent = `${pos1Val} wins! 🎉`;
      return;
    }
  }

  // Check for draw
  if ([...boxes].every(box => box.innerText !== "")) {
    gameOver = true;
    message.textContent = "It's a draw!";
  }
}

resetBtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("win");
  });
  turnO = true;
  gameOver = false;
  message.textContent = "";
});


