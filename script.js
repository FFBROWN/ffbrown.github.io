const questions = [
    
  
{
        question: "Which subatomic particle has a positive charge?",
        answers:[
        {text: "Proton", correct:true},
        {text: "Electron", correct:false},
        {text: "Neutron", correct:false},
        {text: "Quark", correct:false},
        ]

    },
    {
        question: "What is found in the nucleus of an atom?",
        answers:[
        {text: "Electrons", correct:false},
        {text: "Neutron", correct:false},
        {text: "Protons", correct:false},
        {text: "Both B and C", correct:true},
        ]

    },
    {
        question: "Which element has the atomic number 6?",
        answers:[
        {text: "Oxygen", correct:false},
        {text: "Hydrogen", correct:false},
        {text: "Carbon", correct:true},
        {text: "Helium", correct:false},
        ]

    },
    {
        question: "What is the charge of an electron?",
        answers:[
        {text: "Postive", correct:false},
        {text: "Negative", correct:true},
        {text: "neutral", correct:false},
        {text: "Variable", correct:false},
        ]

    },
   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = none;
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
}
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz;
    }
});
startQuiz();

  
