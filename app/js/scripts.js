'use strict';

$(document).ready(function() {
  $('.dropdown').on("click", function () {
    $(this).find('.dropdown-container').stop().slideToggle();
    $(this).toggleClass('active');
  });
});
