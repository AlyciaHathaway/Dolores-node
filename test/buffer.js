
// 断言
const assert = require('assert')
const fs = require('fs')

// Buffer 是 unit8Array，放在堆外内存
// Buffer 方法

// 1. Buffer.from(string, encoding)
let str = 'Hello World'
let buf1 = Buffer.from(str, 'utf8')
console.log(buf1)
let buf2 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64])
console.log(buf2.toString())

// 2. Buffer 字符转码
// 汉字需要三位 Buffer 来标识
let test = '窗' // [0xe7, 0xaa, 0x97]
console.log(Buffer.from(test))

// 3. Buffer.concat(array, arrayLength)
let buf3 = Buffer.from([0xe7])
let buf4 = Buffer.from([0xaa])
let buf5 = Buffer.from([0x97])
console.log(Buffer.concat([buf3, buf4, buf5], 3).toString('utf8'))

// 4. Buffer 应用场景
// stream 读取字节丢失问题，不过 Node 已经帮你做了兼容
let data = fs.createReadStream('./test/text', {
    highWaterMark: 1,
    // encoding: 'utf8'
})

let out = []
data.on('data', (chunk)=> {
    out.push(chunk)
}).on('end', ()=> {
    let length = out.length
    console.log(Buffer.concat(out, length).toString())
})