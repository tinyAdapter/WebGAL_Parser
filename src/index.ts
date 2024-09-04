import * as p from './parser';
import { configParser, WebgalConfig } from './configParser/configParser'
import { IAsset } from "./interface/sceneInterface";
import { fileType } from "./interface/assets";

export { SyntaxError as parserSyntaxError } from './parser';

export class SceneParser {

    private readonly assetsPrefetcher;
    private readonly assetSetter;
    private readonly ADD_NEXT_ARG_LIST;
    private readonly SCRIPT_CONFIG;

    constructor(assetsPrefetcher: ((assetList: Array<IAsset>) => void),
        assetSetter: (fileName: string, assetType: fileType) => string,
        ADD_NEXT_ARG_LIST: Array<number>, SCRIPT_CONFIG: Array<any>) {
        this.assetsPrefetcher = assetsPrefetcher;
        this.assetSetter = assetSetter;
        this.ADD_NEXT_ARG_LIST = ADD_NEXT_ARG_LIST;
        this.SCRIPT_CONFIG = SCRIPT_CONFIG;
    }

    parse(rawScene: string, sceneName: string, sceneUrl: string) {
        let sentenceList;
        try {
            sentenceList = p.parse(rawScene);
        } catch (e) {
            throw e;
        }

        const result = { sentenceList };

        result.sentenceList.map((sentence) => {
            sentence.sentenceAssets = [];
            sentence.subScene = [];
        })

        return result;
    }

    parseConfig(configText: string) {
        return configParser(configText)
    }

    stringifyConfig(config: WebgalConfig) {
        return config
            .reduce(
                (previousValue, curr) =>
                    (previousValue + `${curr.command}:${curr.args.join('|')}${curr.options.length <= 0 ? '' : curr.options.reduce((p, c) => (p + ' -' + c.key + '=' + c.value), '')};\n`),
                ''
            )
    }
}

// let input = ""

// input = `
// changeFigure:testFigure02.png -next;            改变人物立绘
// changeFigure:testFigure03.png -left -id=test1;  一个初始位置在右侧的自由立绘
// changeFigure:none -id=test1;                    通过 id 关闭立绘
// miniAvatar:minipic_test.png;                    在左下角显示minipic_test.png
// miniAvatar:none;                                关闭这个小头像
// miniAvatar:;                                    关闭这个小头像`
// output(input)

// input = `
// bgm:夏影.mp3;
// bgm:夏影.mp3 -volume=30;
// bgm:夏影.mp3 -enter=3000;
// bgm:none -enter=3000;
// `
// output(input)

// input = `
// playVideo:OP.mp4;
// `
// output(input)

// input = `
// pixiInit;
// pixiPerform:rain; // 添加一个下雨的特效
// `
// output(input)

// input = `
// changeScene:Chapter-2.txt;
// `
// output(input)