/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // console.log('Ready to tweet');

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
    let tweetText = $("textarea").val().trim();
    $(".error-message").slideUp();

    if (tweetText.length === 0) {
      $('.error-message').text("⚠️This field can't be empty!").slideDown(1000);
    }
    if (tweetText.length > 140) {
      $('.error-message').text("⚠️Tweet should be 140 characters or less").slideDown(1000);

    }
   
    const formData = $(this).serialize();
  
    $.ajax({
      type: "POST",
      url: "/api/tweets",
      data: formData,
      success: (tweet) => {
        $("#tweets-container").empty();
        loadTweets();
        $("textarea").val("");
        $(".counter").val(140);
      }
    });
  
   
  });

});

const appendTweet = function(tweet) {
  const lastTweet = createTweetElement(tweet);
  $("#tweets-container").prepend(lastTweet);
};

const renderTweets = function(tweetsArr) {
  //loop through the array and create HTML article for each
  for (let tweet of tweetsArr) {
    appendTweet(tweet);
  }
};

const sanitizeInput = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const time = timeago.format(tweetObj['created_at']);
  const textFromUser = tweetObj.content.text;

  let $tweet = `
  <article class="tweet">
    <header>
      <div class="user">
        <img class="avatar" src="${tweetObj.user.avatars}" alt="user avatar">
        <span>${tweetObj.user.name}</span>
      </div>
      <span class="handle">${tweetObj.user.handle}</span>
    </header>
    <p>${sanitizeInput(textFromUser)}</p>
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
