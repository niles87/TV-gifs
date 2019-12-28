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
        <button class="tvshow-btn" data-name="${tvShows[i]}">
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
    "&limit=10&offset=0&rating=&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    for (var a = 0; a < response.data.length; a++) {
      var gifDiv = `
                  <div class="tvshow">
                  <img src="${response.data[a].images.original_still.url}">
                  </div>
                
                
                `;
      $("#gif-view").prepend(gifDiv);
    }
  });
}

$(document).on("click", ".tvshow-btn", displayGIFs);

createButtons();
