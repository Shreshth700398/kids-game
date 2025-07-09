const gameArea = document.getElementById("game-area");

function shuffleArray(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function pickRandom(arr, n) {
  const copy = [...arr];
  const res = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    res.push(copy.splice(idx, 1)[0]);
  }
  return res;
}

function showFeedbackImage(isCorrect) {
  const feedbackDiv = document.getElementById("feedback");
  const feedbackImg = document.getElementById("feedbackImg");

  if (isCorrect) {
    feedbackImg.src = "https://img.freepik.com/premium-vector/cute-panda-holding-correct-sign-checklist-sign-animal-cartoon-mascot-vector-illustration_357749-1525.jpg";
  } else {
    feedbackImg.src = "https://data.textstudio.com/output/sample/animated/6/1/9/5/wrong-3-5916.gif";
  }

  feedbackDiv.style.display = "block";
  setTimeout(() => {
    feedbackDiv.style.display = "none";
  }, 1500);
}

window.startColorGame = function () {
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  const answer = colors[Math.floor(Math.random() * colors.length)];
  localStorage.setItem("lastColor", answer);

  gameArea.innerHTML = `
    <h2>🎨 Guess the Color</h2>
    <div style="width:100px;height:100px;margin:15px auto;border:2px solid #333;background:${answer};"></div>
    <div>
      ${colors.map(color => `<button onclick="checkColor('${color}', '${answer}')">${color}</button>`).join('')}
    </div>
  `;
};

window.checkColor = function (guess, answer) {
  showFeedbackImage(guess === answer);
};

window.startAlphabetGame = function () {
  const letters = Array.from(Array(26)).map((_, i) => String.fromCharCode(65 + i));
  const answer = letters[Math.floor(Math.random() * letters.length)];
  localStorage.setItem("lastLetter", answer);

  const options = shuffleArray([answer, ...pickRandom(letters.filter(l => l !== answer), 3)]);

  gameArea.innerHTML = `
    <h2>🔤 Alphabet Game</h2>
    <p>Which letter is this?</p>
    <h1 style="font-size:6rem;">${answer}</h1>
    <div>
      ${options.map(l => `<button onclick="checkAlphabet('${l}', '${answer}')">${l}</button>`).join('')}
    </div>
  `;
};

window.checkAlphabet = function (guess, answer) {
  showFeedbackImage(guess === answer);
};

window.startNumberGame = function () {
  const numbers = [...Array(10).keys()];
  const answer = numbers[Math.floor(Math.random() * numbers.length)];
  localStorage.setItem("lastNumber", answer);

  const options = shuffleArray([answer, ...pickRandom(numbers.filter(n => n !== answer), 3)]);

  gameArea.innerHTML = `
    <h2>🔢 Number Game</h2>
    <p>Which number is this?</p>
    <h1 style="font-size:6rem;">${answer}</h1>
    <div>
      ${options.map(n => `<button onclick="checkNumber('${n}', '${answer}')">${n}</button>`).join('')}
    </div>
  `;
};

window.checkNumber = function (guess, answer) {
  showFeedbackImage(guess == answer);
};

window.startAnimalGame = function () {
  const animals = [
    {
      name: "Cat",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/400px-Cat03.jpg"
    },
    {
      name: "Dog",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Dog_labrador.jpg/400px-Dog_labrador.jpg"
    },
    {
      name: "Elephant",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/400px-African_Bush_Elephant.jpg"
    },
    {
      name: "Lion",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/400px-Lion_waiting_in_Namibia.jpg"
    }
  ];

  const correct = animals[Math.floor(Math.random() * animals.length)];
  const choices = shuffleArray([correct, ...pickRandom(animals.filter(a => a.name !== correct.name), 3)]);

  gameArea.innerHTML = `
    <h2>🐶 Guess the Animal</h2>
    <img src="${correct.img}" alt="Animal" class="animal-img" style="max-height:200px;"><br>
    <div>
      ${choices.map(animal => `<button onclick="checkAnimal('${animal.name}', '${correct.name}')">${animal.name}</button>`).join('')}
    </div>
  `;
};

window.checkAnimal = function (guess, correct) {
  showFeedbackImage(guess === correct);
};

window.showParentCorner = function () {
  const pass = prompt("🔒 Enter Parent Password:");
  if (pass === "1234") {
    document.getElementById("parent-audio").style.display = "block";

    gameArea.innerHTML = `
      <h2>👨‍👩‍👧 Parent Corner</h2>
      <p><strong>Last Color:</strong> ${localStorage.getItem("lastColor") || "None"}</p>
      <p><strong>Last Alphabet:</strong> ${localStorage.getItem("lastLetter") || "None"}</p>
      <p><strong>Last Number:</strong> ${localStorage.getItem("lastNumber") || "None"}</p>
      <p>You can play the audio question below 👇</p>
    `;
  } else {
    alert("❌ Wrong password.");
  }
};
