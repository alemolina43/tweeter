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

  const sanitizeInput = (input) => {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
    
  $(".create-tweet").on("submit", function(event) {
    event.preventDefault();
    let tweetText = $("textarea").val().trim();

    if (tweetText.length === 0) {
      return alert("This field can't be empty!");
    }
    if (tweetText.length > 140) {
      return alert("Tweet should be 140 characters or less");

    }
    // Sanitize the text before sending
    tweetText = sanitizeInput(tweetText);
    $("textarea").val(tweetText); //Update the textarea value with sanitized text


    const formData = $(this).serialize();
    // $.post("/api/tweets", formData, function() {
    //   console.log('data sent', formData);
    // });

    $.ajax({
      type: "POST",
      url: "/api/tweets",
      data: formData,
      success: (tweet) => {
        appendTweet(tweet);
      }
    });
  
    $("textarea").val("");
   
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
