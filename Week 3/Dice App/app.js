var app = new Vue({
  el: "#app",
  data: {
    // input for new dice sides
    sidesOfDie: "",
    // array to hold dice

    allDice: [],
  },
  methods: {
    // create new die, push it to our dice array
    addDie: function () {
      let newDie = {
        value: this.sidesOfDie,
        sides: this.sidesOfDie,
      };
      this.allDice.push(newDie);
    },
    // use setInterval, as well as a counter variable (ie. i = 0), to get a random value for the die.
    //   After the counter variable reaches a stopping point (ie. i >= 20), clear the interval.
    rollDie: function (index) {
      let counter = 0;
      let currentDie = this.allDice[index];
      let intervalID = setInterval(() => {
        currentDie.value = Math.ceil(Math.random() * currentDie.sides);

        if (counter >= 20) {
          clearInterval(intervalID);
        }
        counter++;
      }, 20);
    },

    // use the array.splice function to delete the dice at the given index
    deleteDie: function (index) {
      this.allDice.splice(index, 1);
    },

    // similar to rolling a single die, but start a setInterval for each die.
    //   Each interval stopping point (ie. 20) should be more than the previous (ie. 20, 40, 60, ...)
    rollAllDice: function () {
      let intervalIncrease = 20;
      for (let d = 0; d < this.allDice.length; d++) {
        let stop = intervalIncrease * (d + 1);

        let currentDie = this.allDice[d];
        let i = 0;
        let intervalID = setInterval(() => {
          currentDie.value = Math.ceil(Math.random() * currentDie.sides);
          if (i >= stop) {
            clearInterval(intervalID);
          }
          i++;
        }, 20);
      }
    },
  },
});
