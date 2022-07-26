const NOT_NEED_END_TAG = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
];

const AUTO_END_TAG = [
  "li",
  "dt",
  "dd",
  "p",
  "rt",
  "rp",
  "optgroup",
  "optioni",
  "thead",
  "tfoot",
  "tr",
  "td",
  "th",
];

module.exports = { NOT_NEED_END_TAG, AUTO_END_TAG };
