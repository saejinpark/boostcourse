export function utf8_hex_string_to_string(hex_str1) {
  const bytes2 = hex_string_to_bytes(hex_str1);

  const str2 = utf8_bytes_to_string(bytes2);

  return str2;
}
export function string_to_utf8_hex_string(text) {
  const bytes1 = string_to_utf8_bytes(text);

  const hex_str1 = bytes_to_hex_string(bytes1);

  return hex_str1;
}
export function hex_to_byte(hex_str) {
  return parseInt(hex_str, 16);
}
export function utf8_bytes_to_string(arr) {
  if (arr == null) return null;

  let result = "";
  let i;

  while ((i = arr.shift())) {
    if (i <= 0x7f) {
      result += String.fromCharCode(i);
    } else if (i <= 0xdf) {
      let c = (i & 0x1f) << 6;

      c += arr.shift() & 0x3f;

      result += String.fromCharCode(c);
    } else if (i <= 0xe0) {
      let c = ((arr.shift() & 0x1f) << 6) | 0x0800;

      c += arr.shift() & 0x3f;

      result += String.fromCharCode(c);
    } else {
      let c = (i & 0x0f) << 12;

      c += (arr.shift() & 0x3f) << 6;

      c += arr.shift() & 0x3f;

      result += String.fromCharCode(c);
    }
  }

  return result;
}
export function hex_string_to_bytes(hex_str) {
  const result = [];

  for (let i = 0; i < hex_str.length; i += 2) {
    result.push(hex_to_byte(hex_str.substr(i, 2)));
  }

  return result;
}
export function bytes_to_hex_string(bytes) {
  let result = "";

  for (let i = 0; i < bytes.length; i++) {
    result += byte_to_hex(bytes[i]);
  }

  return result;
}
export function string_to_utf8_bytes(text) {
  const result = [];

  if (text == null) return result;

  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);

    if (c <= 0x7f) {
      result.push(c);
    } else if (c <= 0x07ff) {
      result.push(((c >> 6) & 0x1f) | 0xc0);

      result.push((c & 0x3f) | 0x80);
    } else {
      result.push(((c >> 12) & 0x0f) | 0xe0);

      result.push(((c >> 6) & 0x3f) | 0x80);

      result.push((c & 0x3f) | 0x80);
    }
  }

  return result;
}
export function byte_to_hex(byte_num) {
  const digits = byte_num.toString(16);

  if (byte_num < 16) return "0" + digits;

  return digits;
}
