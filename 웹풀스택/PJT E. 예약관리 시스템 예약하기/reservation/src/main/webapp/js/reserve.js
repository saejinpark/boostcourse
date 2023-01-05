const PRICE_TYPE_OTHER = {
  A: { order: 1, name: "성인" },
  Y: { order: 2, name: "청소년" },
  B: { order: 3, name: "유아" },
  S: { order: 4, name: "셋트" },
  D: { order: 5, name: "장애인" },
  C: { order: 6, name: "지역주민" },
  E: { order: 7, name: "어얼리버드" },
  V: { order: 8, name: "VIP" },
  R: { order: 9, name: "R석" },
};

const WEEK_DAY = ["일", "월", "화", "수", "목", "금", "토"];

let now = new Date();
const oneDayTime = 1000 * 60 * 60 * 24;
let totalCount = 0;
let displayInfo = null;

const classUtil = {
  addClass: function (elem, classString) {
    elem.className = elem.className
      .split(" ")
      .filter((name) => name != classString)
      .concat(classString)
      .join(" ");
  },

  removeClass: function (elem, classString) {
    elem.className = elem.className
      .split(" ")
      .filter((name) => name != classString)
      .join(" ");
  },

  toggleClass: function (elem, classString) {
    elem.className.includes(classString)
      ? this.removeClass(elem, classString)
      : this.addClass(elem, classString);
  },
};

function ticketMinusHandler(ticket, elems) {
  if (ticket.count === 0) return 0;
  const { minus, countControlInput, plus, totalPrice } = elems;
  ticket.count--;
  totalCount--;
  setBookingDetail();
  if (ticket.count === 0) {
    classUtil.addClass(minus, "disabled");
    classUtil.addClass(countControlInput, "disabled");
  }
  countControlInput.value = ticket.count;
  totalPrice.textContent = ticket.count * ticket.discountedPrice;
}

function ticketPlusHandler(ticket, elems) {
  const { minus, countControlInput, plus, totalPrice } = elems;
  if (ticket.count === 0) {
    classUtil.removeClass(minus, "disabled");
    classUtil.removeClass(countControlInput, "disabled");
  }
  ticket.count++;
  totalCount++;
  setBookingDetail();
  countControlInput.value = ticket.count;
  totalPrice.textContent = ticket.count * ticket.discountedPrice;
}

class Ticket {
  constructor(productPrice, discountedPrice, elem) {
    this.productPrice = productPrice;
    this.discountedPrice = discountedPrice;
    this.count = 0;

    const countControl = elem.querySelector(".count_control");
    const ticketElems = {
      minus: countControl.querySelector(".ico_minus3"),
      countControlInput: countControl.querySelector(".count_control_input"),
      plus: countControl.querySelector(".ico_plus3"),
      totalPrice: countControl.querySelector(".total_price"),
    };

    const temp = this;

    ticketElems.minus.addEventListener("click", function () {
      ticketMinusHandler(temp, ticketElems);
    });

    ticketElems.plus.addEventListener("click", function () {
      ticketPlusHandler(temp, ticketElems);
    });
  }

  getProductPrice() {
    return this.productPrice;
  }

  getCount() {
    return this.count;
  }
}

const tickets = [];

const imageThumb = document.querySelector(".img_thumb");
const previewTxt = document.querySelector(".preview_txt");
const previewTxtTitle = previewTxt.querySelector(".preview_txt_tit");
const previewTxtDescriptions = previewTxt.querySelectorAll(".preview_txt_dsc");
const previewTxtPrice = previewTxtDescriptions[0];
const previewTxtPeriod = previewTxtDescriptions[1];
const sectionStoreDetails = document.querySelector(".section_store_details");
const ticketBody = document.querySelector(".ticket_body");
let ticketQueries = null;
const sectionBookingAgreement = document.querySelector(
  ".section_booking_agreement"
);
const btnAgreements =
  sectionBookingAgreement.querySelectorAll(".btn_agreement");
const checkAgree = sectionBookingAgreement.querySelector(".chk_agree");
const bookingBtnWrap = document.querySelector(".bk_btn_wrap");
const bookingBtn = bookingBtnWrap.querySelector(".bk_btn");
const bookingFormWrap = document.querySelector(".booking_form_wrap");
const bookingForm = bookingFormWrap.querySelector(".form_horizontal");
const bookingDetail = bookingForm.querySelector(
  ".inline_form.last .inline_txt"
);

function setBookingDetail() {
  bookingDetail.innerHTML = `${formatDate(
    new Date(bookingDate),
    false
  )}, 총 <span id="totalCount">${totalCount}</span>매`;
}

function generateFareText(productPrices) {
  let fareText = "";
  for (const productPrice of productPrices) {
    const discountedPrice =
      (productPrice.price / 100) * (100 - productPrice.discountRate);
    const typeName = productPrice.priceTypeName;
    switch (typeName) {
      case "A":
        fareText += `성인(만 19~64세) ${discountedPrice}원<br />`;
        break;
      case "Y":
        fareText += `청소년(만 13~18세) ${discountedPrice}원<br />`;
        break;
      case "B":
        fareText += `어린이(만 4~12세) ${discountedPrice}원<br />`;
        break;
      case "S":
        fareText += `20인 이상 단체 ${productPrice.discountRate}% 할인<br />`;
        break;
      case "D":
        fareText += `국가유공자, 장애인, 65세 이상 ${discountedPrice}원<br />`;
        break;
      case "C":
        fareText += `지역주민 ${discountedPrice}원<br />`;
        break;
      case "E":
        fareText += `어얼리버드 ${discountedPrice}원<br />`;
        break;
    }
  }
  return fareText;
}

function generateDiscountedPrice(price, discountRate) {
  return (price / 100) * (100 - discountRate);
}

function formatDate(date, addDay) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}${
    addDay ? ".(" + WEEK_DAY[date.getDay()] + ")" : ""
  }`;
}

function load(xhr, id) {
  xhr.open("GET", `api/products/${id}`, false);
  xhr.onreadystatechange = function (event) {
    const { target } = event;
    if (target.readyState === XMLHttpRequest.DONE) {
      const { status } = target;
      if (status === 0 || (status >= 200 && status < 400)) {
        displayInfo = JSON.parse(xhr.response);
        let { product, productImages, productPrices } = displayInfo;

        productPrices = productPrices.sort(
          (a, b) =>
            PRICE_TYPE_OTHER[a.priceTypeName].order -
            PRICE_TYPE_OTHER[b.priceTypeName].order
        );
        const { description, openingHours, placeName } = product;

        let mainImage = null;
        for (const productImage of productImages) {
          if (productImage.type === "ma") {
            mainImage = productImage;
            break;
          }
        }
        if (mainImage !== null) {
          imageThumb.src = mainImage.saveFileName;
        }

        let minPrice = null;
        let maxPrice = null;
        for (const productPrice of productPrices) {
          const discountedPrice = generateDiscountedPrice(
            productPrice.price,
            productPrice.discountRate
          );

          if (minPrice === null) {
            minPrice = discountedPrice;
            maxPrice = discountedPrice;
            continue;
          }
          if (discountedPrice < minPrice) {
            minPrice = discountedPrice;
          }
          if (discountedPrice > maxPrice) {
            maxPrice = discountedPrice;
          }
        }

        previewTxtTitle.textContent = description;
        previewTxtPrice.textContent = `관람료: ${minPrice + "원" || ""} ~ ${
          maxPrice + "원" || ""
        }`;
        previewTxtPeriod.innerHTML = `<br />기간: ${formatDate(
          new Date(now.getTime() + oneDayTime),
          true
        )} ~ ${formatDate(new Date(now.getTime() + oneDayTime * 5), true)}`;
        const ticketQueryTemplate = Handlebars.compile(
          document.getElementById("rv-ticket-qty").innerText
        );

        let ticketBodyInner = "";

        for (const productPrice of productPrices) {
          const discountedPrice = generateDiscountedPrice(
            productPrice.price,
            productPrice.discountRate
          );
          ticketBodyInner += ticketQueryTemplate({
            type: PRICE_TYPE_OTHER[productPrice.priceTypeName].name,
            price: productPrice.price,
            discountedPrice:
              discountedPrice +
              `${
                productPrice.discountRate
                  ? "(" + productPrice.discountRate + "% 할인)"
                  : ""
              }`,
          });
        }
        ticketBody.innerHTML = ticketBodyInner;

        ticketQueries = ticketBody.querySelectorAll(".qty");
        ticketQueries.forEach((ticketQueryElem, i) => {
          tickets.push(
            new Ticket(
              productPrices[i],
              generateDiscountedPrice(
                productPrices[i].price,
                productPrices[i].discountRate
              ),
              ticketQueryElem
            )
          );
        });

        let [placeAndPeriod, opening, fare] =
          sectionStoreDetails.querySelectorAll(".dsc");
        placeAndPeriod.innerHTML = `장소: ${placeName}<br />기간: ${formatDate(
          new Date(now.getTime() + oneDayTime),
          true
        )} ~ ${formatDate(new Date(now.getTime() + oneDayTime * 5), true)}`;
        opening.textContent = openingHours;
        fare.innerHTML = generateFareText(productPrices);
      }
    }
  };
  xhr.send();
}

function markChecker(elem) {
  elem.setCustomValidity("");
  const label = document.querySelector(`#bookingForm label[for='${elem.id}']`);
  const icoNessasary = label.querySelector(".ico_nessasary");
  if (elem.checkValidity()) {
    icoNessasary.style.backgroundPosition = "-161px -52px";
    return 1;
  }
  icoNessasary.style.backgroundPosition = "-196px -52px";
  return 0;
}

function bookingFormCheck() {
  const { name, tel, email } = bookingForm.elements;
  if (bookingBtnWrap.className.includes("disable")) return 0;
  if (!bookingForm.checkValidity()) {
    if (!name.checkValidity()) {
      name.setCustomValidity("이름이 입력되지 않았습니다.");
      name.reportValidity();
      return false;
    }
    if (!tel.checkValidity()) {
      tel.setCustomValidity("전화번호 형식이 올바르지 않습니다.");
      tel.reportValidity();
      return false;
    }
    if (!email.checkValidity()) {
      email.setCustomValidity("이메일 형식이 올바르지 않습니다.");
      email.reportValidity();
      return false;
    }
  }
  return true;
}

function booking(xhr, data) {
  xhr.open("POST", `api/reservations`, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function (event) {
    const { target } = event;
    if (target.readyState === XMLHttpRequest.DONE) {
      const { status } = target;
      if (status === 0 || (status >= 200 && status < 400)) {
        alert("예약되었습니다.");
        return (window.location.href = "/reservation");
      } else {
        alert("예약실패");
      }
    }
  };
  xhr.send(JSON.stringify(data));
}

function main() {
  const xhr = new XMLHttpRequest();
  const url = new URL(document.location.href);
  const id = url.searchParams.get("id");
  load(xhr, id);
  btnAgreements.forEach((btnAgreement) => {
    const agreement = btnAgreement.parentNode;
    btnAgreement.addEventListener("click", function () {
      classUtil.toggleClass(agreement, "open");
    });
  });
  checkAgree.addEventListener("input", function () {
    classUtil.toggleClass(bookingBtnWrap, "disable");
  });

  const { name, tel, email } = bookingForm.elements;

  markChecker(name);
  name.addEventListener("input", function (e) {
    const elem = e.currentTarget;
    markChecker(elem);
  });

  markChecker(tel);
  tel.addEventListener("input", function (e) {
    const elem = e.currentTarget;
    markChecker(elem);
  });

  markChecker(email);
  email.addEventListener("input", function (e) {
    const elem = e.currentTarget;
    markChecker(elem);
  });

  setBookingDetail();

  bookingBtn.addEventListener("click", function (e) {
    if (bookingFormCheck()) {
      if (totalCount === 0) {
        alert("입력된 티켓이 없습니다.");
        return 0;
      }
      const { product } = displayInfo;
      const { id, displayInfoId } = product;
      const bookingData = {
        productId: id,
        displayInfoId,
        reservationName: name.value,
        reservationTel: tel.value,
        reservationEmail: email.value,
        reservationDate: formatDate(new Date(bookingDate)),
        prices: tickets
          .filter((ticket) => ticket.getCount() > 0)
          .map((ticket) => {
            return {
              count: ticket.getCount(),
              productPriceId: ticket.getProductPrice().id,
            };
          }),
      };
      booking(xhr, bookingData);
    }
  });
}

main();
