// Selecting HTML Elements

const questionCounter = document.getElementById("questionCounter");

const questionText = document.getElementById("questionText");

const optionsWrapper = document.getElementById("optionsWrapper");

const feedbackMessage = document.getElementById("feedbackMessage");

const navigationButton = document.getElementById("navigationButton");

const resultSection = document.getElementById("resultSection");

const finalScore = document.getElementById("finalScore");

const restartButton = document.getElementById("restartButton");

const quizContentArea = document.querySelector(".quiz-content-area");


// Quiz State Variables

let currentQuestionPosition = 0;

let totalScore = 0;

let answerSelectionLocked = false;


// Function to Load Current Question

function displayCurrentQuestion() {

    // Reset State

    feedbackMessage.textContent = "";

    optionsWrapper.innerHTML = "";

    answerSelectionLocked = false;


    // Current Question Object

    const activeQuestion =
        quizQuestionsCollection[currentQuestionPosition];


    // Update Counter

    questionCounter.textContent =
        `Question ${currentQuestionPosition + 1} of ${quizQuestionsCollection.length}`;


    // Update Question Text

    questionText.textContent =
        activeQuestion.questionText;


    // Generate Options Dynamically

    activeQuestion.answerChoices.forEach(function (choiceValue) {

        const generatedButton =
            document.createElement("button");


        generatedButton.textContent = choiceValue;

        generatedButton.classList.add("option-button");


        generatedButton.addEventListener(
            "click",
            function () {

                handleOptionSelection(
                    generatedButton,
                    choiceValue,
                    activeQuestion.correctAnswer
                );

            }
        );


        optionsWrapper.appendChild(generatedButton);

    });

}


// Function to Handle Answer Selection

function handleOptionSelection(
    selectedButton,
    selectedChoice,
    correctChoice
) {

    // Prevent Multiple Clicks

    if (answerSelectionLocked === true) {

        return;

    }

    answerSelectionLocked = true;


    // Get All Buttons

    const allOptionButtons =
        document.querySelectorAll(".option-button");


    // Correct Answer

    if (selectedChoice === correctChoice) {

        selectedButton.classList.add("correct-answer");

        feedbackMessage.textContent =
            "Correct Answer ✅";

        totalScore++;

    }

    // Wrong Answer

    else {

        selectedButton.classList.add("wrong-answer");

        feedbackMessage.textContent =
            "Wrong Answer ❌";


        // Highlight Correct Answer

        allOptionButtons.forEach(function (buttonItem) {

            if (buttonItem.textContent === correctChoice) {

                buttonItem.classList.add("correct-answer");

            }

        });

    }

}


// Function to Move Next Question

function moveToUpcomingQuestion() {

    currentQuestionPosition++;


    // Check Quiz Completion

    if (
        currentQuestionPosition <
        quizQuestionsCollection.length
    ) {

        displayCurrentQuestion();

    }

    else {

        displayFinalResult();

    }

}


// Function to Display Final Result

function displayFinalResult() {

    quizContentArea.classList.add("hidden-section");

    resultSection.classList.remove("hidden-section");


    finalScore.textContent =
        `Your Score : ${totalScore} / ${quizQuestionsCollection.length}`;

}


// Function to Restart Quiz

function restartEntireQuiz() {

    currentQuestionPosition = 0;

    totalScore = 0;

    answerSelectionLocked = false;


    resultSection.classList.add("hidden-section");

    quizContentArea.classList.remove("hidden-section");


    displayCurrentQuestion();

}


// Next Button Event

navigationButton.addEventListener(
    "click",
    moveToUpcomingQuestion
);


// Restart Button Event

restartButton.addEventListener(
    "click",
    restartEntireQuiz
);


// Initial Question Load

displayCurrentQuestion();