"use strict";
// const { withAppBuildGradle } = require("@expo/config-plugins");
// const generateCode = require("@expo/config-plugins/build/utils/generateCode");
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const generateCode_1 = require("@expo/config-plugins/build/utils/generateCode");
const resolveAppGradleString = (options) => {
    // for React Native 0.71, the file value now contains "jetified-react-android" instead of "jetified-react-native"
    const rnJetifierName = options?.android?.legacyJetifier ? "jetified-react-native" : "jetified-react-android";
    const gradleString = `tasks.whenTaskAdded((tas -> {
        // when task is 'mergeLocalDebugNativeLibs' or 'mergeLocalReleaseNativeLibs'
        if (tas.name.contains("merge") && tas.name.contains("NativeLibs")) {
            tasks.named(tas.name) {it
                doFirst {
                    java.nio.file.Path notNeededDirectory = it.externalLibNativeLibs
                            .getFiles()
                            .stream()
                            .filter(file -> file.toString().contains("${rnJetifierName}"))
                            .findAny()
                            .orElse(null)
                            .toPath();
                    java.nio.file.Files.walk(notNeededDirectory).forEach(file -> {
                        if (file.toString().contains("libc++_shared.so")) {
                            java.nio.file.Files.delete(file);
                        }
                    });
                }
            }
        }
    }))`;
    return gradleString;
};
const withGradleTasks = (config, options) => {
    return (0, config_plugins_1.withAppBuildGradle)(config, (config) => {
        const newCode = (0, generateCode_1.mergeContents)({
            tag: "withVlcMediaPlayer",
            src: config.modResults.contents,
            newSrc: resolveAppGradleString(options),
            anchor: /applyNativeModulesAppBuildGradle\(project\)/i,
            offset: 2,
            comment: "//",
        });
        config.modResults.contents = newCode.contents;
        return config;
    });
};
exports.default = withGradleTasks;
