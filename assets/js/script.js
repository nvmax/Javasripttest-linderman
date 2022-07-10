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