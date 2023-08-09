import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import generateCode from "@expo/config-plugins/build/utils/generateCode";
import path from "path";
import fs from "fs";

const withMobileVlcKit: ConfigPlugin<{
    ios?: {
        includeVLCKit?: boolean;
    };
}> = (config, options) => {
    // No need if you are running RN 0.61 and up
    if (!options?.ios?.includeVLCKit) {
        // console.log("okok");
        return config;
    }

    return withDangerousMod(config, [
        "ios",
        (config) => {
            const filePath = path.join(config.modRequest.platformProjectRoot, "Podfile");

            const contents = fs.readFileSync(filePath, "utf-8");

            const newCode = generateCode.mergeContents({
                tag: "withVlcMediaPlayer",
                src: contents,
                newSrc: "  pod 'MobileVLCKit', '3.3.10'",
                anchor: /use\_expo\_modules\!/i,
                offset: 3,
                comment: "  #",
            });

            fs.writeFileSync(filePath, newCode.contents);

            return config;
        },
    ]);
};

export default withMobileVlcKit;