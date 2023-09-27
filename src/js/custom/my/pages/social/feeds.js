"use strict";

// Определение класса
var SocialFeeds = function () {    
    // init variables
    var morePostsBtn = document.getElementById('social_feeds_more_posts_btn');
    var morePosts = document.getElementById('social_feeds_more_posts');
    var posts = document.getElementById('social_feeds_posts');

    var postInput = document.getElementById('social_feeds_post_input');
    var postBtn =  document.getElementById('social_feeds_post_btn');
    var newPost = document.getElementById('social_feeds_new_post');
    
    // Приватные методы
    var handleMorePosts = function () {
        // Show more click
        morePostsBtn.addEventListener('click', function (e) {
            // Cancel default behavior
            e.preventDefault();
            
            // Show indicator
            morePostsBtn.setAttribute('data-indicator', 'on');

            // Disable button to avoid multiple click 
            morePostsBtn.disabled = true;
            
            // Simulate form submission process
            setTimeout(function() {
                // Hide loading indication
                morePostsBtn.removeAttribute('data-indicator');

                // Enable button
				morePostsBtn.disabled = false;

                // Hide button
                morePostsBtn.classList.add('d-none');

                // Show card
                morePosts.classList.remove('d-none');

                // Scroll to
                Util.scrollTo(morePosts, 200);
            }, 1000);
        });
    }

    // Приватные методы
    var handleNewPost = function () {
        // Show more click
        postBtn.addEventListener('click', function (e) {
            // Cancel default behavior
            e.preventDefault();

            // Show indicator
            postBtn.setAttribute('data-indicator', 'on');

            // Disable button to avoid multiple click 
            postBtn.disabled = true;
            
            // Simulate form submission process
            setTimeout(function() {
                // Hide loading indication
                postBtn.removeAttribute('data-indicator');

                // Enable button
				postBtn.disabled = false;

                var message = postInput.value;
                var post = newPost.querySelector('.card').cloneNode(true);
                
                posts.prepend(post);

                if (message.length > 0) {
                    post.querySelector('[data-post-element="content"]').innerHTML = message;
                }                

                // Scroll to post
                Util.scrollTo(post, 200);
            }, 1000);
        });
    }

    // Публичные методы
    return {
        init: function () {
            handleMorePosts();
            handleNewPost();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    SocialFeeds.init();
});
