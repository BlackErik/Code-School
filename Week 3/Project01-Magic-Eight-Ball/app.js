var app = new Vue({
  el: "#app",
  data: {
    message: "",
    prompt: "Ask A Question",

    messageBank: [
      "Yes",
      "No",
      "Maybe",
      "Ask Again Tomorrow",
      "Probably",
      "Probably Not",
      "Concentrate and ask again",
    ],

    question: "",
  },

  methods: {
    askQuestion: function () {
      let nextIndex = Math.floor(Math.random() * this.messageBank.length);
      let nextResponse = this.messageBank[nextIndex];
      this.message = nextResponse;
      this.prompt = "Ask Another Question";
      this.question = "";
    },
    isValidQuestion: function () {
      return this.question[this.question.length - 1] == "?";
    },
  },
});
