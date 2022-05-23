const { Buffer } = require('buffer');

/*
const inputData = Buffer.from(new Uint8Array([170, 187, 204, 221, 238, 255, 153, 136, 119, 102, 0, 0, 0, 0, 0, 0]));
console.log(inputData);
console.log(inputData.readUint16LE(0) / 10.0);
*/

const inputData = Buffer.from([0xfa,0x0,0xa0,0xb1,0x1,0x0,0x0,0x15,0xf8,0x1,0x2,0x3c,0x0,0xfb,0x34,0x9b]);
console.log(inputData.readUint16LE(0) / 10);

/*
const temperature1 = inputData.readUInt8(0) /10.0;
const temperature2 = inputData.readUInt8(1) /10.0;

result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
result[3] = inputData.readUInt8(3) % 256;
result[4] = inputData.readUInt8(4) >> 8;
result[5] = 0
result[6] = 0
const x = temperature1 % 256
const y = temperature2 / 256
console.log(temperature1 + temperature2)
console.log(x + y)


const moisture = inputData.readUInt8(6) /100
console.log(moisture)

console.log(result)
*/