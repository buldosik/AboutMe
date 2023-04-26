window.onload = function () {

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let categories;                         // Array of topics
    let word;                               // Selected word
    let guess;                              // Geuss
    let guesses = [];                       // Stored guesses
    let clickedLetters = Array(alphabet.length)
    let lives;                              // Lives
    let numberOfCorrectGuesses;             // Count correct guesses
    let numberOfSpaces;                     // Number of spaces in word '-'

    // Get elements
    const showLives = document.getElementById("gameState");

    // create alphabet ul
    function buttons() {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (let i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            clickAction();
            myButtons.appendChild(letters);
            letters.appendChild(list);
            if(clickedLetters[i] === 1) {
                //console.log("Click perfomed");
                list.click()
            }
        }
        //console.log(myButtons);
        //console.log(letters);
    }

    // Create guesses ul
    function result() {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                numberOfSpaces = 1;
            } else {
                guess.innerHTML = "_";
            }

            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    function checkStateOfTheGame() {
        showLives.innerHTML = "";
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
            saveInstance()
            reveal();
            return;
        }
        for (var i = 0; i < guesses.length; i++) {
            if (numberOfCorrectGuesses + numberOfSpaces === guesses.length) {
                showLives.innerHTML = "You Win!";
            }
        }
        saveInstance()
    }

    function reveal() {
        for(let j = 0; j < alphabet.length; j++)
            for (let i = 0; i < word.length; i++)
                if (word[i] === alphabet[j])
                    guesses[i].innerHTML = alphabet[j];
    }

    // Hangman
    function canvas() {
        myStickman = document.getElementById("stickman");
        myStickman.width = 250;
        myStickman.height = 250;
        context = myStickman.getContext('2d');
        context.strokeWidth = 3
        context.lineWidth = 4;
        context.strokeStyle = "#fff";
        context.beginPath();
    }

    let draw = function ($FromX, $FromY, $ToX, $ToY) {
        context.moveTo($FromX, $FromY);
        context.lineTo($ToX, $ToY);
        context.stroke();
    }

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(myStickman.width / 3 * 2, 55, 15, 0, Math.PI * 2, true);
        context.stroke();
    }
    frame1 = function () {
        draw(0, myStickman.height, myStickman.width, myStickman.height);
    }
    frame2 = function() {
        draw (myStickman.width / 5, 0, myStickman.width / 5, myStickman.height);
    }
    frame3 = function() {
        draw (0, 0, myStickman.width / 3 * 2, 0);
    }
    frame4 = function() {
        draw (myStickman.width / 3 * 2, 0, myStickman.width / 3 * 2, 40);
    }
    torso = function() {
        draw (myStickman.width / 3 * 2, 70, myStickman.width / 3 * 2, 140);
    }
    rightArm = function() {
        draw (myStickman.width / 3 * 2, 90, myStickman.width / 3 * 2 + 40, 120);
    }
    leftArm = function() {
        draw (myStickman.width / 3 * 2, 90, myStickman.width / 3 * 2 - 40, 120);
    }
    rightLeg = function() {
        draw (myStickman.width / 3 * 2, 140, myStickman.width / 3 * 2 + 30, 200);
    }
    leftLeg = function() {
        draw (myStickman.width / 3 * 2, 140, myStickman.width / 3 * 2 - 30, 200);
    }

    let drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    // OnClick Function
    function clickAction() {
        list.onclick = function () {
            const guess = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            clickedLetters[this.innerHTML.charCodeAt(0) - "a".charCodeAt(0)] = 1;
            //console.log(this.innerHTML.charCodeAt(0) - "a".charCodeAt(0));
            //console.log(clickedLetters);
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    guesses[i].innerHTML = guess;
                    numberOfCorrectGuesses += 1;
                }
            }
            const j = (word.indexOf(guess));
            if (j === -1) {
                lives--;
                if(lives >= 0)
                    drawArray[lives]();
            }
            checkStateOfTheGame();
        }
    }

    // Play
    function play() {
        categories =  [
            "university", "shopping", "mixture", "election", "village",
            "enthusiasm", "customer", "computer", "trainer", "solution",
            "psychology", "department", "medicine", "county", "knowledge",
            "resource", "alcohol", "candidate", "health", "recognition",
            "reality", "memory", "confusion", "editor", "fishing",
            "performance", "worker", "operation", "situation", "contract",

        ];

        word = categories[Math.floor(Math.random() * categories.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        clickedLetters = Array(alphabet.length)
        buttons();
        guesses = [];
        lives = 10;
        numberOfCorrectGuesses = 0;
        numberOfSpaces = 0;
        result();
        checkStateOfTheGame();
        canvas();
        saveInstance();
    }

    // Reset
    document.getElementById('reset').onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        context.clearRect(0, 0, 400, 400);
        play();
    }

    // Save Instance
    function saveInstance() {
        const gameState = {
            word: word,
            lives: lives,
            clickedLetters: clickedLetters
        }
        //console.log(gameState.clickedLetters);
        const stateString = JSON.stringify(gameState);
        localStorage.setItem("gameState", stateString);
    }
    function loadInstance() {
        const stateString = localStorage.getItem("gameState");
        const gameState = JSON.parse(stateString);
        if(gameState === null) {
            play();
            return;
        }
        console.log("data loaded");
        word = gameState.word;
        console.log(word);
        clickedLetters = gameState.clickedLetters;
        //console.log(gameState.clickedLetters);
        guesses = [];
        lives = 10;
        numberOfCorrectGuesses = 0;
        numberOfSpaces = 0;
        result();
        checkStateOfTheGame();
        canvas();
        buttons();
    }

    loadInstance();
}


