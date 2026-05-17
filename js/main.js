'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (!burger || !nav) return;

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  var mq = window.matchMedia('(min-width:1600px)');
  function handleMq() {
    if (mq.matches) {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  }
  mq.addEventListener ? mq.addEventListener('change', handleMq) : mq.addListener(handleMq);
});
