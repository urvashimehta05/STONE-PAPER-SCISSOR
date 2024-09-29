let btn_el = document.querySelector("#btn_el");
let detail = document.querySelector(".details");
let computerScoreElem = document.querySelector("#computer_score");
let userScoreElem = document.querySelector('#user_score');
const countdownElem = document.querySelector('#countdown');
let h1 = document.querySelector("h1");
let computerScore = 0;
let userScore = 0;
let roundCount = 0;  // Added round counter
const maxRounds = 10; // Set the limit to 10 rounds
let started = false;
let countdown = 10;
let timeout;
const weapons = ['rock', 'paper', 'scissors'];

btn_el.addEventListener("click", function () {
    if (!started) {
        console.log("Game is Started");
        started = true;
        h1.innerText = "Choose your weapon!";
        startTimer();
    }
});

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is Started");
        started = true;
        h1.innerText = "Choose your weapon!";
        startTimer();
    }
});

function computerPlay() {
    const weaponIndex = Math.floor(Math.random() * weapons.length);
    return weapons[weaponIndex];
}

function startTimer() {
    if (roundCount < maxRounds) { // Ensure rounds are below the limit
        countdown--;
        countdownElem.innerHTML = countdown;
        if (countdown === 0) {
            const computerWeapon = computerPlay();
            updateScore(null, computerWeapon);
        } else {
            timeout = setTimeout(startTimer, 1000);
        }
    } else {
        endGame(); // End game after max rounds
    }
}

function updateScore(playerWeapon, computerWeapon) {
    clearTimeout(timeout);
    
    if (roundCount >= maxRounds) {  // If the round limit is reached, stop the game
        return;
    }

    // Display the computer's choice
    detail.querySelector('#comp_choice').innerHTML = `Computer chose: ${computerWeapon}.`;

    if (playerWeapon) {
        // Update scores based on the player's and computer's weapon choice
        if (playerWeapon === computerWeapon) {
            detail.querySelector('#result').innerHTML = "It's a tie!";
        } else if (
            (playerWeapon === 'rock' && computerWeapon === 'scissors') ||
            (playerWeapon === 'paper' && computerWeapon === 'rock') ||
            (playerWeapon === 'scissors' && computerWeapon === 'paper')
        ) {
            detail.querySelector('#result').innerHTML = 'You win!';
            userScore++;
            userScoreElem.innerHTML = `Player: ${userScore}`;
        } else {
            detail.querySelector('#result').innerHTML = 'Computer wins!';
            computerScore++;
            computerScoreElem.innerHTML = `Computer: ${computerScore}`;
        }

        roundCount++; // Increment round count
        if (roundCount < maxRounds) {
            startTimer();  // Continue to the next round if max rounds not reached
        } else {
            endGame();  // End game after the 10th round
        }

    } else {
        detail.querySelector('#comp_choice').innerHTML = `Game Over`;
        detail.querySelector('#result').innerHTML = 'You did not make a choice! | You lose the game!';
        detail.querySelector('#result').style.color = 'red';
        disableOptions();
    }

    if (userScore === 5) {
        detail.querySelector('#result').textContent = 'You win the game!';
        detail.querySelector('#result').style.color = 'green';
        stopTimer();
    }

    if (computerScore === 5) {
        detail.querySelector('#result').textContent = 'You lose the game!';
        detail.querySelector('#result').style.color = 'red';
        stopTimer();
    }
}

function stopTimer() {
    clearTimeout(timeout);
    countdown = 10;
    countdownElem.textContent = countdown;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundCount = 0;  // Reset round count
    countdown = 10;
    userScoreElem.innerHTML = 'Player: 0';
    computerScoreElem.innerHTML = 'Computer: 0';
    detail.querySelector('#result').innerHTML = 'Choose your weapon!';
    countdownElem.innerHTML = '10';
    detail.querySelector('#result').style.color = '#660033';
    detail.querySelector('#comp_choice').innerHTML = '';
    h1.innerText = "Press any button to start the game";
    disableOptions(false); // Re-enable options
    started = false;  // Reset game started flag
}

function selectWeapon() {
    clearTimeout(timeout);
    countdownElem.innerHTML = '10';
    countdown = 10;
    const playerWeapon = this.id;
    const computerWeapon = computerPlay();
    updateScore(playerWeapon, computerWeapon);
}

function endGame() {
    // Display final result based on scores
    if (userScore > computerScore) {
        detail.querySelector('#result').textContent = 'Game Over! You win the game!';
        detail.querySelector('#result').style.color = 'green';
    } else if (userScore < computerScore) {
        detail.querySelector('#result').textContent = 'Game Over! Computer wins the game!';
        detail.querySelector('#result').style.color = 'red';
    } else {
        detail.querySelector('#result').textContent = 'Game Over! It\'s a tie!';
        detail.querySelector('#result').style.color = 'orange';
    }
    // Disable weapon buttons
    disableOptions(true);

    // Prompt restart of the game
    h1.innerText = "Press any key to restart the game";
    document.addEventListener("keypress", function restartListener() {
        document.removeEventListener("keypress", restartListener);
        resetGame();
    });
}

function disableOptions(disable = true) {
    let allBtns = document.querySelectorAll(".weapons button");
    for (let btn of allBtns) {
        btn.disabled = disable;
    }
}

let allBtns = document.querySelectorAll(".weapons button");
for (let btn of allBtns) {
    btn.addEventListener("click", selectWeapon);
}
