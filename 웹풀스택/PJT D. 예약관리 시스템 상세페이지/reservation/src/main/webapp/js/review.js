async function getComment(xhr, id, start) {
  return new Promise((resolve, reject) => {
    xhr.open(
      "GET",
      `/reservation/api/comments?productId=${id}&start=${start}`,
      false
    );
    xhr.onreadystatechange = async function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status === 0 || (status >= 200 && status < 400)) {
          const { commentCount, reservationUserComments, totalCount } =
            JSON.parse(xhr.response);
          if (start + commentCount < totalCount) {
            resolve(
              reservationUserComments.concat(
                await getComment(xhr, id, start + commentCount)
              )
            );
          } else {
            resolve(reservationUserComments);
          }
        } else {
          reject();
        }
      }
    };
    xhr.send();
  });
}

async function load() {
  const sectionReviewList = document.querySelector(".section_review_list");
  const xhr = new XMLHttpRequest();
  const url = new URL(document.location.href);
  const displayInfoId = url.searchParams.get("displayInfoId");
  const productId = url.searchParams.get("productId");
  const btnBack = document.querySelector(".btn_back");
  btnBack.href = `/reservation/detail?id=${displayInfoId}`;

  const comments = await getComment(xhr, productId, 0);
  let avgScore = (
    comments.reduce((acc, cur) => acc + cur.score, 0) / comments.length
  ).toFixed(1);
  if (isNaN(avgScore)) avgScore = 0;
  comments.forEach((comment) => {
    comment.score =
      comment.score % 1 === 0 ? `${comment.score}.0` : comment.score;
    comment.noImg =
      comment.reservationCommentImages.length === 0 ? true : false;
    if (!comment.noImg)
      comment.imgFileName = comment.reservationCommentImages[0].fileName;
    const date = new Date(comment.createDate);
    comment.createDate = `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()}.`;
  });
  const template = document.getElementById("reviewBox").innerText;
  const bindTemplate = Handlebars.compile(template);
  const data = {
    avgScore: avgScore % 1 === 0 ? `${avgScore}.0` : avgScore,
    comments,
    totalCount: comments.length,
  };
  sectionReviewList.innerHTML = bindTemplate(data);
  const graphValue = sectionReviewList.querySelector(
    ".review_box .graph_value"
  );
  graphValue.style.width = `${avgScore * 20}%`;
}

load();
