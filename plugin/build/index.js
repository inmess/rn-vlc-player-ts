"use strict";
// const withGradleTasks = require("./android/withGradleTasks");
// const withMobileVlcKit = require("./ios/withMobileVlcKit");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const withGradleTasks_1 = __importDefault(require("./android/withGradleTasks"));
const withMobileVlcKit_1 = __importDefault(require("./ios/withMobileVlcKit"));
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
const withVlcMediaPlayer = (config, options) => {
    config = (0, withGradleTasks_1.default)(config, options);
    config = (0, withMobileVlcKit_1.default)(config, options);
    return config;
};
exports.default = withVlcMediaPlayer;
