function updateHandler(e) {
  let xhr = new XMLHttpRequest();
  let url = new URL("http://localhost:8080/todo/update");

  let item = e.target;

  while (item.className !== "work_list__item") {
    item = item.parentNode;
  }

  url.searchParams.set("id", item.dataset.id);

  let work = item;

  while (work.className !== "work") {
    work = work.parentNode;
  }

  let nextWorkList = null;

  if (work.id === "todo") {
    url.searchParams.set("type", "TODO");
    nextWorkList = document.querySelector("#doing .work_list");
  } else {
    url.searchParams.set("type", "DOING");
    nextWorkList = document.querySelector("#done .work_list");
  }

  xhr.open("GET", url);
  xhr.responseType = "text";
  xhr.send();
  xhr.onload = function () {
    let result = xhr.response.trim();

    if (result === "success") {
      let temp = item.cloneNode(true);

      item.remove();

      item = temp;

      if (nextWorkList.id === "done") {
        const updateBtn = item.querySelector(".update_btn");
        updateBtn.remove();
      }

      nextWorkList.appendChild(item);

      const nextWorkItems = nextWorkList.querySelectorAll(".work_list__item");
      let nextWorkItemArr = [];

      nextWorkItems.forEach((item) =>
        nextWorkItemArr.push(item.cloneNode(true))
      );

      nextWorkItemArr.sort((a, b) => {
        const datetimeA = a.querySelector("time").getAttribute("datetime");
        const datetimeB = b.querySelector("time").getAttribute("datetime");
        if (datetimeA < datetimeB) return 1;
        if (datetimeA > datetimeB) return -1;
        return 0;
      });

      nextWorkList.innerHTML = "";

      nextWorkList.appendChild(nextWorkItemArr[0]);
      nextWorkItemArr.forEach((item) => {
        nextWorkList.appendChild(item);
      });
    }
  };
}

const updateBtns = document.querySelectorAll(".update_btn");

updateBtns.forEach((updateBtn) => {
  updateBtn.addEventListener("click", updateHandler);
});
