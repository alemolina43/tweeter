/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log('Ready to tweet');
    
  $(".create-tweet").on("submit", function(event) {
    event.preventDefault();
  
    const formData = $(this).serialize();

    $.post("/api/tweets", formData, function(response) {
      console.log(response);
    });
  });
});