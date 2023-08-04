import { ConfigPlugin } from "@expo/config-plugins";
declare const withMobileVlcKit: ConfigPlugin<{
    ios?: {
        includeVLCKit?: boolean;
    };
}>;
export default withMobileVlcKit;
