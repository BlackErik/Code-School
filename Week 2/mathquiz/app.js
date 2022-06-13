//querying everything
var submitButton = document.querySelector("#submit-button");
var chooseMathButton = document.querySelector("#choose-math");
var firstNumber = document.querySelector("#first-number");
var mathSymbol = document.querySelector("#math-symbol");
var secondNumber = document.querySelector("#second-number");
var answerInput = document.querySelector("#answer-input");
var responseText = document.querySelector("#response-text");

var correctMultiply = document.querySelector("#correct-multiply");
var correctAddition = document.querySelector("#correct-addition");

function newAdditionProblem() {
  //getting random numbers and logging them to console
  var randomNumber = Math.floor(Math.random() * 100);
  var secondRandomNumber = Math.floor(Math.random() * 100);
  console.log("first random number: ", randomNumber);
  console.log("second random number: ", secondRandomNumber);

  //getting total of random numbers and logging to console
  var sumRandomNumbers = randomNumber + secondRandomNumber;
  console.log("sum of random numbers: ", sumRandomNumbers);

  //putting those random numbers within the span's in the h2 tag
  firstNumber.innerHTML = randomNumber;
  secondNumber.innerHTML = secondRandomNumber;
  mathSymbol.innerHTML = "+";
  return sumRandomNumbers;
}

function newMultiplicationProblem() {
  var randomNumber = Math.floor(Math.random() * 12);
  var secondRandomNumber = Math.floor(Math.random() * 12);
  console.log("first random number: ", randomNumber);
  console.log("second random number: ", secondRandomNumber);

  var productRandomNumbers = randomNumber * secondRandomNumber;
  console.log("product of random numbers: ", productRandomNumbers);

  firstNumber.innerHTML = randomNumber;
  secondNumber.innerHTML = secondRandomNumber;
  mathSymbol.innerHTML = "X";
  return productRandomNumbers;
}

// calls the funciton which creates the new set of random numbers and captures the answer
// var sumRandomNumbers = newAdditionProblem();
// var productRandomNumbers = newMultiplicationProblem();

//after clicking submit button the response text tag either display's correct or incorrect, also logs response to console

var mathSelected = "placeholder";
console.log(mathSelected);

// counter for how many answers of each type are answered correctly
var correctMultiplicationAnswers = 0;
var correctAdditionAnswers = 0;

//function that runs if the multiplication radio button is selected
function multiplicationSelected() {
  // generating and displaying a new multiplication problem and answer
  var productRandomNumbers = newMultiplicationProblem();
  //checks if input is correct after submit button is clicked
  submitButton.onclick = function () {
    if (answerInput.value == productRandomNumbers) {
      // logs and displays correct if input matches the product
      console.log("correct");
      //changing text and color
      responseText.innerHTML = "Correct";
      responseText.style.color = "#00CC00";
      // adding to our correct answer counter
      correctMultiplicationAnswers++;
      correctMultiply.innerHTML = correctMultiplicationAnswers;
      // starts a new problem
      productRandomNumbers = newMultiplicationProblem();
    } else {
      console.log("incorrect");
      responseText.innerHTML = "Incorrect. Try again";
      responseText.style.color = "#CC0000";
    }
    // clears input after answer
    answerInput.value = "";
  };
}

//function that runs if the addition radio button is selected
function additionSelected() {
  var sumRandomNumbers = newAdditionProblem();
  submitButton.onclick = function () {
    if (answerInput.value == sumRandomNumbers) {
      console.log("correct");
      responseText.innerHTML = "Correct";
      responseText.style.color = "#00CC00";
      correctAdditionAnswers++;
      correctAddition.innerHTML = correctAdditionAnswers;
      sumRandomNumbers = newAdditionProblem();
    } else {
      console.log("incorrect");
      responseText.innerHTML = "Incorrect. Try again";
      responseText.style.color = "#CC0000";
    }
    answerInput.value = "";
  };
}

// check which radio button is selected
chooseMathButton.onclick = function () {
  if (document.getElementById("multiplication").checked) {
    console.log("multiplication checked");
    mathSelected = "multiplication";
    multiplicationSelected();
  } else if (document.getElementById("addition").checked) {
    console.log("addition checked");
    mathSelected = "addition";
    additionSelected();
  }
  console.log(mathSelected);
};

//Button is clicked after pressing the enter key in input field, there's probably a better way to do this.
answerInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("submit-button").click();
  }
});
