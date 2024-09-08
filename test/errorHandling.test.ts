import { test } from "vitest";
import { commandType } from "../src/interface/sceneInterface";
import { expectContainEqual, expectThrow } from './util';

test("err-1", async () => {
    expectContainEqual(`
end:shouldNotAddContentHere -();
end;
`, [{
        command: commandType.end,
        commandRaw: "end",
        content: "",
        args: [],
        sentenceAssets: [],
        subScene: []
    }], [
        {
            location: '1(2:1)..32(2:32)',
            message: "unexpected statement `end:shouldNotAddContentHere -()`"
        }
    ]);
});

test("err-2", async () => {
    expectContainEqual(`
one command:is not affected -next;
end:shouldNotAddContentHere -();
another command:is not affected as well;
`, [
        {
            command: commandType.say,
            commandRaw: "one command",
            content: "is not affected",
            args: [
                { key: "speaker", value: "one command" },
                { key: "next", value: true }
            ],
            sentenceAssets: [],
            subScene: []
        }, {
            command: commandType.say,
            commandRaw: "another command",
            content: "is not affected as well",
            args: [
                { key: "speaker", value: "another command" },
            ],
            sentenceAssets: [],
            subScene: []
        }
    ], [
        {
            location: '36(3:1)..67(3:32)',
            message: "unexpected statement `end:shouldNotAddContentHere -()`"
        }
    ]);
});