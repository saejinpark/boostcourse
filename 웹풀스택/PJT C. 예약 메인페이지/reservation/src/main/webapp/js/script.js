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
  console.log(displayInfoId)
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
