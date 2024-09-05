import { test } from "vitest";
import { commandType } from "../src/interface/sceneInterface";
import { expectContainEqual, expectThrow } from './util';

test("bgm-1", async () => {
    expectContainEqual(`
bgm:夏影.mp3;
`, {
        command: commandType.bgm,
        commandRaw: "bgm",
        content: "夏影.mp3",
        args: [],
        sentenceAssets: [],
        subScene: []
    });
});

test("bgm-2", async () => {
    expectContainEqual(`
bgm:夏影.mp3 -volume=30;
`, {
        command: commandType.bgm,
        commandRaw: "bgm",
        content: "夏影.mp3",
        args: [{ key: "volume", value: 30 }],
        sentenceAssets: [],
        subScene: []
    });
});

test("bgm-3", async () => {
    expectContainEqual(`
bgm:夏影.mp3 -enter=3000;
`, {
        command: commandType.bgm,
        commandRaw: "bgm",
        content: "夏影.mp3",
        args: [{ key: "enter", value: 3000 }],
        sentenceAssets: [],
        subScene: []
    });
});

test("bgm-4", async () => {
    expectContainEqual(`
bgm:none -enter=3000;
`, {
        command: commandType.bgm,
        commandRaw: "bgm",
        content: "",
        args: [{ key: "enter", value: 3000 }],
        sentenceAssets: [],
        subScene: []
    });
});
