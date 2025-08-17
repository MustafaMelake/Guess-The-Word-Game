// Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} game Created By Mustafa.`

// Game settings

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfhints = 2;

// Manage Words
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Hints

document.querySelector(".hint span").innerHTML = numberOfhints;
let getHintBtn = document.querySelector(".hint");
getHintBtn.addEventListener("click", getHint)

function generateInp() {
  const InpContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++){
    let tryDiv = document.createElement("Div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`
    if (i !== 1) tryDiv.classList.add("disabled");

    // Create inp
    for (let j = 1; j <= numberOfLetters; j++){
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`
      input.setAttribute("maxlength", "1")
      tryDiv.appendChild(input)
    }

    InpContainer.appendChild(tryDiv);
  }
  InpContainer.children[0].children[1].focus();

  // Disable

  const inpInDisabledDiv = document.querySelectorAll(".disabled input");
  inpInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input,index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase()
      const nextInp = inputs[index + 1]
      if (nextInp) nextInp.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInp = currentIndex + 1;
        if (nextInp < inputs.length) inputs[nextInp].focus();
      }
            if (event.key === "ArrowLeft") {
        const prevInp = currentIndex - 1;
              if (prevInp >= 0) inputs[prevInp].focus();
      }
    });
  });

  const guessBtn = document.querySelector(".check");
  guessBtn.addEventListener("click", handleGuesses);

  function handleGuesses() {
    console.log(wordToGuess);
    let successGuess = true;
    for (let i = 1; i <= numberOfLetters; i++) {
      const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
      if (inputField.value.trim() === "") {
        alert("Please fill all boxes before checking!");
        return;
      }
    }
    for (let i = 1; i <= numberOfLetters; i++) {
      const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
      const letter = inputField.value.toLowerCase();
      const actualletter = wordToGuess[i - 1];

      inputField.classList.remove("in-place", "not-in-place", "no")

      if (letter === actualletter) {
        inputField.classList.add("in-place");
      } else if (wordToGuess.includes(letter) && letter !== "") {
        inputField.classList.add("not-in-place");
        successGuess = false;
      } else {
        inputField.classList.add("no");
        successGuess = false;
      }
    }
    
    if (successGuess) {
      messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

      // Add Disabled Class On All Try Divs
      let allTries = document.querySelectorAll(".inputs > div");
      allTries.forEach((tryDiv) => tryDiv.classList.add("disabled"));

      // Disable Guess Button
      guessBtn.disabled = true;
      document.querySelector(".hint").disabled = true;
    } else {
      document.querySelector(`.try-${currentTry}`).classList.add("disabled");
      const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
      currentTryInputs.forEach((input) => (input.disabled = true));
      currentTry++;
      
      const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
      nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
      if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
      el.children[1].focus();
      }  else {
      guessBtn.disabled = true;
      document.querySelector(".hint").disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
    }
  }
}

function getHint() {
  if (numberOfhints > 0) {
    numberOfhints--;
    document.querySelector(".hint span").innerHTML = numberOfhints;
  }
  if (numberOfhints === 0) {
    document.querySelector(".hint").classList.add("disabled")
  }

  const enabledInp = document.querySelectorAll("input:not([disabled])")
  console.log(enabledInp)
  
  const emptyInp = Array.from(enabledInp).filter((inp) => (inp.value === ""))

  if (emptyInp.length > 0) {
    const randomindex = Math.floor(Math.random() * emptyInp.length);
    const randomInp = emptyInp[randomindex];
    const indexToFill = Array.from(enabledInp).indexOf(randomInp);
    if (indexToFill !== -1 ) {
      randomInp.value = wordToGuess[indexToFill].toUpperCase(); 
    }
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    // console.log(currentIndex);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackspace)

window.onload = function (){
  generateInp();
}