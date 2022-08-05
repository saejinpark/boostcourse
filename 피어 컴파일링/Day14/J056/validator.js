import { SCHEME_TYPE } from './constants.js';

const validator = (str) => {
  if (!str || str.split('.').length < 2 || str.slice(-1) === '.') return false;
  if (str.slice(0, 5) === SCHEME_TYPE.HTTPS || str.slice(0, 4) === SCHEME_TYPE.HTTP) {
    return str;
  } else {
    return 'https://' + str;
  }
};
export default validator;
