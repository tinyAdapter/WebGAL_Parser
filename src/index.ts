import * as p from "./parser";

const INPUT = `; 初始场景，以及特效演示
changeBg:c4.jpg 
    -ne
  xt;
      unlock
    Cg:c4.jpg
-name=街前;  解锁部分CG
  unlockCg:xgmain.jpeg -name=星光咖啡馆与死神之蝶;`

console.log("input: ")
console.log("-".repeat(80))
console.log(INPUT)
console.log("-".repeat(80))
console.log("output: ")
console.log("-".repeat(80))
console.log(p.parse(INPUT))
console.log("-".repeat(80))
