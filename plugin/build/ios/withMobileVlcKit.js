"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const generateCode_1 = __importDefault(require("@expo/config-plugins/build/utils/generateCode"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const withMobileVlcKit = (config, options) => {
    // No need if you are running RN 0.61 and up
    if (!options?.ios?.includeVLCKit) {
        console.log("okok");
        return config;
    }
    return (0, config_plugins_1.withDangerousMod)(config, [
        "ios",
        (config) => {
            const filePath = path_1.default.join(config.modRequest.platformProjectRoot, "Podfile");
            const contents = fs_1.default.readFileSync(filePath, "utf-8");
            const newCode = generateCode_1.default.mergeContents({
                tag: "withVlcMediaPlayer",
                src: contents,
                newSrc: "  pod 'MobileVLCKit', '3.3.10'",
                anchor: /use\_expo\_modules\!/i,
                offset: 3,
                comment: "  #",
            });
            fs_1.default.writeFileSync(filePath, newCode.contents);
            return config;
        },
    ]);
};
exports.default = withMobileVlcKit;
