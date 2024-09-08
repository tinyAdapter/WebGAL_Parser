import { test } from "vitest";
import { commandType } from "../src/interface/sceneInterface";
import { expectContainEqual, expectThrow } from './util';

test("changeBg-1", async () => {
    expectContainEqual(`
changeBg:1.jpg -left="https://example-url.com" -next; 引号字符串允许包含任何特殊字符
`, {
        command: commandType.changeBg,
        commandRaw: "changeBg",
        content: "1.jpg",
        args: [
            { key: "left", value: "https://example-url.com" },
            { key: "next", value: true }
        ],
        sentenceAssets: [],
        subScene: []
    });
});

test("changeBg-2", async () => {
    expectContainEqual(`
changeBg:2-1.jpg -left="    ; 不匹配的引号不会被解析为引号字符串
`, {
        command: commandType.changeBg,
        commandRaw: "changeBg",
        content: "2-1.jpg",
        args: [
            { key: "left", value: '"' }
        ],
        sentenceAssets: [],
        subScene: []
    });
});

test("changeBg-3", async () => {
    expectContainEqual(`
changeBg:3_1.jpg -transform='{"hello": "world"}' ; JSON字符串
`, {
        command: commandType.changeBg,
        commandRaw: "changeBg",
        content: "3_1.jpg",
        args: [
            { key: "transform", value: '{"hello": "world"}' }
        ],
        sentenceAssets: [],
        subScene: []
    });
});

test("changeBg-4", async () => {
    expectContainEqual(`
changeBg:4-4-4.jpg -transform={"hello":"world"} ; 不加单引号也可以，但不能有空格
`, {
        command: commandType.changeBg,
        commandRaw: "changeBg",
        content: "4-4-4.jpg",
        args: [
            { key: "transform", value: '{"hello":"world"}' }
        ],
        sentenceAssets: [],
        subScene: []
    });
});

test("changeBg-5", async () => {
    expectContainEqual(`
changeBg:5.jpg -transform="{"hello": "world"}"    ; 显然这个会解析失败
`, [], [{
        location: '1(2:1)..47(2:47)',
        message: "unexpected statement `changeBg:5.jpg -transform=\"{\"hello\": \"world\"}\"`"
    }]);
});

test("changeBg-6", async () => {
    expectContainEqual(`
changeBg:6.jpg -transform="{\\"hello\\": \\"world\\"}" ; 但引号字符串支持转义又比较好地弥补了这一点
`, {
        command: commandType.changeBg,
        commandRaw: "changeBg",
        content: "6.jpg",
        args: [
            { key: "transform", value: '{"hello": "world"}' }
        ],
        sentenceAssets: [],
        subScene: []
    });
});

test("changeBg-7", async () => {
    expectContainEqual(`
changeBg:7.jpg -next=true ; 不含引号的值直接解析
`, {
        command: commandType.changeBg,
        commandRaw: "changeBg",
        content: "7.jpg",
        args: [
            { key: "next", value: true }
        ],
        sentenceAssets: [],
        subScene: []
    });
});

test("changeBg-8", async () => {
    expectContainEqual(`
changeBg:8.jpg -next -left=none ; 测试多个参数
`, {
        command: commandType.changeBg,
        commandRaw: "changeBg",
        content: "8.jpg",
        args: [
            { key: "next", value: true },
            { key: "left", value: "" }
        ],
        sentenceAssets: [],
        subScene: []
    });
});
