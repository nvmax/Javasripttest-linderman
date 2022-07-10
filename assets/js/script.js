let secondsLeft = 60;




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
      multiChoice: [ "<li>", "<ol>", "<ul>", "<dl>", "<li>"],
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