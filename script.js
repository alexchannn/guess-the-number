const input = document.getElementById("input");
const message = document.getElementById("message");
const totalGuesses = document.getElementById("totalGuesses");
const guessButton = document.getElementById("guessButton");
const timerElement = document.getElementById("timer");
const bestTimeElement = document.getElementById("bestTime");

let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessTotal = 0;
let startTime = 0;
let timer;
let bestTime = localStorage.getItem("bestTime") || "N/A";

if (bestTime !== "N/A") {
   bestTimeElement.textContent = bestTime;
}

function startTimer() {
   startTime = Date.now();
   timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
   const elapsed = Math.floor((Date.now() - startTime) / 1000);
   timerElement.textContent = elapsed;
}

function stopTimer() {
   clearInterval(timer);
}

input.addEventListener("keydown", function (event) {
   if (event.key === "Enter") {
      checkInput();
      input.value = "";
   }
});

guessButton.addEventListener("click", function () {
   checkInput();
   input.value = "";
});

function checkInput() {
   if (guessTotal === 0) {
      startTimer();
   }

   guessTotal++;
   let userInput = input.value.trim();

   if (isNaN(userInput) || userInput === "") {
      message.textContent = "You can only input a number!";
      message.style.color = "#ff3b3b";
   } else {
      userInput = parseInt(userInput);

      if (userInput > 100 || userInput < 1) {
         message.textContent = "Please input a number between 1-100!";
         message.style.color = "#ff3b3b";
      } else {
         message.style.color = "black";
         if (userInput === randomNumber) {
            stopTimer();
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            message.textContent = `Correct! The number is ${randomNumber}. You guessed it in ${elapsed} seconds.`;
            message.style.color = "#6700b1";
            totalGuesses.textContent = guessTotal;

            if (bestTime === "N/A" || elapsed < parseInt(bestTime)) {
               bestTime = elapsed;
               bestTimeElement.textContent = bestTime;
               localStorage.setItem("bestTime", bestTime);
            }

            guessButton.textContent = "RESTART";
            guessButton.style.backgroundColor = "#ff3b3b";
            guessButton.onclick = resetGame;
         } else if (userInput < randomNumber) {
            message.textContent = `Wrong! The number is bigger than ${userInput}`;
         } else if (userInput > randomNumber) {
            message.textContent = `Wrong! The number is smaller than ${userInput}`;
         }
      }
   }
}

function resetGame() {
   randomNumber = Math.floor(Math.random() * 100) + 1;
   guessTotal = 0;
   input.value = "";
   message.textContent = "";
   totalGuesses.textContent = "";
   timerElement.textContent = "0";
   guessButton.textContent = "GUESS";
   guessButton.style.backgroundColor = "#6700b1";
   guessButton.onclick = checkInput;
   stopTimer();
}
