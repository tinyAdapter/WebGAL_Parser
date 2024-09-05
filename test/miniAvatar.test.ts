import { test } from "vitest";
import { commandType } from "../src/interface/sceneInterface";
import { expectContainEqual, expectThrow } from './util';

test("miniAvatar-1", async () => {
    expectContainEqual(`
miniAvatar:minipic_test.png;                    在左下角显示minipic_test.png
`, {
        command: commandType.miniAvatar,
        commandRaw: "miniAvatar",
        content: "minipic_test.png",
        args: [],
        sentenceAssets: [],
        subScene: []
    });
});

test("miniAvatar-2", async () => {
    expectContainEqual(`
miniAvatar:none;                                关闭这个小头像
`, {
        command: commandType.miniAvatar,
        commandRaw: "miniAvatar",
        content: "",
        args: [],
        sentenceAssets: [],
        subScene: []
    });
});

test("miniAvatar-3", async () => {
    expectContainEqual(`
miniAvatar:;                                    关闭这个小头像
`, {
        command: commandType.miniAvatar,
        commandRaw: "miniAvatar",
        content: "",
        args: [],
        sentenceAssets: [],
        subScene: []
    });
});