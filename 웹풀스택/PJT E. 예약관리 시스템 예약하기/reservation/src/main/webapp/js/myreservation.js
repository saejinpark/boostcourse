const xhr = new XMLHttpRequest();

let activeTab = 0;

const summaryBoard = document.querySelector(".summary_board");
const [totalTab, confirmedTab, usedTab, usedCancelTab] =
  summaryBoard.querySelectorAll(".item");

const confirmed = document.querySelector(".confirmed");
const used = document.querySelector(".used:not(.cancel)");
const usedCancel = document.querySelector(".used.cancel");
const err = document.querySelector(".err");

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

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

function getElementItems(elem) {
  return elem.querySelectorAll(".link_booking_details ~ article");
}

function itemClear(elem) {
  const items = getElementItems(elem);
  items.forEach((item) => item.remove());
}

activeTotalTab = () => {
  activeTab = 0;
  const before = document.querySelector(".link_summary_board.on");
  const after = totalTab.querySelector(".link_summary_board");
  classUtil.removeClass(before, "on");
  classUtil.addClass(after, "on");

  confirmed.hidden = false;
  used.hidden = false;
  usedCancel.hidden = false;
  err.hidden = true;

  const confirmedItems = getElementItems(confirmed);
  const usedItems = getElementItems(used);
  const usedCancelItems = getElementItems(usedCancel);

  if (confirmedItems.length === 0) confirmed.hidden = true;
  if (usedItems.length === 0) used.hidden = true;
  if (usedCancelItems.length === 0) usedCancel.hidden = true;

  if (
    confirmedItems.length === 0 &&
    usedItems.length === 0 &&
    usedCancelItems.length === 0
  ) {
    err.hidden = false;
  }
};

activeConfirmedTab = () => {
  activeTab = 1;

  const before = document.querySelector(".link_summary_board.on");
  const after = confirmedTab.querySelector(".link_summary_board");
  classUtil.removeClass(before, "on");
  classUtil.addClass(after, "on");
  confirmed.hidden = false;
  used.hidden = true;
  usedCancel.hidden = true;
  err.hidden = true;

  const confirmedItems = getElementItems(confirmed);

  if (confirmedItems.length === 0) {
    confirmed.hidden = true;
    err.hidden = false;
  }
};

activeUsedTab = () => {
  activeTab = 2;
  const before = document.querySelector(".link_summary_board.on");
  const after = usedTab.querySelector(".link_summary_board");
  classUtil.removeClass(before, "on");
  classUtil.addClass(after, "on");
  confirmed.hidden = true;
  used.hidden = false;
  usedCancel.hidden = true;
  err.hidden = true;

  const usedItems = getElementItems(used);

  if (usedItems.length === 0) {
    used.hidden = true;
    err.hidden = false;
  }
};

activeUsedCancelTab = () => {
  activeTab = 3;
  const before = document.querySelector(".link_summary_board.on");
  const after = usedCancelTab.querySelector(".link_summary_board");
  classUtil.removeClass(before, "on");
  classUtil.addClass(after, "on");
  confirmed.hidden = true;
  used.hidden = true;
  usedCancel.hidden = false;
  err.hidden = true;

  const usedCancelItems = getElementItems(usedCancel);

  if (usedCancelItems.length === 0) {
    usedCancel.hidden = true;
    err.hidden = false;
  }
};

function routeActiveTab() {
  if (activeTab === 0) activeTotalTab();
  if (activeTab === 1) activeConfirmedTab();
  if (activeTab === 2) activeUsedTab();
  if (activeTab === 3) activeUsedCancelTab();
}

err.hidden = true;

const categoryData = {};

function setCategory() {
  return new Promise(function (resolve, reject) {
    xhr.open("GET", "api/categories", false);
    xhr.onreadystatechange = function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status === 0 || (status >= 200 && status < 400)) {
          const { items } = JSON.parse(xhr.response);
          items.forEach(function (item) {
            categoryData[item.id] = item.name;
          });
          resolve();
        }
        reject();
      }
    };
    xhr.send();
  });
}

function getReservations() {
  return new Promise(function (resolve, reject) {
    xhr.open("GET", "api/reservations", false);
    xhr.onreadystatechange = function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status === 0 || (status >= 200 && status < 400)) {
          resolve(JSON.parse(xhr.response));
        }
      }
    };
    xhr.send();
  });
}

function getDisplayinfo(displayId) {
  return new Promise(function (resolve, reject) {
    xhr.open("GET", `api/products/${displayId}`, false);
    xhr.onreadystatechange = function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status === 0 || (status >= 200 && status < 400)) {
          resolve(JSON.parse(xhr.response));
        }
      }
      reject();
    };
    xhr.send();
  });
}

async function generateCardItem(item, parent) {
  const template = Handlebars.compile(
    document.getElementById("cardItem").innerHTML
  );

  const { id, displayInfoId, reservationDate, createDate, payment } = item;

  const date = new Date(reservationDate);
  const bookingDate = new Date(createDate);
  const displayInfo = await getDisplayinfo(displayInfoId);

  const { product } = displayInfo;
  const { categoryId, description, placeLot, placeName } = product;

  const data = {
    no: ("" + id).padStart(7, "0"),
    categoryName: categoryData[categoryId],
    description,
    date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}(${
      DAYS[date.getDay()]
    })`,
    createDate: `${bookingDate.getFullYear()}.${
      bookingDate.getMonth() + 1
    }.${bookingDate.getDate()}(${DAYS[bookingDate.getDay()]})`,
    placeLot,
    placeName,
    payment: payment.toLocaleString("ko-KR"),
    id,
  };

  if (parent === confirmed) {
    data["confirmed"] = true;
  } else if (parent === used) {
    data["used"] = true;
  }

  const elem = template(data);
  parent.innerHTML += elem;
}

function setTabFigure(elem, count) {
  const figure = elem.querySelector(".figure");
  figure.textContent = count;
}

async function loadItems(items) {
  const now = new Date();
  const confirmedItems = [];
  const usedItems = [];
  const usedCancelItems = [];
  items.forEach((item) => {
    const { reservationDate, cancelFlag } = item;
    switch (cancelFlag) {
      case 0:
        if (now.getTime() > new Date(reservationDate).getTime()) {
          usedItems.push(item);
          break;
        }
        confirmedItems.push(item);
        break;
      case 1:
        usedCancelItems.push(item);
        break;
      default:
        break;
    }
  });
  setTabFigure(totalTab, items.length);
  setTabFigure(confirmedTab, confirmedItems.length);
  setTabFigure(usedTab, usedItems.length);
  setTabFigure(usedCancelTab, usedCancelItems.length);
  confirmedItems.forEach(async function (item) {
    await generateCardItem(item, confirmed);
  });
  usedItems.forEach(async function (item) {
    await generateCardItem(item, used);
  });
  usedCancelItems.forEach(async function (item) {
    await generateCardItem(item, usedCancel);
  });
}

function deleteReservation(cancelBtn) {
  const { method, id } = cancelBtn.dataset;
  xhr.open(method, `api/reservation/${id}`, false);
  xhr.onreadystatechange = function (event) {
    const { target } = event;
    if (target.readyState === XMLHttpRequest.DONE) {
      const { status } = target;
      if (status === 0 || (status >= 200 && status < 400)) {
        const { result } = JSON.parse(xhr.response);
        if (result === "success") {
          alert("예약 취소");
          load();
        }
      }
    }
  };
  xhr.send();
}

function activePopUp(cancelBtn) {
  const popupBookingWrapper = document.querySelector(".popup_booking_wrapper");

  const { title, date } = cancelBtn.dataset;
  popupBookingWrapper.style.display = "block";
  const popTitle = popupBookingWrapper.querySelector(".pop_tit span");
  popTitle.textContent = title;
  const popDate = popupBookingWrapper.querySelector(".pop_tit .sm");
  popDate.textContent = date;

  const noBtn = popupBookingWrapper.querySelector(".btn_gray .btn_bottom");
  const yesBtn = popupBookingWrapper.querySelector(".btn_green .btn_bottom");
  const popupBtnClose = popupBookingWrapper.querySelector(".popup_btn_close");

  function popUpCancel() {
    popupBookingWrapper.style.display = "none";
  }

  function deleteHandler(e) {
    deleteReservation(cancelBtn);
    noBtn.removeEventListener("click", popUpCancel);
    yesBtn.removeEventListener("click", deleteHandler);
    popupBtnClose.removeEventListener("click", popUpCancel);
    popUpCancel();
  }
  yesBtn.addEventListener("click", deleteHandler);
  noBtn.addEventListener("click", popUpCancel);
  popupBtnClose.addEventListener("click", popUpCancel);
}

function cancleHandler(cancelBtn) {
  const { method } = cancelBtn.dataset;
  if (method === "DELETE") {
    return activePopUp(cancelBtn);
  }
}

function cancelBtnAddEvent() {
  const cancelBtns = document.querySelectorAll(".booking_cancel .btn");
  cancelBtns.forEach(function (cancelBtn) {
    cancelBtn.addEventListener("click", function (e) {
      cancleHandler(cancelBtn);
    });
  });
}

async function load() {
  const reservations = await getReservations();
  itemClear(confirmed);
  itemClear(used);
  itemClear(usedCancel);
  const { size, items } = reservations;
  if (size) {
    await loadItems(items);
    routeActiveTab();
    cancelBtnAddEvent();
    return;
  }
}

async function main() {
  await setCategory();
  load();
}

main();
