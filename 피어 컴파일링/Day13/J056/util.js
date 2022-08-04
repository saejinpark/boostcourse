export const makePrettyNetworkHeader = (header) => {
  return `${header.sourceIP}, ${header.destIP}, [${makeHeaderArray(header)}]`;
};

export const makePrettyDataLinkHeader = (header) => {
  return `${header.sourceMAC}, ${header.destMAC}, ${makePrettyNetworkHeader(header)}`;
};

export const makeHeaderArray = (header) => {
  const { packetType, sourcePort, destPort, sequenceNumber, ackNumber, contentLength, body } = header;
  return [packetType, sourcePort, destPort, sequenceNumber, ackNumber, contentLength, body];
};

export const convertASCIItoHex = (asciiString) => {
  let hex = '';
  let tempASCII, tempHex;
  asciiString.split('').map((i) => {
    tempASCII = i.charCodeAt(0);
    tempHex = tempASCII.toString(16);
    hex = hex + tempHex + ' ';
  });
  hex = hex.trim();
  return hex;
};
export const convertHexToASCII = (hexString) => {
  let stringOut = '';
  hexString.split(' ').map((i) => {
    const tempAsciiCode = parseInt(i, 16);
    stringOut = stringOut + String.fromCharCode(tempAsciiCode);
  });
  return stringOut;
};
