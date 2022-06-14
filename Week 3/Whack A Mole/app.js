var app = new Vue({
  el: "#app",
  data: {
    // row count and column count
    rowCount: 5,
    columnCount: 5,
    // mole position (row and column)
    molePositionRow: -1,
    molePositionColumn: -1,
    // score and total
    score: 0,
    total: 0,
  },
  methods: {
    updateMoleRecursive: function () {
      // use SetTimeout to
      // 1. change the mole's position
      // 2. update the total
      setTimeout(() => {
        this.molePositionRow = Math.ceil(Math.random() * this.rowCount);
        this.molePositionColumn = Math.ceil(Math.random() * this.columnCount);
        console.log(this.molePositionRow, this.molePositionColumn);
        this.total++;
        // if(this.total>= 10){return}
        this.updateMoleRecursive();
      }, 2000);
    },
    hitMole: function () {
      // 1. add 1 to the score
      this.score++;
      // 2. clear the mole off the board
      this.molePositionRow = -1;
      this.molePositionColumn = -1;
    },
  },
  created: function () {
    // Call Recursive function to start
    this.updateMoleRecursive();
  },
});

//TODO
//restart/play button
//stop mole after certain total
// keep a high score, seperate from game score
// multiple moles at the same time
