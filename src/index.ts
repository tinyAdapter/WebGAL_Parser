import * as p from './parser';
import { configParser, WebgalConfig } from './configParser/configParser';
import { IAsset } from "./interface/sceneInterface";
import { fileType } from "./interface/assets";
import { SyntaxError as parserSyntaxError } from './parser';
export { SyntaxError as parserSyntaxError } from './parser';

export class SceneParser {

    private readonly assetsPrefetcher;
    private readonly assetSetter;
    private readonly ADD_NEXT_ARG_LIST;
    private readonly SCRIPT_CONFIG;

    public constructor(assetsPrefetcher: ((assetList: Array<IAsset>) => void),
        assetSetter: (fileName: string, assetType: fileType) => string,
        ADD_NEXT_ARG_LIST: Array<number>, SCRIPT_CONFIG: Array<any>) {
        this.assetsPrefetcher = assetsPrefetcher;
        this.assetSetter = assetSetter;
        this.ADD_NEXT_ARG_LIST = ADD_NEXT_ARG_LIST;
        this.SCRIPT_CONFIG = SCRIPT_CONFIG;
    }

    public parse(rawScene: string, sceneName: string, sceneUrl: string) {
        let sentenceList;
        try {
            sentenceList = p.parse(rawScene);
        } catch (e) {
            throw parserSyntaxError(`ERROR: parsing scene "${rawScene}" error with ${e}`);
        }

        const result = { sentenceList };

        result.sentenceList.map((sentence) => {
            sentence.sentenceAssets = [];
            sentence.subScene = [];
        });

        return result;
    }

    public parseConfig(configText: string) {
        return configParser(configText);
    }

    public stringifyConfig(config: WebgalConfig) {
        return config
            .reduce(
                (previousValue, curr) =>
                    (previousValue + `${curr.command}:${curr.args.join('|')}${curr.options.length <= 0 ? '' : curr.options.reduce((p, c) => (p + ' -' + c.key + '=' + c.value), '')};\n`),
                ''
            );
    }
}
