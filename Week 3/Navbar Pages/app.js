// 1. Get Navs to Show
// 2. Create your data Variables
// 3. Implement your goToPage function
// 4. Display yourPageVariable at the bottom of the page
// 5. Hide each page div that doesn't match yourPageVariable

var app = new Vue({
  el: "#app",
  data: {
    // page number variable
    pageNumber: 1,
    pageInput: "",
  },
  methods: {
    // updates page number variable
    goToPage: function (page_clicked) {
      this.pageNumber = page_clicked;
    },
    goToPageUserInput: function () {
      this.pageNumber = this.pageInput;
      this.pageInput = "";
    },
  },
});

// Extra Challenges:

// [X] Create arrows/buttons to increase/decrease the page number (aka flip pages)

// [X] Disable the left / right buttons if the user is at the first or last page

// [X] Add an input section allowing the user to go directly to a page number

// [] Display two pages at a time - side by side (similar to a book).
// []    When you 'flip the page', show the next two pages.
