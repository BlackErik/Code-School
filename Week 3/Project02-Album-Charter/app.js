const URL = "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=";

var app = new Vue({
  el: "#app",
  data: {
    artistInput: "",
    searchAlbumList: [],
    pickedAlbumList: [],
    pickedUp: -1,
    searched: false,
    tempList: [],
    pickedUpAlbum: {},
  },
  methods: {
    searchArtist: function () {
      //   console.log(this.artistInput);
      //   this.artistInput = "";

      fetch(URL + encodeURIComponent(this.artistInput)).then((response) => {
        response.json().then((data) => {
          this.searchAlbumList = data.album;
        });
      });
      this.artistInput = "";
      this.searched = true;
    },

    addAlbum: function (index) {
      let album = this.searchAlbumList[index];

      this.pickedAlbumList.push(album);
    },

    removeAlbum: function (index) {
      this.pickedAlbumList.splice(index, 1);
    },

    pickupAlbum: function (index) {
      this.pickedUp = index;
      this.pickedUpAlbum = this.pickedAlbumList[index];
      this.tempList = this.pickedAlbumList;
    },

    dropAlbum: function (drop_index) {
      if (this.pickedUp < 0) {
        return;
      }

      if (drop_index >= this.pickedAlbumList.length) {
        drop_index = this.pickedAlbumList.length - 1;
      }

      let movedAlbum = this.pickedAlbumList[this.pickedUp];

      this.pickedAlbumList.splice(this.pickedUp, 1);

      this.pickedAlbumList.splice(drop_index, 0, movedAlbum);

      this.pickedUp = -1;
    },

    hoverAlbum: function (hover_index) {
      if (this.pickedUp < 0) {
        return;
      }
      if (hover_index >= this.pickedAlbumList.length) {
        hover_index = this.pickedAlbumList.length - 1;
      }
      let movedAlbum = this.pickedALbumList[this.pickedUp];
      this.pickedAlbumList.splice(this.pickedUp, 1);
      this.pickedAlbumList.splice(hover_index, 0, movedAlbum);
    },
  },
});
