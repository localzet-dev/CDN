"use strict";

// Определение класса
var ProfileGeneral = function () {
    // init variables
    var showMoreButton;
    var showMoreCards;
    var followBtn;
    var profileNav;
    var pageToolbar;

    // Приватные методы
    var handleShowMore = function () {
        if (!showMoreButton) {
            return;
        }

        // Show more click
        showMoreButton.addEventListener('click', function (e) {
            showMoreButton.setAttribute('data-indicator', 'on');

            // Disable button to avoid multiple click 
            showMoreButton.disabled = true;
            
            setTimeout(function() {
                // Hide loading indication
                showMoreButton.removeAttribute('data-indicator');

                // Enable button
				showMoreButton.disabled = false;

                // Hide button
                showMoreButton.classList.add('d-none');

                // Show card
                showMoreCards.classList.remove('d-none');

                // Scroll to card
                Util.scrollTo(showMoreCards, 200);
            }, 2000);
        });
    }

    // Follow button
    var handleUFollow = function() {
        if (!followBtn) {
            return;
        }

        followBtn.addEventListener('click', function(e){
            // Prevent default action 
            e.preventDefault();
            
            // Show indicator
            followBtn.setAttribute('data-indicator', 'on');
            
            // Disable button to avoid multiple click 
            followBtn.disabled = true;

            // Check button state
            if (followBtn.classList.contains("btn-success")) {
                    setTimeout(function() {
                    followBtn.removeAttribute('data-indicator');
                    followBtn.classList.remove("btn-success");
                    followBtn.classList.add("btn-light");
                    followBtn.querySelector("i").classList.add("d-none");
                    followBtn.querySelector(".indicator-label").innerHTML = 'Follow';
                    followBtn.disabled = false;
                }, 1500);   
            } else {
                    setTimeout(function() {
                    followBtn.removeAttribute('data-indicator');
                    followBtn.classList.add("btn-success");
                    followBtn.classList.remove("btn-light");
                    followBtn.querySelector("i").classList.remove("d-none");
                    followBtn.querySelector(".indicator-label").innerHTML = 'Following';
                    followBtn.disabled = false;
                }, 1000);   
            }        
        });        
    }

    var handleFollowers = function() {
        Util.on(document.body,  '[data-follow-btn="true"]', 'click', function(e) {
            e.preventDefault();

            var el = this;
            var label = el.querySelector(".indicator-label");
            var following = el.querySelector(".following");
            var follow = el.querySelector(".follow");

            el.setAttribute('data-indicator', 'on');            
            el.disabled = true;
            follow.classList.add("d-none");
            following.classList.add("d-none")

            setTimeout(function() {
                el.removeAttribute('data-indicator');
				el.disabled = false;

                if (el.classList.contains("btn-light-primary")) { // following
                    el.classList.remove("btn-light-primary");
                    el.classList.add("btn-light");

                    follow.classList.remove("d-none");

                    label.innerHTML = "Follow";
                } else {  // follow
                    el.classList.add("btn-light-primary");
                    el.classList.remove("btn-light");

                    following.classList.remove("d-none");

                    label.innerHTML = "Following";
                }
            }, 2000);
        });
    }

    var handlePageScroll = function() {
        if ( profileNav  && profileNav.getAttribute("data-sticky") && Util.isBreakpointUp('lg')) {
            
            if ( localStorage.getItem('nav-initialized') === "1") {
                window.scroll({
                    top: parseInt(profileNav.getAttribute("data-page-scroll-position")),
                    behavior: 'smooth'
                });
            }
    
            localStorage.setItem('nav-initialized', "1");        
        }        
    }

    // Публичные методы
    return {
        init: function () {
            showMoreButton = document.querySelector('#followers_show_more_button');
            showMoreCards = document.querySelector('#followers_show_more_cards');
            followBtn = document.querySelector('#user_follow_button');
            profileNav = document.querySelector('#user_profile_nav');

            handleShowMore();
            handleUFollow();
            handleFollowers();
            handlePageScroll();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    ProfileGeneral.init();
});