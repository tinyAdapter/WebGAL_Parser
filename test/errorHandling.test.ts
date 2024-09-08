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
            location: '1..32',
            message: "unexpected statement `end:shouldNotAddContentHere -()`"
        }
    ]);
});