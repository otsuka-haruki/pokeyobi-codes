"use strict";

// no error could occur

// marker animation
(function () {
  const markerGreen = document.getElementsByClassName('marker-halfGreen');
  const markerRed = document.getElementsByClassName('marker-halfRed');
  let hasScrolled = false;
  window.addEventListener('scroll', () => {
    if (hasScrolled == true) {
      return;
    }
    for (const element of markerGreen) {
      element.classList.add('is-active');
    }
    for (const element of markerRed) {
      element.classList.add('is-active');
    }
    hasScrolled == true;
  });
})();

// user browser version note
(function () {
  const nvUA = navigator.userAgent;
  if (nvUA.indexOf("msie") != -1 || nvUA.indexOf("trident") != -1) {
    // user browser is IE
    // IE does not support Webp
    const toastVersionNote = document.createElement("div");
    toastVersionNote.innerHTML = `
      <p>Internet Explorerをご使用の場合、一部の画像が表示されないことがあります</p>
      `;
    setTimeout(() => {
      toastVersionNote.classList.add(
        "toast",
        "animate__fadeInUp",
        "animate__animated"
      );
      document.body.append(toastVersionNote);
    }, 1000);
    setTimeout(() => {
      toastVersionNote.classList.add(
        "animate__slow",
        "animate__animated",
        "animate__fadeOut"
      );
    }, 5000);
  }
  else if (nvUA.indexOf("Safari") != -1) {
    if (nvUA.indexOf("Chrome") == -1) {
      // user browser is Safari
      const cutSt = nvUA.indexOf("Version");
      const cutEd = nvUA.indexOf(" ", cutSt);
      const bwVer = nvUA.substring(cutSt + 8, cutEd);
      if (parseInt(bwVer) < 14) {
        // browser version is too old to show Webp
        const toastVersionNote = document.createElement("div");
        toastVersionNote.innerHTML = `
      <p>お使いのSafariのバージョンが古いと、一部の画像が表示されないことがあります</p>
      `;
        setTimeout(() => {
          toastVersionNote.classList.add(
            "toast",
            "animate__fadeInUp",
            "animate__animated"
          );
          document.body.append(toastVersionNote);
        }, 1000);
        setTimeout(() => {
          toastVersionNote.classList.add(
            "animate__slow",
            "animate__animated",
            "animate__fadeOut"
          );
        }, 5000);
      }
    }
  }
})();

// progress-circle
const progressCircle = document.createElement("div");
progressCircle.classList.add("progress-wrap");
progressCircle.innerHTML = `
		<svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
			<path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
		</svg>
    <p id="progress-wrap-percentage"></p>
    <i class="fas fa-arrow-up fade-out" id="progress-wrap-arrow"></i>
`;
document.body.append(progressCircle);
(function ($) {
  "use strict";
  $(document).ready(function () {
    const progressPath = document.querySelector(".progress-wrap path");
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    const percentagePTag = progressCircle.querySelector(
      "#progress-wrap-percentage"
    );
    const updateProgress = function () {
      const scroll = $(window).scrollTop();
      const height = $(document).height() - $(window).height();
      const progress = pathLength - (scroll * pathLength) / height;
      let percentageNumber = parseInt((scroll * 100) / height);
      if (percentageNumber < 0) {
        percentageNumber = 0;
      } else if (percentageNumber > 100) {
        percentageNumber = 100;
      }
      percentagePTag.textContent = `${percentageNumber}%`;
      if (percentageNumber < 10) {
        percentagePTag.style.right = "12px";
      } else if (percentageNumber < 100) {
        percentagePTag.style.right = "8px";
      } else {
        percentagePTag.style.right = "4px";
      }
      progressPath.style.strokeDashoffset = progress;
    };
    $(window).scroll(updateProgress);
    // toggle show / hide
    const offset = 50;
    const duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    // toggle arrow / percentage
    const toggleArrowAndPercentageTesting = function () {
      const percentagePTag = progressCircle.querySelector(
        "#progress-wrap-percentage"
      );
      if (progressCircle.querySelector("i").classList.contains("fade-in")) {
        progressCircle.querySelector("i").classList.remove("fade-in");
        progressCircle.querySelector("i").classList.add("fade-out");
        percentagePTag.classList.remove("fade-out");
        percentagePTag.classList.add("fade-in");
      } else {
        progressCircle.querySelector("i").classList.remove("fade-out");
        progressCircle.querySelector("i").classList.add("fade-in");
        percentagePTag.classList.remove("fade-in");
        percentagePTag.classList.add("fade-out");
      }
    };
    setInterval(toggleArrowAndPercentageTesting, 5000);
    // back to top
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate(
        {
          scrollTop: 0,
        },
        duration
      );
      return false;
    });
  });
})(jQuery);

// post icons
(function () {
  $(".dateList-main .icon-update").prepend('<i class="fas fa-pen-nib"></i>');
})();

// pageview text color and plural form
(function () {
  const pageViewLi = $(".dateList-main .icon-eye").text();
  let pageViewNumber = parseInt(pageViewLi);
  if (pageViewNumber >= 1000) {
    if (pageViewNumber >= 10000) {
      const thousands = parseInt(pageViewNumber / 1000);
      let rest = pageViewNumber - thousands * 1000;
      rest = ('00' + rest).slice(-3);
      pageViewNumber = `${thousands},${rest}`;
    }
    $(".dateList-main .icon-eye").css("color", "#ff1744");
    $(".dateList-main .icon-eye").html(`<i class="fas fa-signal"></i>${pageViewNumber}views`);
  } else {
    $(".dateList-main .icon-eye").css("opacity", "0");
  }
})();


// contact form page
(function () {
  const pathName = location.pathname;
  if (pathName == "/contact" || pathName == "/advertisement") {
    const formButton = document.getElementsByClassName("btn__link-primary")[0];
    const paperPlaneIcon = document.createElement("i");
    paperPlaneIcon.classList.add("fas", "fa-paper-plane");
    formButton.append(paperPlaneIcon);
    formButton.addEventListener("mouseenter", () => {
      paperPlaneIcon.classList.add("paper-plane-rotate");
    });
    formButton.addEventListener("mouseleave", () => {
      paperPlaneIcon.classList.remove("paper-plane-rotate");
    });
    formButton.addEventListener("click", () => {
      paperPlaneIcon.classList.add("paper-plane-fly");
    });

    // block spam mail
    const textInputs = document
      .getElementsByClassName("contactTable")[0]
      .querySelector("tbody")
      .querySelectorAll("tr");
    const mailAddressInput = textInputs[1].querySelector("td input");
    const contactContentInput = textInputs[3].querySelector("td textarea");
    formButton.addEventListener("click", (event) => {
      const mailAddress = mailAddressInput.value;
      if (mailAddress.includes("@rediffmail")) {
        event.preventDefault();
        alert("このメールアドレスからはメールを送信できません。");
        location.reload();
      }
      let contactContent = contactContentInput.value;
      const wordsBlacklist = ['営業', '仮想通貨', '助成金', '未公開', 'ビジネスパートナー', '集客', 'ノウハウ', '先着', '銀行口座', 'チームD', '登録', 'check', 'before'];
      let hasBlacklistWord = false;
      wordsBlacklist.forEach(word => {
        if (contactContent.includes(word)) {
          hasBlacklistWord = true;
        }
      });
      if (contactContent.includes("Don't buy traffic") || hasBlacklistWord) {
        event.preventDefault();
        let sentCount = localStorage.getItem('sent-count');
        if (sentCount == null) {
          sentCount = 0;
        }
        sentCount++;
        localStorage.setItem('sent-count', sentCount);
        const coverDivTag = document.createElement('div');
        coverDivTag.innerHTML = `
          <div class="lds-hourglass"></div>
          <p class="contact-form-loading-message">Please wait...</p>
        `;
        coverDivTag.classList.add('contact-form-cover');
        document.body.append(coverDivTag);
      }
    });

    // change texts
    if (pathName == "/contact") {
      const pageTitle = document.getElementsByClassName("heading-primary")[0];
      const formContentTitle = textInputs[3].querySelector("th");
      pageTitle.textContent = "お問い合わせ・ご意見・メッセージ";
      formContentTitle.innerHTML =
        "お問い合わせ・ご意見の内容<span class='required'>必須</span>";
    } else if (pathName == "/advertisement") {
      const formName = textInputs[0].querySelector('th');
      formName.innerHTML =
        "企業様・担当者様のお名前<span class='required'>必須</span>";
      const formContentTitle = textInputs[3].querySelector("th");
      formContentTitle.innerHTML =
        "ご依頼の広告の詳細<span class='required'>必須</span>";
    }
  }
})();

// word balloon
(function () {
  // add border to images
  const wordBalloonLeftContainer = document.getElementsByClassName("w_b_ava_L");
  const wordBalloonRightContainer = document.getElementsByClassName("w_b_ava_R");
  for (const element of wordBalloonLeftContainer) {
    const target = element.querySelector("img").parentElement;
    target.classList.add("w_b_border_L");
  }
  for (const element of wordBalloonRightContainer) {
    const target = element.querySelector("img").parentElement;
    target.classList.add("w_b_border_R");
  }
})();

// expand images to 100vw
(function () {
  const postContent = document.getElementsByClassName("postContents")[0];
  if (postContent != undefined) {
    const targetImages = postContent.querySelectorAll("img");
    for (const image of targetImages) {
      if (image.classList.contains("size-large")) {
        image.classList.remove("size-large");
        image.classList.add("size-full");
      } else if (image.parentElement.tagName == "P") {
        image.classList.add("size-full");
      }
    }
  }
})();

// appending outline
(function () {
  const postContents = document.getElementsByClassName("postContents")[0];
  const widgetSticky = document.getElementsByClassName("widgetSticky")[0];
  let stickyOutlineContainer;
  if (widgetSticky != undefined) {
    stickyOutlineContainer = widgetSticky.querySelector("aside");
  }
  if (postContents == undefined) {
    stickyOutlineContainer.remove();
    return;
  }
  const headingTwoTags = postContents.querySelectorAll("h2");
  const outline = document.createElement("div");
  outline.classList.add("post-outline");
  const outlineUl = document.createElement("ul");
  for (let i = 0; i < headingTwoTags.length; i++) {
    headingTwoTags[i].setAttribute('id', `outline-${i}`);
    const outlineList = document.createElement('li');
    const outlineAtag = document.createElement("a");
    outlineAtag.setAttribute("href", `#outline-${i}`);
    outlineAtag.textContent = headingTwoTags[i].textContent;
    outlineList.append(outlineAtag);
    outlineUl.append(outlineList);
  }
  outline.append(outlineUl);

  const windowPixels = window.innerWidth;
  if (+windowPixels < 991) {
    // smartphone or tablet
    outline.classList.add("post-outline--smartphone");
    const outlineTitle = document.createElement('h3');
    outlineTitle.textContent = '目次';
    outlineTitle.classList.add('post-outline--smartphone__title');
    outline.prepend(outlineTitle);
    if (stickyOutlineContainer != undefined) {
      stickyOutlineContainer.remove();
    }
    const previousElementSiblingOfFirstHeadingTwo = headingTwoTags[0].previousElementSibling;
    if (previousElementSiblingOfFirstHeadingTwo.classList.contains('adPost')) {
      previousElementSiblingOfFirstHeadingTwo.before(outline);
    } else {
      previousElementSiblingOfFirstHeadingTwo.after(outline);
    }
  } else {
    // pc
    if (stickyOutlineContainer == undefined) {
      return;
    }
    stickyOutlineContainer.append(outline);
    outline.classList.add("post-outline--pc");
    const headingTwoIdArray = [];
    $(window).scroll(function () {
      $(".postContents h2").each(function () {
        const position = $(this).offset().top;
        const scroll = $(window).scrollTop();
        const windowHeight = window.innerHeight;
        const offsetFromTopInPixel = windowHeight * 0.2;
        if (scroll > position - offsetFromTopInPixel) {
          // entered
          headingTwoIdArray.push($(this).attr('id'));
        }
      });
      const length = +headingTwoIdArray.length;
      const targetH2 = headingTwoIdArray[length - 1];
      const outlineLists = outlineUl.querySelectorAll('li');
      for (let i = 0; i < headingTwoTags.length; i++) {
        if (headingTwoTags[i].id == targetH2) {
          outlineLists[i].classList.add('outline-list-active');
        } else {
          outlineLists[i].classList.remove('outline-list-active');
        }
      }
    });
  }
})();

// author card
(function () {
  const authorCard = document.getElementsByClassName("saboxplugin-wrap")[0];
  if (authorCard == undefined) {
    return
  } else {
    const authorCardTitle = document.createElement("h4");
    authorCardTitle.setAttribute("id", "author-card-title");
    authorCardTitle.textContent = "この記事を書いた人";
    authorCard.querySelector("div").before(authorCardTitle);

    const postOutlineSmartphone = document.getElementsByClassName("post-outline--smartphone")[0];
    if (postOutlineSmartphone != undefined) {
      // smartphone
      postOutlineSmartphone.before(authorCard);
    } else {
      // pc
      const postContents = document.getElementsByClassName("postContents")[0];
      const headingTwoTags = postContents.querySelectorAll("h2");
      const previousElementSiblingOfFirstHeadingTwo = headingTwoTags[0].previousElementSibling;
      if (previousElementSiblingOfFirstHeadingTwo.classList.contains('adPost')) {
        previousElementSiblingOfFirstHeadingTwo.before(authorCard);
      } else {
        previousElementSiblingOfFirstHeadingTwo.after(authorCard);
      }
    }
  }
})();

// remove invalid amazon affiliate links
(function () {
  const imageElements = document.getElementsByTagName('img');
  for (let i = 0; i < imageElements.length; i++) {
    if (imageElements[i].src.includes('ir-jp.amazon')) {
      imageElements[i].remove();
    }
  }
})();

// remove text-decoration attribute from span tag that has a tag with amazon link
(function () {
  const spanTags = document.getElementsByTagName('span');
  for (const element of spanTags) {
    const children = element.children;
    for (const child of children) {
      const hrefAttribute = String(child.getAttribute('href'));
      if (hrefAttribute.includes('amzn.to')) {
        element.removeAttribute('style');
      }
    }
  }
})();

// errors can occur 
// error handling needed