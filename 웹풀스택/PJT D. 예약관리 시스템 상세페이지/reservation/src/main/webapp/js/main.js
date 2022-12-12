const xhr = new XMLHttpRequest();

const [lstEventBox1, lstEventBox2] =
  document.querySelectorAll(".lst_event_box");

const moreBtn = document.querySelector(".more .btn");

function getPromotionsLength() {
  return document.querySelectorAll(".visual_img .item").length;
}

function generatePromotion(item) {
  const { productId, productImageId, description } = item;
  let promotion = document
    .querySelector("#promotionItem")
    .innerHTML.replace("{productId}", productId)
    .replace("{productImageId}", productImageId)
    .replace(/\{description\}/g, description);

  return promotion;
}

function loadPromotions() {
  const ul = document.querySelector(".visual_img");
  xhr.open("GET", "/reservation/api/promotions", false);
  xhr.onreadystatechange = function (event) {
    const { target } = event;
    if (target.readyState === XMLHttpRequest.DONE) {
      const { status } = target;
      if (status === 0 || (status >= 200 && status < 400)) {
        const { items } = JSON.parse(xhr.response);
        items.forEach((item) => {
          const promotion = generatePromotion(item);
          ul.innerHTML += promotion;
        });
      }
    }
  };
  xhr.send();
  let items = ul.querySelectorAll(".item");
  if (items.length != 0) {
    const lastItemClone = items[items.length - 1].cloneNode(true);
    ul.prepend(lastItemClone);
    const firstItemClone = items[0].cloneNode(true);
    ul.appendChild(firstItemClone);
  }
}

function displayinfosStateChange(event) {
  const { target } = event;
  if (target.readyState === XMLHttpRequest.DONE) {
    const { status } = target;
    if (status === 0 || (status >= 200 && status < 400)) {
      const { totalCount, products } = JSON.parse(xhr.response);
      products.forEach((product, i) => {
        const display = generateDisplay(product);
        if (i % 2 == 0) {
          lstEventBox1.innerHTML += display;
        } else {
          lstEventBox2.innerHTML += display;
        }
      });
      const pink = document.querySelector(".pink");
      pink.innerHTML = `${totalCount}개`;
      if (totalCount === getDisplayinfoLength()) {
        moreBtn.hidden = true;
      } else {
        moreBtn.hidden = false;
      }
    }
  }
}

function generateDisplay(product) {
  const { id, displayInfoId, description, placeName, content } = product;
  const display = document
    .querySelector("#itemList")
    .innerHTML.replace(/\{displayId\}/g, displayInfoId)
    .replace(/\{id\}/g, id)
    .replace(/\{description\}/g, description)
    .replace("{placeName}", placeName)
    .replace("{content}", content);
  return display;
}

function getDisplayinfoLength() {
  let nowDisplayinfos = [];
  lstEventBox1.querySelectorAll(".item").forEach((item) => {
    nowDisplayinfos.push(item);
  });
  lstEventBox2.querySelectorAll(".item").forEach((item) => {
    nowDisplayinfos.push(item);
  });
  return nowDisplayinfos.length;
}

function loadDisplayinfos() {
  lstEventBox1.innerHTML = "";
  lstEventBox2.innerHTML = "";
  const categoryData =
    document.querySelector(".anchor.active").parentNode.dataset.category;
  const url = new URL("api/displayinfos", location.href);
  if (categoryData != 0) {
    url.searchParams.set("categoryId", categoryData);
  }
  xhr.open("GET", url, false);
  xhr.onreadystatechange = displayinfosStateChange;
  xhr.send();
}

function moreHandler() {
  const categoryData =
    document.querySelector(".anchor.active").parentNode.dataset.category;

  const url = new URL("api/displayinfos", location.href);

  if (categoryData != 0) {
    url.searchParams.set("categoryId", categoryData);
  }
  url.searchParams.set("start", getDisplayinfoLength());

  xhr.open("GET", url, false);

  xhr.onreadystatechange = displayinfosStateChange;

  xhr.send();
}

let slide = 0;
let autoSlideFrame = 0;
let autoSlideSlideAcive = true;
let autoSlideTerm = 3 * 60;

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
      activeAnchor.className = "anchor";
      const anchor = item.querySelector("a");
      anchor.className = "anchor active";
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
    autoSlideFrame = 0;
    autoSlideSlideAcive = false;
  });
  visual.addEventListener("mouseout", function () {
    autoSlideSlideAcive = true;
  });

  function autoSlideCallback() {
    if (autoSlideSlideAcive) autoSlideFrame += 1;

    if (autoSlideFrame >= autoSlideTerm) {
      autoSlideFrame = 0;
      nextSlide();
    }
    requestAnimationFrame(autoSlideCallback);
  }

  requestAnimationFrame(autoSlideCallback);
}

main();
