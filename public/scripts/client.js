/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log('Ready to tweet');

  const loadTweets = function() {
    $.ajax({
      url: '/api/tweets', // the endpoint to fetch data from
      type: 'GET',
      dataType: 'json',   // the expected response type
      success: function(response) {
        console.log('Data received:', response);
        renderTweets(response);
      },
      error: function(status, error) {
        console.log('Error:', error);
      }
    });
  };

  loadTweets();
    
  $(".create-tweet").on("submit", function(event) {
    event.preventDefault();
    const tweetText = $("textarea").val().trim();

    if (tweetText === "") {
      return alert("This field can't be empty!");
    }
    if (tweetText.length > 140) {
      return alert("Tweet should be 140 characters or less");

    } else {
      const formData = $(this).serialize();
      $.post("/api/tweets", formData, function() {
        console.log('data sent', formData);
      });
      $("textarea").val("");
    }
  });
});


const renderTweets = function(tweetsArr) {
  //loop through the array and create HTML article for each
  for (let tweet of tweetsArr) {
    let $tweetHTML = createTweetElement(tweet);
    $("#tweets-container").prepend($tweetHTML);
  }
};

const createTweetElement = function(tweetObj) {
  const time = timeago.format(tweetObj['created_at']);

  let $tweet = `
  <article class="tweet">
    <header>
      <div class="user">
        <img class="avatar" src="${tweetObj.user.avatars}" alt="user avatar">
        <span>${tweetObj.user.name}</span>
      </div>
      <span class="handle">${tweetObj.user.handle}</span>
    </header>
    <p>${tweetObj.content.text}</p>
    <footer>
      <span class="timestamp">${time}</span>
      <div class="icons">
        <i name="flag" class="fa-solid fa-flag"></i>
        <i name="share" class="fa-solid fa-retweet"></i>
        <i name="like" class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;

  return $tweet;
};


//renderTweets(data);
