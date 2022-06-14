const URL = "https://cs2022-eight-ball.herokuapp.com";

var app = new Vue({
  el: "#app",
  data: {
    message: "",
    prompt: "Ask A Question",
    messageColor: "",

    question: "",
    answerReady: true,
  },

  methods: {
    askQuestion: function () {
      // let nextIndex = Math.floor(Math.random() * this.messageBank.length);
      // let nextResponse = this.messageBank[nextIndex];
      this.message = "";
      this.messageColor = "rgba(255,255,255,0)";
      this.answerReady = false;
      setTimeout(() => {
        fetch(URL + "/questions").then((response) => {
          response.json().then((data) => {
            console.log(data);
            this.message = data["answer"];
            this.messageColor = data["color"];
            this.answerReady = true;
          });
        });
      }, 1500);
      // this.message = nextResponse;
      this.prompt = "Ask Another Question";
      this.question = "";
    },
    isValidQuestion: function () {
      return this.question[this.question.length - 1] == "?";
    },
  },
});
