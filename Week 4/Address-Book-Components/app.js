Vue.component("customaddress", {
  template: `
  <div> 
    <h1> {{address.name}} </h1>
    <p> {{address.address}} </p>
    <button @click="removeFromList()"> Delete Address </button>
  </div>
  `,

  data: function () {
    return {};
  },
  methods: {
    removeFromList: function () {
      let index = this.addresslist.indexOf(this.address);
      let list = this.addresslist;
      list.splice(index, 1);
    },
  },
  props: ["index", "addresslist", "address"], // or {}
});

var app = new Vue({
  el: "#app",
  data: {
    nameInput: "",
    addressInput: "",
    addresslist: [],
    // variables to model each input
    // list to hold addresses
  },
  methods: {
    addAddress: function () {
      let newAddress = {};
      newAddress["name"] = this.nameInput;
      newAddress["address"] = this.addressInput;
      this.addresslist.push(newAddress);
      console.log(this.addresslist);
      this.nameInput = "";
      this.addressInput = "";
    },
    // function to push address into list, clear input fields
  },
});
