var tvShows = ["the office", "30 rock", "american horror story", "game of thrones"];
var user = prompt("Enter a username please:", "");
var newUser = false;

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
                  <img src="${response.data[randomGIF].images.fixed_height.mp4}" class="gif">
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
  setCookie("username", user, 30);
}

// sets a cookie
function setCookie(cn, cv, exd) {
  var day = new Date();
  day.setTime(day.getTime() + exd * 24 * 60 * 60 * 1000);
  var exp = "expires=" + day.toGMTString();

  document.cookie = cn + "=" + cv + ";" + exp + ";path=/;secure";
}

// gets cookie
function getCookie(cookieName) {
  var cname = cookieName + "=";
  var decodeCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodeCookie.split(";");
  for (var j = 0; j < cookieArray.length; j++) {
    var cooki = cookieArray[j];
    while (cooki.charAt(0) == " ") {
      cooki = cooki.substring(1, cooki.length);
    }
    if (cooki.indexOf(cname) == 0) {
      var cookieSub = cookieArray.substring(cname.length, cooki.length);
      return cookieSub;
    }
  }
  return "";
}

// checks for a cookie
function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome Back " + user);
  } else {
    newUser = true;
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}

// document functions
$(document).on("click", "#tvshow-btn", displayGIFs);
$(document).on("click", ".gif", playPauseGif);
$(document).on("contextmenu", ".gif", addToFavorites);
$(document).ready(function() {
  checkCookie();
  if (!newUser) {
    $("#favorites").hide();
  }
});

createButtons();
