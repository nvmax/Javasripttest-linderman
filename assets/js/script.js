// vararibles used with in functions and page.
let secondsLeft = 60;
let timer = document.getElementById("timer");
let buttonsDiv = document.getElementById("buttons");
let startButton = document.getElementById("start-button");
var questionDiv = document.getElementById("questions-div");
var choice = document.getElementById("choices");
let viewScoresBtn = document.getElementById("view-scores");
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));
let scoresDiv = document.getElementById("scores-div");
let results = document.getElementById("results");
startButton.addEventListener("click", setTime);
var quizCount = 0;
let score = 0;
let emptyArray = [];

// timer function to count down
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
    // removes start button when clicked and continues to quiz questions
    removeEls(startButton);
  
    if (quizCount < quiz.length) {
      questionDiv.innerHTML = quiz[quizCount].Question;
      choice.textContent = "";  
      for (let i = 0; i < quiz[quizCount].Choices.length; i++) {
        let el = document.createElement("button");
        // creates buttons for each choice
        el.innerText = quiz[quizCount].Choices[i];
        el.setAttribute("data-id", i);
        // adds each question and choice to the page
        el.addEventListener("click", function (event) {
          // stops click event from bubbling up to the parent element
          event.stopPropagation();
          if (el.innerText === quiz[quizCount].answer) {
            // takes score and adds time left to it for score
            score += secondsLeft;
          } else {
            score -= 75;
            // removes 15 seconds from time left if wrong answer
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
        // appends choices to the page from the quiz array in the order they are in
        choice.append(el);
      }
    }
  }

  // capture user score and store in local storage
  function captureUserScore() {
    // stops timer 
    timer.remove();
    choice.textContent = "";
    // creates input for user initials
    let initialsInput = document.createElement("input");
    // creates postscore button
    let postScoreBtn = document.createElement("input");
    // informes user of their score and asks them to enter their initials
    results.innerHTML = `Your score is ${score} Enter initials: `;
    initialsInput.setAttribute("type", "text");
    postScoreBtn.setAttribute("type", "button");
    postScoreBtn.setAttribute("value", "Post Score!");
    // reads stored scores from local storage if no score just adds new score, if scores then appends new score to list
    postScoreBtn.addEventListener("click", function (event) {
      event.preventDefault();
      let scoresArray = defineScoresArray(storedArray, emptyArray);
      let initials = initialsInput.value;
      let userAndScore = {
        initials: initials,
        score: score,
      };  
      scoresArray.push(userAndScore);
      // sends scoresArray to saveScores function
      saveScores(scoresArray);
      // calls to goBackBtn function to create go back button
      goBackBtn();
      // calls to clearScoresBtn function to create clear scores button
      clearScoresBtn();
      // calls to viewScores function to create view scores button
      displayAllScores();
      viewScoresBtn.remove();
    });
    // appends results with itials input and post score button
    results.append(initialsInput);
    results.append(postScoreBtn);
  }

  // funtion to save scores to local storage
  const saveScores = (array) => {
    window.localStorage.setItem("highScores", JSON.stringify(array));
  }

// function to define scores array if no scores stored in local storage or if scores stored in local storage
  const defineScoresArray = (arr1, arr2) => {
    if(arr1 !== null) {
      return arr1
    } else {
      return arr2
    }
  }
// function to create go back button
  function goBackBtn() {
    let backBtn = document.createElement("input");
    backBtn.setAttribute("type", "button");
    backBtn.setAttribute("value", "Go Back");
    backBtn.addEventListener("click", function(event){
      event.preventDefault();
      window.location.reload();
    })
    buttonsDiv.append(backBtn)
  }
  // function to create view scores button
    function viewScores() {
      viewScoresBtn.addEventListener("click", function(event) {
        event.preventDefault();
        // timer and start button from window
        removeEls(timer, startButton);
        // calls to displayallScores function to create view scores button
        displayAllScores();
        // removes elements viewcoresbutton
        removeEls(viewScoresBtn);
        // calls to clearScoresButton Function to create clear scores button
        clearScoresBtn();
        // calls to goBackBtn function to create go back button
        goBackBtn();
      });
    }
  // function to create clear scores button
    function clearScoresBtn() {    
      let clearBtn = document.createElement("input");
      clearBtn.setAttribute("type", "button");
      clearBtn.setAttribute("value", "Clear Scores");
      clearBtn.addEventListener("click", function(event){
        event.preventDefault();
        removeEls(scoresDiv);
        // removes itesm from local storage in highscores
        window.localStorage.removeItem("highScores");
      })
      scoresDiv.append(clearBtn)
    }

// removes all child elements
  const removeEls = (...els) => {
    for (let el of els) el.remove();
  }
// fucntion to display all scores
  function displayAllScores() {
    removeEls(timer, startButton, results);
    let scoresArray = defineScoresArray(storedArray, emptyArray);
    scoresArray.forEach(obj => {
      let initials = obj.initials;
      let storedScore = obj.score;
      let resultsP = document.createElement("p");
      scoresDiv.append(resultsP);
      resultsP.innerText = `${initials}: ${storedScore}`;
    });
  }
// calls to viewScores function on load of page to view scores
    viewScores();
// idea of use of this style of quiz variables https://www.sitepoint.com/simple-javascript-quiz/
  var quiz = [
    {
      Question: "What language specifies the style of elements on a webpage?",
      Choices: ["HTML", "Javascript", "Cascading Style Sheets", "Typescript"],
      answer: "Cascading Style Sheets"
    },
  
    {
      Question: "Which tag element is not visible from a browser view",
      Choices: ["<li>items</li>", "<h1>Title</h1>", "<p>paragraph</p>", "<br> break"],
      answer: "<br> break"
    },
  
    {
      Question: "How can you make a numbered List",
      Choices: [ "<li>", "<ol>", "<ul>", "<dl>"],
      answer: "<ol>"
    },
  
    {
      Question: "which array method removes the last element from an array",
      Choices: [".pop()", ".push()", ".length", ".join()"],
      answer: ".pop()"
    },
  
    {
      Question: "How do you create a function in JavaScript?",
      Choices: ["function = myFunction()", "Function myFunction()", "function:myFunction()", "function+=myFunction()"],
      answer: "Function myFunction()"
    },

    {
      Question: "How do you round the number 7.25, to the nearest integer?",
      Choices: ["round(7.25)", "Math.round(7.25)", "Math.floor(7.25)", "Math.ceil(7.25)"],
      answer: "Math.round(7.25)"
    }
  ];