var tvShows = ["the office", "30 rock", "american horror story", "game of thrones"];
var favorites = [];
var element = {};

// Adds user inputed text into tvShows array
$("#add-show").on("click", function(event) {
  event.preventDefault();

  var show = $("#gif-submit")
    .val()
    .toLowerCase()
    .trim();

  tvShows.push(show);

  createButtons();
});

// creates buttons for elements inside tvShows array
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

// API call to giphy using pressed button then adds it to the HTML document
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
    for (var q = 0; q < 10; q++) {
      var randomGIF = Math.floor(Math.random() * 100);
      var gifDiv = `
                  <div class="tvshow">
                  <video class="gif" loop="loop">
                  <source src="${response.data[randomGIF].images.fixed_height.mp4}" type="video/mp4">
                  Your browser does not support this GIF.
                  </video>
                  <p>Right click to add to favorites</p>
                  <p>Rating: ${response.data[randomGIF].rating}</p>
                  <p>Title: ${response.data[randomGIF].title}</p>
                  </div>
                `;
      $("#gif-view").prepend(gifDiv);
    }
  });
}

// creates the way to control the gif either play or pause
function playPauseGif() {
  var gif = $(this).get(0);
  if (gif.paused) {
    gif.play();
  } else {
    gif.pause();
  }
}

// shows the favorites area then clones selected gif to the favorites area
function addToFavorites() {
  $("#favorites").show();
  $("#favorites").append($(this).clone());

  element.src = $(this)
    .find("Source:first")
    .attr("src");
  favorites.push(element);

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// document functions
$(document).on("click", "#tvshow-btn", displayGIFs);
$(document).on("click", ".gif", playPauseGif);
$(document).on("contextmenu", ".gif", addToFavorites);
$(document).ready(function() {
  if (localStorage.getItem("favorites") == null) {
    $("#favorites").hide();
  } else {
    favorites = JSON.parse(localStorage.getItem("favorites"));
    for (var a = 0; a < favorites.length; a++) {
      var videoTag = `
      <video class="gif" loop="loop">
      <source src="${favorites[a].src}" type="video/mp4">
      Your browser does not support this GIF.
      </video>
      `;
      $("#favorites").append(videoTag);
    }
  }
});

createButtons();
