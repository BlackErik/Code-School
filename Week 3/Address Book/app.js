var app = new Vue({
  el: "#app",
  data: {
    nameInput: "",
    addressInput: "",
    addresses: [],
  },
  methods: {
    // function to add(push) address into list, clear input fields
    recordAddress: function () {
      let newAddress = {
        name: this.nameInput,
        address: this.addresInput,
      };
      this.addresses.push(newAddress);
      this.nameInput = "";
      this.addressInput = "";
    },
  },
});
