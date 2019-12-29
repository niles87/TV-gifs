var tvShows = ["the office", "30 rock", "american horror story"];

$("#add-show").on("click", function(event) {
  event.preventDefault();

  var show = $("#gif-submit")
    .val()
    .trim();

  tvShows.push(show);

  console.log(tvShows);

  createButtons();
});

function createButtons() {
  $("#added-tvshows").empty();
  for (var i = 0; i < tvShows.length; i++) {
    var buttons = `
        <button class="mx-1 mt-2" id="tvshow-btn" data-name="${tvShows[i]}">
        ${tvShows[i]}
        </button>
        `;

    $("#added-tvshows").append(buttons);
  }
}
function displayGIFs() {
  var show = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=XL0cvri4mdJxFaANOrpJHxQ6v0hiBPkp&q=" +
    show +
    "&limit=100&offset=0&rating=&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    for (var a = 0; a < 10; a++) {
      var randomGIF = Math.floor(Math.random() * 100);
      var gifDiv = `
                  <div class="tvshow">
                  
                  <video class="gif" loop="loop">
                  <source src="${response.data[randomGIF].images.fixed_height.mp4}" type="video/mp4">
                  Your browser does not support this GIF.
                  </video>
                  <p>Rating: ${response.data[randomGIF].rating}</p>
                  
                  </div>
                `;
      $("#gif-view").prepend(gifDiv);
    }
  });
}
function playPauseGif() {
  var gif = $(this).get(0);
  if (gif.paused) {
    gif.play();
  } else {
    gif.pause();
  }
}

$(document).on("click", "#tvshow-btn", displayGIFs);
$(document).on("click", ".gif", playPauseGif);

createButtons();
