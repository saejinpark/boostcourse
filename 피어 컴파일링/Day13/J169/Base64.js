exports.encoding = async function(file) {
    // console.log('\n----------------------------------------------Base64 Encoding----------------------------------------------');
    const base64Arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    // console.log('[String]                \n',file);
    const int8Array = new Uint8Array(Buffer.from(file));
    // console.log('\n[ASCII Value Array]     \n',int8Array);

    const int6Array = getint6Array(int8Array);
    // console.log('\n[6-bits Decimal Array]  \n',int6Array);

    const encodedFile = int6Array.map(x=>base64Arr.at(x)).join('');
    // console.log('\n[Base64]                \n',encodedFile);

    return encodedFile
}

function getint6Array(int8Array){
    let binary = '';
    let int6Array = [];

    for(let i=0; i<int8Array.length;i++){
        binary+=int8Array[i].toString(2).padStart(8,'0');

        if(binary.length>=6){
            int6Array.push(parseInt(binary.slice(0,6), 2));
            binary = binary.slice(6);
        }
    }
    if(binary.length) int6Array.push(parseInt(binary, 2));

    return int6Array
}