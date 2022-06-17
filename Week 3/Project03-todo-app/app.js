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
    editingTags: [],
    editingTodoCopy: {},
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

      this.postTodo(newTodo);

      this.todos.push(newTodo);
      console.log(this.todos);
      this.nameInput = "";
      this.descriptionInput = "";
      this.doneInput = false;
      this.dateInput = "";
      this.tagsInput = {};
    },

    getTodos: function () {
      fetch(URL + "/todos").then((response) => {
        response.json().then((data) => {
          this.todos = data;

          this.todos.forEach((todo) => {
            todo.deadline = todo.deadline.split("T")[0];
          });
        });
      });
    },

    postTodo: function (newTodo) {
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
    },

    editingTodo: function (index) {
      this.editingIndex = index;
    },

    editTodo: function (todo, index) {
      this.editingIndex = index;

      this.editingTodoCopy = { ...todo };

      if (Object.keys(todo).includes("tags")) {
        this.editingTags = [];
        this.usableTags.forEach((tag) => {
          this.editingTags.push(todo.tags.includes(tag));
        });
      }
    },

    putTodo: function (todo_object) {
      // this.todos[index] = { ...this.editingTodoCopy };
      // this.editTodo({}, -1);
      this.editTodo(todo_object, 1);
      let listOfTags = [];
      this.usableTags.forEach((tag, index) => {
        if (this.editingTags[index]) {
          listOfTags.push(tag);
        }
      });

      this.editingTodoCopy.tags = [...listOfTags];

      fetch(URL + "/todo/" + todo_object._id, {
        method: "PUT",
        body: JSON.stringify(this.editingTodoCopy),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        response.json().then((updated_todo) => {
          this.newTodoId = updated_todo._id;
          this.getTodos();
        });
      });
      this.editingIndex = -1;
    },

    deleteTodo: function (todo_object) {
      fetch(URL + "/todo/" + todo_object._id, {
        method: "DELETE",
      }).then((response) => {
        response.json().then((deleted_todo) => {
          console.log(deleted_todo);
          this.getTodos();
        });
      });
    },
  },

  created: function () {
    this.getTodos();
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
