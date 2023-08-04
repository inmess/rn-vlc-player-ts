import { ConfigPlugin } from "@expo/config-plugins";
interface ConfigPluginAndroidOptions {
    android?: {
        legacyJetifier?: boolean;
    };
}
declare const withGradleTasks: ConfigPlugin<ConfigPluginAndroidOptions>;
export default withGradleTasks;
