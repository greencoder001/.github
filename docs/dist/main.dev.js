"use strict";

$$(document)(function () {
  $$('.menu-icon').on('click', function () {
    $$('.menu-list').toggleClass('active');
  });
});