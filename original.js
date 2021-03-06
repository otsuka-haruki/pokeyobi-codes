'use strict';

// marker
const windowHeight = window.innerHeight;
const targetHeight = windowHeight * 0.55;

$(window).scroll(function() {
  $('.marker-halfGreen').each(function() {
    const position = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll > position - windowHeight + +targetHeight) {
      $(this).addClass('is-active');
    }
  });
});

$(window).scroll(function() {
  $('.marker-halfRed').each(function() {
    const position = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll > position - windowHeight + +targetHeight) {
      $(this).addClass('is-active');
    }
  });
});

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
{/*  */}

const progressCircle = document.createElement('div');
progressCircle.classList.add('progress-wrap');
progressCircle.innerHTML = `
		<svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
			<path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
		</svg>
    <p id="progress-wrap-percentage"></p>
    <i class="fas fa-arrow-up fade-out" id="progress-wrap-arrow"></i>
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
    const percentagePTag = progressCircle.querySelector('#progress-wrap-percentage');
    const updateProgress = function() {
      const scroll = $(window).scrollTop();
      const height = $(document).height() - $(window).height();
      const progress = pathLength - (scroll * pathLength / height);
      const percentageNumber = parseInt(scroll * 100 / height);
      percentagePTag.textContent = `${percentageNumber}%`;
      if (percentageNumber < 10) {
        percentagePTag.style.right = '12px';
      } else {
        percentagePTag.style.right = '9px';
      }
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
    // toggle arrow / percentage
    const toggleArrowAndPercentageTesting = function() {
      const percentagePTag = progressCircle.querySelector('#progress-wrap-percentage');
      if (progressCircle.querySelector('i').classList.contains('fade-in')) {
        progressCircle.querySelector('i').classList.remove('fade-in');
        progressCircle.querySelector('i').classList.add('fade-out');
        percentagePTag.classList.remove('fade-out');
        percentagePTag.classList.add('fade-in');
      } else {
        progressCircle.querySelector('i').classList.remove('fade-out');
        progressCircle.querySelector('i').classList.add('fade-in');
        percentagePTag.classList.remove('fade-in');
        percentagePTag.classList.add('fade-out');
      }
    }
    const setIntervalOfTogglingArrowAndPercentage = setInterval(toggleArrowAndPercentageTesting, 7000);
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

// expand images to 100vw
const postContent = document.getElementsByClassName('postContents')[0];
if (postContent != undefined) {
  const targetImages = postContent.querySelectorAll('img');
  for (const image of targetImages) {
    if (image.classList.contains('size-large')) {
      image.classList.remove('size-large');
      image.classList.add('size-full');
    }
  }
}

// contact form paperplane icon
const pathName = location.pathname;
if (pathName == '/contact') {
  const formButton = document.getElementsByClassName('btn__link-primary')[0];
  const paperPlaneIcon = document.createElement('i');
  paperPlaneIcon.classList.add('fas', 'fa-paper-plane');
  formButton.append(paperPlaneIcon);
  formButton.addEventListener('mouseenter', () => {
    paperPlaneIcon.classList.add('paper-plane-rotate');
  });
  formButton.addEventListener('mouseleave', () => {
    paperPlaneIcon.classList.remove('paper-plane-rotate');
  });
  formButton.addEventListener('click', () => {
    paperPlaneIcon.classList.add('paper-plane-fly');
  });
}

// contact form prevent sending mail from certain addresses
if (pathName == '/contact') {
  const textInputs = document.getElementsByClassName('contactTable')[0].querySelector('tbody').querySelectorAll('tr');
  const mailAddressInput = textInputs[1].querySelector('td input');
  const formButton = document.getElementsByClassName('btn__link-primary')[0];
  formButton.addEventListener('click', (event) => {
    const mailAddress = mailAddressInput.value;
    if (mailAddress.includes('@rediffmail')) {
      event.preventDefault();
      alert('このメールアドレスからはメールを送信できません。');
      location.reload();
    }
  });
}
