let CORRECT_NUMBER = getRandomNumber();
let USER_GUESSES = new Array();
let TIMES_GAME_PLAYED = 0;
let GUESS_RECORD = new Array();
let VERIFIED = false;


/* 
   This will be performed in the initGame function
   the best result counter will be based on the size of the array, before reseting we will
   be comparing sizes of the currenr guessed array size and previous guessed array size and after comparision we will delete 
   the array size which was more and keep it as current and delete the previous arrays
*/


window.onload = function(){
    document.getElementById("number-submit").addEventListener("click", playGame);
    document.getElementById("restart-game").addEventListener("click", initGame);
    document.getElementById("number-guess").addEventListener("keyup", function(event){if(event.key === 'Enter') playGame();});
}

// main function to play the game 
function playGame(){
    let number_guessed = document.getElementById("number-guess").value;
    saveGuessHistory(number_guessed);
    displayResult(number_guessed, CORRECT_NUMBER);
    displayHistory();

}


// function to generate random numbers
function getRandomNumber(){
    random_number = Math.floor(Math.random()*100);
    console.log(random_number);
    return random_number;
}

// function to store all the guesses in a Global array
function saveGuessHistory(guess){
    USER_GUESSES.push(guess);
    return USER_GUESSES;
}

// Retrieve the dialog based on if the guess is wrong or correct 

function getDialog(dialogType, text){
    let dialog;
    switch(dialogType){
        case "near":
            dialog = "<div class='alert alert-warning' role ='alert'><strong>"
            break;
        case "won":
            dialog = "<div class='alert alert-success' role='alert'><strong>"
            break;
        case "warning":
            dialog = "<div class='alert alert-danger' role ='alert'><strong>"
            break;
        case "info":
            dialog = "<div class='alert alert-info' role ='alert'><strong>"
            break;
    }

    dialog += text;
    dialog += "</strong></div>";
    return dialog;
}

function showYouWon(){
    const text = "Congrats You won 🎈🎇🎊🎉";
    let dialog_won = getDialog("won", text);
    document.getElementById("result").innerHTML = dialog_won;
}

function showNumberAbove_butFar(){
    const text = "Too high dude 😓😛";
    let dialog_warning_high = getDialog("warning", text);
    document.getElementById("result").innerHTML = dialog_warning_high;
}

function showNumberAbove_butNear(){
    const text = "Its high buttt very nearrrr 😮🤯 think a little low";
    let dialog_warning_high_near = getDialog("near", text);
    document.getElementById("result").innerHTML = dialog_warning_high_near;
}

function showNumberBelow_butFar(){
    const text = "Dude its too low 😨😭";
    let dialog_warning_low = getDialog("warning", text);
    document.getElementById("result").innerHTML = dialog_warning_low;
}

function showNumberBelow_butNear(){
    const text = "Its too low but very nearrr 🤐😎 think a little high";
    let dialog_warning_low_near = getDialog("near", text);
    document.getElementById("result").innerHTML = dialog_warning_low_near;
}

// using the above function we will make the diaplayResults function

function displayResult(number_guessed, correct_number){
    let difference = (number_guessed-correct_number);
  
    if(difference == 0){
      showYouWon();
      VERIFIED = verifyResults(difference)
      trackRecord();
    }
    else if(difference > 0 && difference > 10){
      showNumberAbove_butFar();
    }
    else if(difference > 0 && difference < 10){
      showNumberAbove_butNear();
    }
    else if(difference < 0 && difference < -10){
      showNumberBelow_butFar();
    }
    else if(difference < 0 && difference > -10){
      showNumberBelow_butNear();
    }
}

// function to verify the results

function verifyResults(difference){
    if(difference == 0) return true;
  }

// function to get the history of the trials of the users

function displayHistory(){
    let list = "<ul class = 'list-group'>"
    for(let i = USER_GUESSES.length-1; i>=0; i--){
        let temp_guess = "You guessed "+USER_GUESSES[i];
        list += "<li class = 'list-group-item'>"+temp_guess+"</li>";
    }
    list += "</ul>"
    document.getElementById("history").innerHTML = list;
}

// track the first game play

function trackRecord(){
    let current_record = USER_GUESSES.length;
    GUESS_RECORD.push(current_record);
    console.log(GUESS_RECORD);
}

// getting the minimum number out of the array

function findMin(){
    let min_guess;
    if(TIMES_GAME_PLAYED >= 0){
    for(let i = 1; i<GUESS_RECORD.length; i++){
        if(GUESS_RECORD[i]<GUESS_RECORD[i-1]) min_guess = GUESS_RECORD[i];
        else min_guess = GUESS_RECORD[i-1];
        }
    }
    return min_guess;
}

// function to show the best scrore info results (TODO)

function showBestResult(){
    if(VERIFIED){
        trackRecord();
        let min_record;
        console.log(GUESS_RECORD);
        if(TIMES_GAME_PLAYED > 1){
            min_record = findMin();
        }

        const text = "Your best job was in "+ min_record+ " guesses";
        let dialog_info = getDialog("info", text);
        document.getElementById("best-score").innerHTML = dialog_info;
    }
    else{
        const text = "You have not answered and skipped it.. ok make a new guess now";
        let dialog_info = getDialog("info", text);
        document.getElementById("best-score").innerHTML = dialog_info;
    }
}

// function to intialise or to restart the game

function initGame(){

    TIMES_GAME_PLAYED += 1;
    if(TIMES_GAME_PLAYED >1){
        showBestResult();
    }

    // reset the correct number
    CORRECT_NUMBER = getRandomNumber();
    console.log(CORRECT_NUMBER);
    // reset the result diaplay
    document.getElementById("result").innerHTML = "";
    // reset the result guesses array
    USER_GUESSES = [];
    // reset the guesses history display
    document.getElementById("history").innerHTML = "";
    // reset the text portion too
    document.getElementById("number-guess").value = "";
    // reset the VERIFIED
    VERIFIED = false;

}