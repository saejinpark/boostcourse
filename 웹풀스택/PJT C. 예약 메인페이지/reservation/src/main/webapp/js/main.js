let slide = 0;
let autoSlideTime = 0;
let autoslideSlideAcive = true;

function slideBtnActive() {
  const prev = document.querySelector(".prev_e");
  const next = document.querySelector(".nxt_e");
  const lastIndex = getPromotionsLength();
  if (lastIndex < 2) {
    prev.hidden = true;
    next.hidden = true;
  } else {
    if (slide === 0) {
      prev.hidden = true;
    } else {
      prev.hidden = false;
    }
    if (slide > lastIndex - 4) {
      next.hidden = true;
    } else {
      next.hidden = false;
    }
    const promotionItems = document.querySelectorAll(".visual_img .item");
    promotionItems.forEach((item) => {
      item.style.transition = "transform 300ms";
      item.style.transform = `translateX(-${(1 + slide) * 100}%)`;
      setTimeout(function () {
        item.style.transition = "transform 0ms";
      }, 300);
    });
  }
}
function resetSlide() {
  const promotionItems = document.querySelectorAll(".visual_img .item");
  promotionItems.forEach((item) => {
    item.style.transform = `translate(0%, 0%)`;
  });
}

function prevSlide() {
  slide -= 1;
  slideBtnActive();
}

function nextSlide() {
  slide += 1;
  if (slide > getPromotionsLength() - 3) {
    slide = 0;
    resetSlide();
    setTimeout(() => {
      slideBtnActive();
    }, 1);
  } else {
    slideBtnActive();
  }
}

function main() {
  loadPromotions();
  loadDisplayinfos();
  moreBtn.addEventListener("click", moreHandler);
  const tabList = document.querySelectorAll(".event_tab_lst .item");
  tabList.forEach((item) => {
    item.addEventListener("click", function () {
      const activeAnchor = document.querySelector(
        ".event_tab_lst .item .anchor.active"
      );
      activeAnchor.classList.remove("active");
      const anchor = item.querySelector("a");
      anchor.classList.add("active");
      loadDisplayinfos();
    });
  });
  slideBtnActive();
  const prev = document.querySelector(".prev_e");
  const next = document.querySelector(".nxt_e");
  prev.addEventListener("click", prevSlide);
  next.addEventListener("click", nextSlide);
  const visual = document.querySelector(".container_visual");
  visual.addEventListener("mouseover", function () {
    autoSlideTime = 0;
    autoslideSlideAcive = false;
  });
  visual.addEventListener("mouseout", function () {
    autoslideSlideAcive = true;
  });
  setInterval(function () {
	if(autoslideSlideAcive){
    	autoSlideTime += 1;
	}
    if (autoSlideTime == 11) {
      autoSlideTime = 0;
      nextSlide();
    }
  }, 300);
}

main();
