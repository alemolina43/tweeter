$(document).ready(function() {
  // console.log('Content has been loaded properly');

  $("#tweet-text").on("input", function() {
    let tweetLength = $(this).val().length;
    let count = 140 - tweetLength;

    let counter = $(this)
      .closest("form") // go up to the closest form element
      .find(".counter"); // find the .counter inside the form

    counter.text(count); // update the counter text

    if (count < 0) {
      counter.addClass("low-count");
    } else {
      counter.removeClass("low-count");
    }
  });
});
