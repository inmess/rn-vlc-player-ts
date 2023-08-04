// const withGradleTasks = require("./android/withGradleTasks");
// const withMobileVlcKit = require("./ios/withMobileVlcKit");

import withGradleTasks from "./android/withGradleTasks";
import withMobileVlcKit from "./ios/withMobileVlcKit";

import { ConfigPlugin } from "@expo/config-plugins";


interface ConfigPluginOptions {
    ios?: {
        includeVLCKit?: boolean;
    };
    android?: {
        legacyJetifier?: boolean;
    };
}

/**
 * Adds required native code to work with expo development build
 *
 * @param config - Expo native configuration
 * @param options - Plugin options
 * @param options.ios.includeVLCKit - If `true`, it will include VLC Kit on PodFile (No need if you are running RN 0.61 and up)
 * @param options.android.legacyJetifier - Must be `true`, if react-native version lower than 0.71 to replace jetifier name on from react native libs
 *
 * @returns resolved expo configuration
 */
const withVlcMediaPlayer: ConfigPlugin<ConfigPluginOptions> = (config, options) => {
    config = withGradleTasks(config, options);
    config = withMobileVlcKit(config, options);

    return config;
};

export default withVlcMediaPlayer;
