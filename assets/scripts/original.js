"use strict";

// no error could occur

// marker animation
(function () {
  const windowHeight = window.innerHeight;
  const targetHeight = windowHeight * 0.65;

  $(window).scroll(function () {
    $(".marker-halfGreen").each(function () {
      const position = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > position - windowHeight + +targetHeight) {
        $(this).addClass("is-active");
      }
    });
  });

  $(window).scroll(function () {
    $(".marker-halfRed").each(function () {
      const position = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > position - windowHeight + +targetHeight) {
        $(this).addClass("is-active");
      }
    });
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
  const pageViewNumber = parseInt(pageViewLi);
  if (pageViewNumber >= 1000) {
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

    // contact form prevent sending mail from certain addresses
    const textInputs = document
      .getElementsByClassName("contactTable")[0]
      .querySelector("tbody")
      .querySelectorAll("tr");
    const mailAddressInput = textInputs[1].querySelector("td input");
    formButton.addEventListener("click", (event) => {
      const mailAddress = mailAddressInput.value;
      if (mailAddress.includes("@rediffmail")) {
        event.preventDefault();
        alert("このメールアドレスからはメールを送信できません。");
        location.reload();
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

// errors may occur 
// error handling needed
