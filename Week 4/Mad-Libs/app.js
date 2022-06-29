// Default Mad Lib component
Vue.component("pessimistic-mad-lib", {
  template: `
    <div id='story'>
        <b>{{ name }}</b> was born <b>{{ birthday }}</b> and is absolutely frightened at the idea of eating <b>{{ favoriteFood }}</b>.
        All good things come in <b>{{favoriteNumber}}</b>'s, right? Not according to <b>{{ name }}</b>. That's how many times <b>{{ name }}</b> has been
        able to buy <b>{{ favoriteShoppingItem }}</b> - clearly not enough! What's more, <b>{{ name }}</b> found out that
        <b>{{ favoriteMovie }}</b> has <b>{{ favoriteNumber }}</b> sequels, and they're all terrible! No wonder
        <b>{{ name }}</b> is one of the few remaining fans of the series. Considering all this, there are definitely better days ahead for <b>{{ name }}</b>.
    </div>
    `,
  props: {
    name: String,
    birthday: String,
    favoriteFood: String,
    favoriteNumber: Number,
    favoriteMovie: String,
    favoriteShoppingItem: String,
  },
});

// Implement your own mad lib component here:

Vue.component("mad-lib", {
  template: `
    <div id='story'>
        <b>{{ name }}</b> was born <b>{{ birthday }}</b> and is absolutely frightened at the idea of eating <b>{{ favoriteFood }}</b>.
        All good things come in <b>{{favoriteNumber}}</b>'s, right? Not according to <b>{{ name }}</b>. That's how many times <b>{{ name }}</b> has been
        able to buy <b>{{ favoriteShoppingItem }}</b> - clearly not enough! What's more, <b>{{ name }}</b> found out that
        <b>{{ favoriteMovie }}</b> has <b>{{ favoriteNumber }}</b> sequels, and they're all terrible! No wonder
        <b>{{ name }}</b> is one of the few remaining fans of the series. Considering all this, there are definitely better days ahead for <b>{{ name }}</b>.
    </div>
    `,
  props: {
    name: String,
    birthday: String,
    favoriteFood: String,
    favoriteNumber: String,
    favoriteMovie: String,
    favoriteShoppingItem: String,
  },
});
// Minimum Vue Instance
var app = new Vue({
  el: "#app",
  data: {
    nameInput: "",
    birthdayInput: "",
    favoriteFoodInput: "",
    favoriteNumberInput: 0,
    favoriteMovieInput: "",
    favoriteThingInput: "",
    page: "start",
  },
});
