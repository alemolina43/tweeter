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

    $.post("/api/tweets", formData, function() {
      console.log('data sent', formData);
    });
  });
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweetsArr) {
  //loop through the array and create HTML article for each
  for (let tweet of tweetsArr) {
    let $tweetHTML = createTweetElement(tweet);
    $("#tweets-container").append($tweetHTML);
  }
};

const createTweetElement = function(tweetObj) {
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
      <span class="timestamp">${tweetObj['created_at']}</span>
      <div class="icons">
        <i name="flag" class="fa-solid fa-flag"></i>
        <i name="share" class="fa-solid fa-retweet"></i>
        <i name="like" class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;

  return $tweet;
};


renderTweets(data);