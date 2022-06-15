const WALLS_URL = "https://api.jsonbin.io/b/62a94a26402a5b38022853a7";

var app = new Vue({
  el: "#app",
  data: {
    // bool variables for started, won, lost
    started: false,
    won: false,
    lost: false,
    // array for walls
    walls: [],
  },
  methods: {
    // resets started, won, lost to initial values
    restartMaze: function () {
      this.started = false;
      this.won = false;
      this.lost = false;
    },
  },
  // fetch walls from jsonbin and assign wall array
  created: function () {
    fetch(WALLS_URL)
      .then((response) => response.json())
      .then((data) => this.walls.push(data));
    console.log(this.walls);
  },
});

// Extra Challenges:
// - Create your own maze (your own walls, same or different css)
// - Have 'moving' walls (hint: transition property)
// - Have multiple levels
