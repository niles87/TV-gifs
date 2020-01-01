var movies = ["30 days of night", "constantine", "tron:legacy", "All dogs go to heaven"];

// Adds user inputed text into movies array
$("#add-movie").on("click", function(event) {
  event.preventDefault();

  var movie = $("#movie-submit")
    .val()
    .toLowerCase()
    .trim();

  movies.push(movie);

  createButtons();
});

// creates buttons for elements inside movies array
function createButtons() {
  $("#added-movies").empty();
  for (var i = 0; i < movies.length; i++) {
    var buttons = `
        <button class="mx-1 mt-2" id="movie-btn" data-name="${movies[i]}">
        ${movies[i]}
        </button>
        `;

    $("#added-movies").append(buttons);
  }
}

// API call to OMDB using pressed button then adds it to the HTML document
function displayMovies() {
  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=db4dc94c";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    var movieDiv = `
                    <div class="movie">
                    <h2>${response.Title}</h2>
                    <p>Rating: ${response.Rated}</p>
                    <p>Released: ${response.Released}</p>
                    <img src="${response.Poster}" class="mb-1 movie">
                    <p>${response.Plot}</p>
                    </div>
                  `;
    $("#movie-view").prepend(movieDiv);
  });
}

// document functions
$(document).on("click", "#movie-btn", displayMovies);

createButtons();
