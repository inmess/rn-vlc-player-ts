/**
 * Created by yuanzhou.xu on 2018/5/14.
 */
import React from 'react';
import { ViewProps } from 'react-native';
type VLCPlayerViewProps = {
    uri: any;
    initPaused?: boolean;
    source?: any;
    seek?: number;
    playInBackground?: boolean;
    isGG?: boolean;
    autoplay?: boolean;
    errorTitle?: string;
    isFull?: boolean;
    title?: string;
    onLeftPress?: () => void;
    closeFullScreen?: () => void;
    showBack?: boolean;
    showTitle?: boolean;
    videoAspectRatio?: string;
    showGoLive?: boolean;
    onGoLivePress?: () => void;
    onReplayPress?: () => void;
    titleGolive?: string;
    showLeftButton?: boolean;
    showMiddleButton?: boolean;
    showRightButton?: boolean;
    onVLCError?: () => void;
    onVLCEnded?: () => void;
    startFullScreen?: () => void;
    onEnd?: () => void;
    type?: string;
} & ViewProps;
export default function VLCPlayerView(props: VLCPlayerViewProps): React.JSX.Element;
export {};
//# sourceMappingURL=VLCPlayerView.d.ts.map