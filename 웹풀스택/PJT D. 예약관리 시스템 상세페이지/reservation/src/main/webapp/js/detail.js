class Util {
  addClass = function (element, classString) {
    element.className = element.className
      .split(" ")
      .filter(function (name) {
        return name !== classString;
      })
      .concat(classString)
      .join(" ");
  };
  removeClass = function (element, classString) {
    element.className = element.className
      .split(" ")
      .filter(function (name) {
        return name !== classString;
      })
      .join(" ");
  };
}

const util = new Util();

function loadComment(xhr, displayInfoId, productId) {
  xhr.open("GET", `/reservation/api/comments?productId=${productId}`, false);
  xhr.onreadystatechange = function (event) {
    const { target } = event;
    if (target.readyState === XMLHttpRequest.DONE) {
      const { status } = target;
      if (status === 0 || (status >= 200 && status < 400)) {
        const ul = document.querySelector(".list_short_review");
        let innerHTML = "";
        const { commentCount, reservationUserComments, avgScore, totalCount } =
          JSON.parse(xhr.response);
        const joinCount = document.querySelector(
          ".review_box .join_count .green"
        );
        joinCount.innerText = `${totalCount}건`;

        const gradeArea = document.querySelector(
          ".short_review_area .grade_area"
        );
        const graphValue = gradeArea.querySelector(".graph_mask .graph_value");
        const score = gradeArea.querySelector(".text_value span");
        score.innerText =
          avgScore % 1 === 0 ? `${avgScore}.0` : avgScore.toFixed(1);
        graphValue.style.width = `${avgScore * 20}%`;

        for (
          let commentIndex = 0;
          commentIndex < Math.min(3, reservationUserComments.length);
          commentIndex++
        ) {
          const userComment = reservationUserComments[commentIndex];

          let date = new Date(userComment.createDate);
          date = `${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate()}`;

          const data = {
            comment: userComment.comment,
            score:
              userComment.score % 1 === 0
                ? `${userComment.score}.0`
                : userComment.score.toFixed(1),
            email: userComment.email,
            date,
          };

          let template = null;
          if (userComment.reservationCommentImages.length === 0) {
            template = document.getElementById("commentItemNoImg").innerText;
          } else {
            template = document.getElementById("commentItem").innerText;
            data.imgName = userComment.reservationCommentImages[0].fileName;
          }

          const bindTemplate = Handlebars.compile(template);
          innerHTML += bindTemplate(data);
        }
        ul.innerHTML = innerHTML;

        const btnReviewMore = document.querySelector(".btn_review_more");
        btnReviewMore.href = `/reservation/review?displayInfoId=${displayInfoId}&productId=${productId}`;
      }
    }
  };
  xhr.send();
}

function generateProductImageItem(description, productImage) {
  const { saveFileName } = productImage;
  const data = { description, saveFileName };
  const template = document.querySelector("#productImageItem").innerText;
  const bindTemplate = Handlebars.compile(template);
  return bindTemplate(data);
}

function setDetailLocation(displayInfoImages, product) {
  const detailLocation = document.querySelector(".detail_location");
  const storeName = detailLocation.querySelector(".store_name");
  const storeMap = detailLocation.querySelector(".store_map");
  const storeAddrBold = document.querySelector(".store_addr_bold");
  const addrOldDetail = document.querySelector(".addr_old_detail");
  const storeTel = document.querySelector(".store_tel");
  const addrDetail = document.querySelector(".addr_detail");
  const { placeName, placeLot, placeStreet, tel } = product;
  const map = displayInfoImages[0];
  storeName.innerText = placeName;
  storeMap.src = `img/${map.fileName}`;
  storeAddrBold.innerText = placeLot;
  addrOldDetail.innerText = placeStreet;
  storeTel.href = `tel:${tel}`;
  storeTel.innerText = tel;
  addrDetail.innerText = placeName;
}

function load(xhr, displayInfoId) {
  const visual = document.querySelector(".section_visual");
  const visualUL = visual.querySelector(".visual_img.detail_swipe");

  const prevBtn = visual.querySelector(
    ".group_visual .prev .prev_inn .btn_prev"
  );
  const prevBtnIcon = prevBtn.querySelector("i");
  const nextBtn = visual.querySelector(".group_visual .nxt .nxt_inn .btn_nxt");
  const nextBtnIcon = nextBtn.querySelector("i");
  xhr.open("GET", `/reservation/api/products/${displayInfoId}`, false);

  xhr.onreadystatechange = function (event) {
    const { target } = event;
    if (target.readyState === XMLHttpRequest.DONE) {
      const { status } = target;
      if (status === 0 || (status >= 200 && status < 400)) {
        const { product, productImages, displayInfoImages } = JSON.parse(
          xhr.response
        );
        const { description, content } = product;
        let mainProductImage = null;
        let etcProductImage = null;
        visualUL.innerHTML = "";

        for (const productImage of productImages) {
          if (mainProductImage != null && etcProductImage != null) break;
          const { type } = productImage;
          if (type === "ma")
            mainProductImage = generateProductImageItem(
              description,
              productImage
            );
          else if (type === "et")
            etcProductImage = generateProductImageItem(
              description,
              productImage
            );
        }
        const figurePaginationLimit = document.querySelector(
          ".figure_pagination .num.off span"
        );
        figurePaginationLimit.innerText = "1";
        visualUL.innerHTML += mainProductImage;
        prevBtn.className = "blind";
        nextBtn.className = "blind";
        if (etcProductImage != null) {
          figurePaginationLimit.innerText = "2";
          visualUL.innerHTML += etcProductImage;
          prevBtn.className = "btn_prev";
          prevBtnIcon.className += " off";
          nextBtn.className = "btn_nxt";
        }

        const storeDetailDsc = document.querySelector(".store_details .dsc");
        storeDetailDsc.innerText = content;

        loadComment(xhr, displayInfoId, product.id);

        const inDsc = document.querySelector(".detail_info_group .in_dsc");
        inDsc.innerText = content;

        setDetailLocation(displayInfoImages, product);
      }
    }
  };

  xhr.send();

  const figurePaginationNum = visual.querySelector(".figure_pagination .num");
  const visualItems = visualUL.querySelectorAll(".item");

  visual.addEventListener("click", (e) => {
    if (e.target.className === "btn_nxt") {
      figurePaginationNum.innerText = "2";
      visualItems.forEach((visualItem) => {
        visualItem.style.transform = "translate(-100%, 0)";
        visualItem.style.transition = "transform 300ms";
      });
      prevBtnIcon.className = "spr_book2 ico_arr6_lt";
      nextBtnIcon.className = "spr_book2 ico_arr6_rt blind";
    } else if (e.target.className === "btn_prev") {
      figurePaginationNum.innerText = "1";
      visualItems.forEach((visualItem) => {
        visualItem.style.transform = "translate(0%, 0)";
      });
      prevBtnIcon.className += "spr_book2 ico_arr6_lt off";
      nextBtnIcon.className = "spr_book2 ico_arr6_rt";
    }
  });
}

function clearActive() {
  const actives = document.querySelectorAll(".info_tab_lst .active");
  actives.forEach((active) => {
    util.removeClass(active, "active");
  });
}

function clearHide(node) {
  const classList = node.className.split(" ");
  return classList.filter((classItem) => classItem !== "hide").join(" ");
}

function infoTabLstEventHandler(e) {
  e.preventDefault();
  let target = e.target;
  if (target.parentNode.tagName != "A") {
    target = target.parentNode;
  }
  if (target.tagName == "A") {
    clearActive();
    target.className += " active";
    const parentNode = target.parentNode;
    parentNode.className += " active";
    const classList = parentNode.className.split(" ");
    const detailAreaWrap = document.querySelector(".detail_area_wrap");
    const detailLocation = document.querySelector(".detail_location");
    detailAreaWrap.className = clearHide(detailAreaWrap);
    detailLocation.className = clearHide(detailLocation);
    if (classList.includes("_detail")) {
      detailLocation.className += " hide";
    } else {
      detailAreaWrap.className += " hide";
    }
  }
}

function main() {
  const xhr = new XMLHttpRequest();
  const url = new URL(document.location.href);
  const displayInfoId = url.searchParams.get("id");
  load(xhr, displayInfoId);
  const infoTabLst = document.querySelector(".info_tab_lst");

  infoTabLst.addEventListener("click", infoTabLstEventHandler);
  $(".bk_more._open").click(function (e) {
    $(".store_details").toggleClass("close3");
    $(this).css("display", "none");
    $(".bk_more._close").css("display", "block");
  });
  $(".bk_more._close").click(function (e) {
    $(".store_details").toggleClass("close3");
    $(this).css("display", "none");
    $(".bk_more._open").css("display", "block");
  });
}

main();
