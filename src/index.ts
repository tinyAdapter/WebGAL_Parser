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
changeBg:one.jpg -url="https://example-url.com" -next; 双引号字符串允许包含任何特殊字符
changeBg:one.jpg -url="; 不匹配的引号不会被解析为双引号字符串
changeBg:one.jpg -url="\\""; 允许转义
changeBg:another.jpg -next=true; 不含双引号的值直接解析
changeBg:three.jpg -next -left="none" ; 测试多个参数`

console.log("input: ")
console.log("-".repeat(80))
console.log(INPUT)
console.log("-".repeat(80))
console.log("output: ")
console.log("-".repeat(80))
console.dir(p.parse(INPUT), { depth: null })
console.log("-".repeat(80))
