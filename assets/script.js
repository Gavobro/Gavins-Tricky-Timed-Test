// My code here.
// Asking questions, giving choices, and assigning answers for the Code Quiz.
const questions = [
    {
        question: "Commonly used data types DO NOT include:" ,
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"] ,
        answer: "3. alerts"
    } ,
    
    {
        question: "The condition in an if / else statement is enclosed with _____." ,
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"] ,
        answer: "3. parenthesis"
    } ,

    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"] ,
        answer: "2. other arrays"
    } ,

    {
        question: "String values must be enclosed within _____ when being assigned to variables." ,
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"] ,
        answer: "3. quotes"
    } ,

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:" ,
        choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log"] ,
        answer: "4. console.log"
    } ,
   
] ;

// Assigning all variables to IDs from the index.html.
// Assigning time and timer related variables.
var time = document.getElementById ("time") ;
var timeLeft = document.getElementById ("timeLeft") ;
var timesUp = document.getElementById ("timesUp") ;

// Assigning variables that relate to the questions in the quiz. This icludes the multiple choice buttons, the question itself, and "Right or Wrong" variables.
var questionDiv = document.getElementById ("questionDiv") ;
var questionTitle = document.getElementById ("questionTitle") ;
var choice1 = document.getElementById ("button1") ;
var choice2 = document.getElementById ("button2") ;
var choice3 = document.getElementById ("button3") ;
var choice4 = document.getElementById ("button4");
var answerCheck = document.getElementById ("answerCheck") ;

// Assigning variables that have to do with submitting, viewing, and keeping score.
var scoreSection = document.getElementById ("scoreSection") ;
var finalScore = document.getElementById ("finalScore") ;
var viewPastScores = document.getElementById ("viewPastScores") ;
var previousScores = document.getElementById ("previousScores") ;
var submitButton = document.getElementById ("submitButton") ;

// Assigning miscellaneous variables that relate to buttons and layout.
var summary = document.getElementById ("summary") ;
var initialInput = document.getElementById ("initialInput") ;
var everything = document.getElementById ("everything") ;
var homeButton = document.getElementById ("homeButton") ;
var startDiv = document.getElementById ("start") ;
var startButton = document.getElementById ("startButton") ;

// Assigning other variables.
var correctAns = 0 ;
var questionNum = 0 ;
var scoreResult ;
var questionIndex = 0 ;

// Creating a function that sets the total time given for the quiz.
var totalTime = 75 ;
function newQuiz () {
    questionIndex = 0 ;
    totalTime = 75 ;
    timeLeft.textContent = totalTime ;
    initialInput.textContent = "" ;

// Determines which elements are visible on the page. (Will be seen later multiple times)
    startDiv.style.display = "none" ;
    questionDiv.style.display = "block" ;
    time.style.display = "block" ;
    timesUp.style.display = "none" ;

// When the time is less or equal to zero, than the game ends.
    var startTime = setInterval (function () {
        totalTime-- ;
        timeLeft.textContent = totalTime ;

            if (totalTime <= 0) {
                    clearInterval (startTime) ;

            if (questionIndex < questions.length - 1) {
                    gameOver();
            } }

    } , 1000) ;

    showQuiz () ;
} ;

function showQuiz () {
    nextQuestion () ;
}

function nextQuestion () {
    questionTitle.textContent = questions[questionIndex].question;
    choice1.textContent = questions[questionIndex].choices[0] ;
    choice2.textContent = questions[questionIndex].choices[1] ;
    choice3.textContent = questions[questionIndex].choices[2] ;
    choice4.textContent = questions[questionIndex].choices[3] ;
}

// Checks wheather or not the user chose the right answer...
function choose1 () { 
    checkAnswer (0) ; 
} 

function choose2 () { 
    checkAnswer (1) ; 
}

function choose3 () { 
    checkAnswer (2) ; 
} 

function choose4 () { 
    checkAnswer (3) ; 
}

function checkAnswer (answer) {

    var lineBreak = document.getElementById ("lineBreak") ;
    lineBreak.style.display = "block" ;
    answerCheck.style.display = "block" ;

// ...When the chosen answer is right, 1 point is added to the users current score, and text is displayed.
        if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {

            correctAns++ ;
            answerCheck.textContent = "Correct!" ;

// ...When the chosen answer is wrong, the user loses 10 seconds from their total time, and text is displayed. No points are given.
        } 
        
        else {
            totalTime -= 10 ;
            timeLeft.textContent = totalTime ;
            answerCheck.textContent = "Wrong!"
        }

// When there are no more questions for the user to answer, than the game ends.
    questionIndex++;

        if (questionIndex < questions.length) {
            nextQuestion () ;
        }   
        
        else {
        gameOver () ;
    }
}

function gameOver () {

// Determines which elements are visible on the page.
    summary.style.display = "block" ;
    questionDiv.style.display = "none" ;
    startDiv.style.display = "none" ;
    time.style.display = "none" ;
    timesUp.style.display = "block" ;

// Final score is determined by the number of correct answers chosen by the user.
    finalScore.textContent = correctAns ;
}

function storeScores (event) {
    event.preventDefault () ;

// Creates a propt asking for the user to enter their initials.
        if (initialInput.value === "") {
            alert ("Please enter your initials!") ;
            return;
        } 

// Determines which elements are visible on the page.
    startDiv.style.display = "none" ;
    time.style.display = "none" ;
    timesUp.style.display = "none" ;
    summary.style.display = "none" ;
    scoreSection.style.display = "block" ;   

// Saves submitted scores into the pages local storage.
    var savedScores = localStorage.getItem ("previous scores") ;
    var scoresArray ;

        if (savedScores === null) {
            scoresArray = [] ;
        } 
        
        else {
        scoresArray = JSON.parse(savedScores)
        }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log (userScore) ;
    scoresArray.push (userScore) ;

    var scoresArrayString = JSON.stringify (scoresArray) ;
    window.localStorage.setItem ("previous scores", scoresArrayString) ;
    
    showPreviousScores () ;
}

var i = 0 ;
function showPreviousScores () {

// Determines which elements are visible on the page.
    startDiv.style.display = "none" ;
    time.style.display = "none" ;
    questionDiv.style.display = "none" ;
    timesUp.style.display = "none" ;
    summary.style.display = "none" ;
    scoreSection.style.display = "block" ;

    var savedScores = localStorage.getItem ("previous scores") ;

        if (savedScores === null) {
            return;
        }
    console.log (savedScores) ;

    var storedScores = JSON.parse (savedScores) ;

        for (; i < storedScores.length; i++) {
            var eachNewScore = document.createElement ("p") ;
            eachNewScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score ;
            previousScores.appendChild (eachNewScore) ;
        }
}

startButton.addEventListener ("click", newQuiz) ;
choice1.addEventListener ("click", choose1) ;
choice2.addEventListener ("click", choose2) ;
choice3.addEventListener ("click", choose3) ;
choice4.addEventListener ("click", choose4) ;

// When the submit button is clicked, the score is stored in the console.
submitButton.addEventListener ("click", function (event) { 
    storeScores (event) ;
} ) ;

// when the "viewPastScores" button is clicked, the previous scores are shown.
viewPastScores.addEventListener ("click", function (event) { 
    showPreviousScores (event) ;
} ) ;

// When the "home" button is clicked, return home.
homeButton.addEventListener ("click", function () {
    startDiv.style.display = "block" ;
    scoreSection.style.display = "none" ;
} ) ;