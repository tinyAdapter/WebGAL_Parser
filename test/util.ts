
import { SceneParser, parserSyntaxError } from "../src/index";
import { ADD_NEXT_ARG_LIST, SCRIPT_CONFIG } from "../src/config/scriptConfig";
import { expect } from "vitest";

export function expectContainEqual(rawScene: any, expectedSentenceItem: any) {
    const parser = new SceneParser((assetList) => {
    }, (fileName, assetType) => {
        return fileName;
    }, ADD_NEXT_ARG_LIST, SCRIPT_CONFIG);

    const result = parser.parse(rawScene, "start", "/start.txt");
    expect(result.sentenceList).toContainEqual(expectedSentenceItem);
}

export function expectThrow(rawScene: any) {
    const parser = new SceneParser((assetList) => {
    }, (fileName, assetType) => {
        return fileName;
    }, ADD_NEXT_ARG_LIST, SCRIPT_CONFIG);

    expect(() => parser.parse(rawScene, "start", "/start.txt")).toThrow(parserSyntaxError);
}