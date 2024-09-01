import * as p from "./parser";

// const INPUT = `; 初始场景，以及特效演示;;
// ;
// changeBg:c4.jpg
//     -next;
//       unlock
//     Cg:c4.jpg
// -name=街前;  解锁部分CG
// unlockCg:xgmain.jpeg -name=星光咖啡馆与死神之蝶;`

const INPUT = `
changeBg:1.jpg -left="https://example-url.com" -next; 引号字符串允许包含任何特殊字符
changeBg:2.jpg -left="                              ; 不匹配的引号不会被解析为引号字符串
changeBg:3.jpg -transform='{"hello": "world"}'      ; JSON字符串
changeBg:4.jpg -transform={"hello": "world"}        ; 不加单引号也可以
; changeBg:5.jpg -transform="{"hello": "world"}"    ; 显然这个会解析失败
changeBg:6.jpg -transform="{\\"hello\\": \\"world\\"}"  ; 但引号字符串支持转义又比较好地弥补了这一点
changeBg:7.jpg -next=true                           ; 不含引号的值直接解析
changeBg:8.jpg -next -left="none"                   ; 测试多个参数`

console.log("input: ")
console.log("-".repeat(80))
console.log(INPUT)
console.log("-".repeat(80))
console.log("output: ")
console.log("-".repeat(80))
console.dir(p.parse(INPUT), { depth: null })
console.log("-".repeat(80))
