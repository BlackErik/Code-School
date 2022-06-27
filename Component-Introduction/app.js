Vue.component("button-counter", {
  data: function () {
    return {
      count: 0,
    };
  },
  props: ["name"],
  template: `
  <div>
  {{name}}
      <button @click="count++">You clicked me {{count}} times </button>
  </div>
  `,
});

var app = new Vue({
  el: "#app",
  data: {
    button_name: "component_button",
  },
});
