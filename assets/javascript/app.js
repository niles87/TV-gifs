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
        <button class="tvshow" data-name="${tvShows[i]}">
        ${tvShows[i]}
        </button>
        `;

    $("#added-tvshows").append(buttons);
  }
}

createButtons();
