import { test } from "vitest";
import { commandType } from "../src/interface/sceneInterface";
import { expectContainEqual, expectThrow } from './util';

test("changeFigure-1", async () => {
  expectContainEqual(`
changeFigure:testFigure02.png -next;            改变人物立绘
`, {
    command: commandType.changeFigure,
    commandRaw: "changeFigure",
    content: "testFigure02.png",
    args: [
      { key: "next", value: true },
    ],
    sentenceAssets: [],
    subScene: []
  });
});

test("changeFigure-2", async () => {
  expectContainEqual(`
changeFigure:testFigure03.png -left -id=test1;  一个初始位置在右侧的自由立绘
`, {
    command: commandType.changeFigure,
    commandRaw: "changeFigure",
    content: "testFigure03.png",
    args: [
      { key: "left", value: true },
      { key: "id", value: 'test1' },
    ],
    sentenceAssets: [],
    subScene: []
  });
});

test("changeFigure-2", async () => {
  expectContainEqual(`
changeFigure:none -id=test1;                    通过 id 关闭立绘
`, {
    command: commandType.changeFigure,
    commandRaw: "changeFigure",
    content: "",
    args: [
      { key: "id", value: 'test1' },
    ],
    sentenceAssets: [],
    subScene: []
  });
});
