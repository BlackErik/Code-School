const URL = "http://todo2022.codeschool.cloud";

var app = new Vue({
  el: "#app",
  data: {
    nameInput: "",
    descriptionInput: "",
    doneInput: false,
    dateInput: "",
    tagsInput: {},

    todos: [],
    usableTags: [],
    newTodoId: "",

    editingIndex: -1,
  },

  methods: {
    addTodo: function () {
      let tagsList = [];
      this.usableTags.forEach((tag) => {
        if (this.tagsInput[tag]) {
          tagsList.push(tag);
        }
      });

      let newTodo = {
        name: this.nameInput,
        description: this.descriptionInput,
        done: this.doneInput,
        deadline: this.dateInput,
        tags: tagsList,
      };
      this.todos.push(newTodo);
      console.log(this.todos);
      fetch(URL + "/todo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        response.json().then((data) => {
          this.newTodoId = data._id;
          console.log(data._id);
        });
      });
      this.nameInput = "";
      this.descriptionInput = "";
      this.doneInput = false;
      this.dateInput = "";
      this.tagsInput = {};
    },

    getTodos: function () {
      fetch(URL + "/todos").then((resposne) => {
        response.json().then((data) => {
          this.todos = data;
        });
      });
    },

    postTodos: function () {},

    editingTodo: function (index) {
      this.editingIndex = index;
    },
  },

  created: function () {
    fetch(URL + "/todos").then((response) => {
      response.json().then((data) => {
        this.todos = data;
      });
    });
    fetch(URL + "/tags").then((response) => {
      response.json().then((data) => {
        this.usableTags = data;
        this.usableTags.forEach((tag) => {
          this.tagsInput[tag] = false;
        });
      });
    });
  },
});
