// initial variables
var tvShows = ["the office", "30 rock", "american horror story", "game of thrones"];
var movies = ["30 days of night", "constantine", "tron:legacy", "All dogs go to heaven"];
var favorites = [];

// Adds user inputed text into tvShows array
$("#add-button").on("click", function(event) {
  event.preventDefault();

  var input = $("#button-input")
    .val()
    .toLowerCase()
    .trim();
  if ($("input[name=movie]:checked").val() && $("input[name=gif]:checked").val()) {
    alert("Please check one choice at a time.");
  } else if ($("input[name=gif]:checked").val()) {
    tvShows.push(input);
  } else if ($("input[name=movie]:checked").val()) {
    movies.push(input);
  }

  createButtons();
});

// creates buttons for elements inside tvShows array
function createGIFButtons() {
  for (var i = 0; i < tvShows.length; i++) {
    var buttons = `
    <button class="mx-1 mt-2 bg-info" id="tvshow-btn" data-name="${tvShows[i]}">
    ${tvShows[i]}
    </button>
    `;

    $("#added-buttons").append(buttons);
  }
}
// creates buttons for elements inside movies array
function createMovieButtons() {
  for (var i = 0; i < movies.length; i++) {
    var buttons = `
    <button class="mx-1 mt-2 bg-danger" id="movie-btn" data-name="${movies[i]}">
    ${movies[i]}
    </button>
    `;

    $("#added-buttons").append(buttons);
  }
}

// empties out the added buttons and renders new ones of both gifs and movies
function createButtons() {
  $("#added-buttons").empty();
  createGIFButtons();
  createMovieButtons();
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
                  <div class="col col-s12 pl-1 mb-1">
                  <img src="${response.data[randomGIF].images.fixed_height_still.url}" 
                   class="gif" data-id="${response.data[randomGIF].id}"
                   data-play="${response.data[randomGIF].images.fixed_height.url}" 
                   data-pause="${response.data[randomGIF].images.fixed_height_still.url}"
                   data-state="pause" alt="${response.data[randomGIF].title}">
                   <p>Title: ${response.data[randomGIF].title}</p>
                   <p>Rating: ${response.data[randomGIF].rating}</p>
                  </div>
                `;
      $("#output-view").prepend(gifDiv);
    }
  });
}

// API call to OMDB using pressed button then adds it to the HTML document
function displayMovieInfo() {
  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=db4dc94c";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    var movieDiv = `
                    <div class="col pl-1">                   
                    <img src="${response.Poster}" class="mb-1">
                    <h2>${response.Title}</h2>
                    <p>Rating: ${response.Rated}</p>
                    <p>Released: ${response.Released}</p>
                    <p>${response.Plot}</p>                   
                    </div>
                  `;
    $("#output-view").prepend(movieDiv);
  });
}

// creates the way to control the gif either play or pause
function playPauseGif() {
  var gif = $(this).attr("data-state");
  if (gif === "pause") {
    $(this).attr("src", $(this).attr("data-play"));
    $(this).attr("data-state", "play");
  } else {
    $(this).attr("src", $(this).attr("data-pause"));
    $(this).attr("data-state", "pause");
  }
}

// shows the favorites area then clones selected gif to the favorites area
function addToFavorites(event) {
  event.preventDefault();
  $("#favorites").show();

  for (var i = 0; i < favorites.length; i++) {
    var dataID = favorites[i].id;
  }

  if ($(this).attr("data-id") === dataID) {
    return null;
  } else {
    $("#favorites").append($(this).clone());

    // create an object to push to favorites array
    var element = {};
    element.src = $(this).attr("src");
    element.dataState = $(this).attr("data-state");
    element.dataPause = $(this).attr("data-pause");
    element.dataPlay = $(this).attr("data-play");
    element.id = $(this).attr("data-id");
    element.alt = $(this).attr("alt");
    favorites.push(element);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// document functions
$(document).on("click", "#tvshow-btn", displayGIFs);
$(document).on("click", "#movie-btn", displayMovieInfo);
$(document).on("click", ".gif", playPauseGif);
$(document).on("contextmenu", "#output-view .gif", addToFavorites);
$(document).ready(function() {
  // when there is nothing in local storage hide the favorites area
  if (localStorage.getItem("favorites") == null) {
    $("#favorites").hide();
  } else {
    // if local storage has favorites saved parse the saved string and append the gifs to the favorites area
    favorites = JSON.parse(localStorage.getItem("favorites"));

    for (var a = 0; a < favorites.length; a++) {
      var imgTag = `
      <img class="gif" src="${favorites[a].src}" data-id="${favorites[a].id}"
      data-state="${favorites[a].dataState}" data-play="${favorites[a].dataPlay}" 
      data-pause="${favorites[a].dataPause}" alt="${favorites[a].alt}">
      `;
      $("#favorites").append(imgTag);
    }
  }
});

// adds initial buttons to HTML document
createButtons();
