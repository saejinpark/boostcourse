class Util {
	constructor() {}


	encodeToBase64(data) {
		const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		let output = "";
		let i = 0;
		while (i < data.length) {
			const [chr1, chr2, chr3] = [ data.charCodeAt(i++), data.charCodeAt(i++), data.charCodeAt(i++) ];
			let [enc1, enc2, enc3, enc4] = [ chr1 >> 2, ((chr1 & 3) << 4)  | (chr2 >> 4), ((chr2 & 15) << 2) | (chr3 >> 6), chr3 & 63 ];
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
		}
		return output;
	}


	decodeByBase64(data) {
		const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		let output = "";
		let i = 0;
		data = data.replace(/[^A-Za-z0-9+/=]/g, "");
		while (i < data.length) {
			const [enc1, enc2, enc3, enc4] = [ keyStr.indexOf(data.charAt(i++)), keyStr.indexOf(data.charAt(i++)), keyStr.indexOf(data.charAt(i++)), keyStr.indexOf(data.charAt(i++)) ];
			const [chr1, chr2, chr3] = [ (enc1 << 2) | (enc2 >> 4), ((enc2 & 15) << 4) | (enc3 >> 2), ((enc3 & 3) << 6) | enc4 ];
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		return output;
	}


	getUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0;
			const v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}


	strToHex(str) {
		let hex = '';
		str.split('').map((i) => {
			let tempASCII = i.charCodeAt(0)
			let tempHex = tempASCII.toString(16);
			hex = hex + tempHex + ' ';
		});
		return hex.trim();
	}


	hexToStr(hex) {
		let str = '';
		hex.split(' ').map((i) => {
			let tempAsciiCode = parseInt(i, 16);
			str = str + String.fromCharCode(tempAsciiCode);
		});
		return str;
	}
}

const util = new Util();
module.exports = { util };