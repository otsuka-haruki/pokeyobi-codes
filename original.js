'use strict';

// marker
$(window).scroll(function() {
  $('.marker-halfGreen').each(function() {
    const position = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll > position - windowHeight + 60) {
      $(this).addClass('is-active');
    }
  });
});

$(window).scroll(function() {
  $('.marker-halfRed').each(function() {
    const position = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll > position - windowHeight + 60) {
      $(this).addClass('is-active');
    }
  });
});

// loading animation (only on tablet and desktop)
// if (!navigator.userAgent.match(/(iPhone|iPod|Android)/)) {
//   setTimeout(() => {
//     const loadingContainer = document.getElementById('loading-container');
//     loadingContainer.classList.add('loaded');
//   }, 3000);
//
//   const loadingHTML = document.createElement('div');
//   loadingHTML.setAttribute('id', 'loading-container');
//   loadingHTML.innerHTML = `
//   <div class="half-circle-spinner">
//   <div class="circle circle-1"></div>
//   <div class="circle circle-2"></div>
//   </div>
//   <p>ようこそ！</p>
//   `;
//
//   const body = document.getElementsByTagName('body');
//   body[0].append(loadingHTML);
//
//   const loadingContainer = document.getElementById('loading-container');
//   loadingContainer.addEventListener('click', () => {
//     loadingContainer.classList.add('loaded');
//   })
//
//   window.onload = function() {
//     const loadingContainer = document.getElementById('loading-container');
//     loadingContainer.classList.add('loaded');
//   };
// }

// author card
const authorCard = document.getElementsByClassName('saboxplugin-wrap')[0];
if (authorCard == undefined) {
  console.log('編集者カードがない人の記事');
} else {
  const authorCardTitle = document.createElement('h4');
  authorCardTitle.setAttribute('id', 'author-card-title');
  authorCardTitle.textContent = 'この記事を書いた人';
  authorCard.querySelector('div').before(authorCardTitle);

  const articleOutline = document.getElementsByClassName('outline')[0];
  articleOutline.before(authorCard);
}

// user browser version note
const nvUA = navigator.userAgent;
if (nvUA.indexOf('Safari') != -1) {
  if (nvUA.indexOf('Chrome') == -1) {
    // not Chrome
    const cutSt = nvUA.indexOf('Version');
    const cutEd = nvUA.indexOf(' ', cutSt);
    const bwVer = nvUA.substring(cutSt + 8, cutEd);
    if (parseInt(bwVer) < 14) {
      // browser version too old to show Webp
      const toastVersionNote = document.createElement('div');
      toastVersionNote.innerHTML = `
      <p>お使いのSafariのバージョンが古いと、一部の画像が表示されないことがあります</p>
      `;
      setTimeout(() => {
        toastVersionNote.classList.add('toast', 'animate__fadeInUp', 'animate__animated');
        document.body.append(toastVersionNote);
      }, 1000);
      setTimeout(() => {
        toastVersionNote.classList.add('animate__slow', 'animate__animated', 'animate__fadeOut');
      }, 5000);
    }
  }
}

// progress-circle
const progressCircle = document.createElement('div');
progressCircle.classList.add('progress-wrap');
progressCircle.innerHTML = `
		<svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
			<path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
      <i class="fas fa-arrow-up" id="progress-wrap-arrow"></i>
		</svg>
`;
document.body.append(progressCircle);
(function($) {
  'use strict';
  $(document).ready(function() {
    const progressPath = document.querySelector('.progress-wrap path');
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    const updateProgress = function() {
      const scroll = $(window).scrollTop();
      const height = $(document).height() - $(window).height();
      const progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    }
    $(window).scroll(updateProgress);
    // toggle show / hide
    const offset = 50;
    const duration = 550;
    jQuery(window).on('scroll', function() {
      if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
      } else {
        jQuery('.progress-wrap').removeClass('active-progress');
      }
    });
    // back to top
    jQuery('.progress-wrap').on('click', function(event) {
      event.preventDefault();
      jQuery('html, body').animate({
        scrollTop: 0
      }, duration);
      return false;
    });
  });
})(jQuery);


// post icons
$('.dateList-main .icon-eye').prepend('<i class="fas fa-signal"></i>');
$('.dateList-main .icon-update').prepend('<i class="fas fa-pen-nib"></i>');

// pageview text color
const pageViewLi = $('.dateList-main .icon-eye').text();
const pageViewNumber = parseInt(pageViewLi);
if (pageViewNumber >= 1000) {
  $('.dateList-main .icon-eye').css('color', '#ff1744');
} else {
  $('.dateList-main .icon-eye').css('opacity', '0');
}