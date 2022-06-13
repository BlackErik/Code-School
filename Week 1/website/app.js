$(document).ready(function () {
  $(".image-link").magnificPopup({ type: "image" });
});

$(document).ready(function () {
  $(".template-article img").each(function () {
    var currentImage = $(this);
    currentImage.wrap(
      "<a class='image-link' href='" + currentImage.attr("src") + "'</a>"
    );
  });
  $(".image-link").magnificPopup({ type: "image" });
});
