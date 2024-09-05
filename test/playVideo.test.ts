import { test } from "vitest";
import { commandType } from "../src/interface/sceneInterface";
import { expectContainEqual, expectThrow } from './util';

test("playVideo-1", async () => {
    expectContainEqual(`
playVideo:OP.mp4;
`, {
        command: commandType.video,
        commandRaw: "playVideo",
        content: "OP.mp4",
        args: [],
        sentenceAssets: [],
        subScene: []
    });
});
