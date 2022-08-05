import { JSDOM } from "jsdom";
function domparse(html) {
  const { window } = new JSDOM(html);

  let urls = [];
  window.document
    .querySelectorAll("img[src], script[src]")
    .forEach((el) => urls.push(el.src));
  //url중 빈링크 제거
  urls = urls.filter((el) => el);
  return urls;
}
export default domparse;
