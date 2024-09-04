import { SceneParser, parserSyntaxError } from "../src/index";
import { ADD_NEXT_ARG_LIST, SCRIPT_CONFIG } from "../src/config/scriptConfig";
import { expect, test } from "vitest";
import { commandType, ISentence } from "../src/interface/sceneInterface";
import * as fsp from 'fs/promises'
import { fileType } from "../src/interface/assets";

function expectContainEqual(rawScene: any, expectedSentenceItem: any) {
  const parser = new SceneParser((assetList) => {
  }, (fileName, assetType) => {
    return fileName;
  }, ADD_NEXT_ARG_LIST, SCRIPT_CONFIG);

  const result = parser.parse(rawScene, "start", "/start.txt");
  expect(result.sentenceList).toContainEqual(expectedSentenceItem);
}

function expectThrow(rawScene: any) {
  const parser = new SceneParser((assetList) => {
  }, (fileName, assetType) => {
    return fileName;
  }, ADD_NEXT_ARG_LIST, SCRIPT_CONFIG);

  expect(() => parser.parse(rawScene, "start", "/start.txt")).toThrow(parserSyntaxError);
}

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
  expectThrow(`
changeBg:5.jpg -transform="{"hello": "world"}"    ; 显然这个会解析失败
`);
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
changeBg:8.jpg -next -left="none" ; 测试多个参数
`, {
    command: commandType.changeBg,
    commandRaw: "changeBg",
    content: "8.jpg",
    args: [
      { key: "next", value: true },
      { key: "left", value: "none" }
    ],
    sentenceAssets: [],
    subScene: []
  });
});
