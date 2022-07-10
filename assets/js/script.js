let secondsLeft = 60;
let emptyArray = [];
let buttonsDiv = document.getElementById("buttons")
let timer = document.getElementById("timer");
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);
var questionDiv = document.getElementById("question-div");
var choice = document.getElementById("choices");
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));
let viewScoresBtn = document.getElementById("view-scores")
let scoresDiv = document.getElementById("scores-div");
var quizCount = 0;
let score = 0;


function setTime() {
    displayQuestions();
    let timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "";
      timer.textContent = "Time: " + secondsLeft;
      if (secondsLeft <= 0 || quizCount === quiz.length) {
        clearInterval(timerInterval);
        captureUserScore();
      } 
    }, 1000);
  }

  function displayQuestions() {
    removeEls(startButton);
  
    if (quizCount < quiz.length) {
      questionDiv.innerHTML = quiz[quizCount].title;
      choice.textContent = "";  
      for (let i = 0; i < quiz[quizCount].multiChoice.length; i++) {
        let el = document.createElement("button");
        el.innerText = quiz[quizCount].multiChoice[i];
        el.setAttribute("data-id", i);
        el.addEventListener("click", function (event) {
          event.stopPropagation();
            if (el.innerText === quiz[quizCount].answer) {
            score += secondsLeft;
          } else {
            score -= 75;
            secondsLeft = secondsLeft - 15;
          }
            questionDiv.innerHTML = "";
            if (quizCount === quiz.length) {
            return;
          } else {
            quizCount++;
            displayQuestions();
          }
        });
        choice.append(el);
      }
    }
  }
  // capture user score and store in local storage
  function captureUserScore() {
    timer.remove();
    choice.textContent = "";
    let initialsInput = document.createElement("input");
    let postScoreBtn = document.createElement("input");
    results.innerHTML = `Your score is ${score} Enter initials: `;
    initialsInput.setAttribute("type", "text");
    postScoreBtn.setAttribute("type", "button");
    postScoreBtn.setAttribute("value", "Post Score!");
    postScoreBtn.addEventListener("click", function (event) {
      event.preventDefault();
      let scoresArray = defineScoresArray(storedArray, emptyArray);
      let initials = initialsInput.value;
      let userAndScore = {
        initials: initials,
        score: score,
      };  
      scoresArray.push(userAndScore);
      saveScores(scoresArray);
      goBackBtn();
      // need to add in a way to clear the scores array
      // need to add in a way to display all scores
      viewScoresBtn.remove();
    });
    results.append(initialsInput);
    results.append(postScoreBtn);
  }



  const defineScoresArray = (arr1, arr2) => {
    if(arr1 !== null) {
      return arr1
    } else {
      return arr2
    }
  }

  const removeEls = (...els) => {
    for (let el of els) el.remove();
  }

  var quiz = [
    {
      title: "What language specifies the style of elements on a webpage?",
      multiChoice: ["HTML", "Javascript", "Cascading Style Sheets", "Typescript"],
      answer: "Cascading Style Sheets"
    },
  
    {
      title: "Which tag element is not visible from a browser view",
      multiChoice: ["List Items", "Title", "Paragraph", "Style"],
      answer: "Style"
    },
  
    {
      title: "How can you make a numbered List",
      multiChoice: [ "<li>", "<ol>", "<ul>", "<dl>"],
      answer: "<ol>"
    },
  
    {
      title: "which array method removes the last element from an array",
      multiChoice: [".pop()", ".push()", ".length", ".join()"],
      answer: ".pop()"
    },
  
    {
      title: "what is 2+2?",
      multiChoice: ["no one knows", "its uncalculatable", "its 4 of course", "come on im not a scientist"],
      answer: "its 4 of course"
    }
  ];