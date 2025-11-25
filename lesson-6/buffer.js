const buf = new Buffer.alloc(1024, 1, "ascii");
const buf2 = new Buffer.alloc(5, "a", "ascii");
const strBuf = new Buffer.from("qweqweqweqwe");
const bugCopy = new Buffer.from(buf2);
const tenZero = new Buffer.alloc(10, 0);
const wordBuf = new Buffer.from("Banana Nananana");
const cathBuf = new Buffer.from("Not sure Turtle!");

wordBuf.copy(cathBuf);

cathBuf.write("Not sure Turtle!");

console.log(cathBuf.toString());

wordBuf.copy(cathBuf, 0, 7, wordBuf.lenght);

console.log(cathBuf.toString());

// strBuf[1] = 101;
// strBuf[2] = 121;
// strBuf.write("Hello");

// console.log(strBuf.toString());

// console.log(bugCopy.toString("utf8"));
// console.log(bugCopy.toString("hex"));
// console.log(strBuf.toString("hex"));
// console.log(strBuf.toString());

// console.log(strBuf.toJSON());

// console.log(tenZero.toJSON());
