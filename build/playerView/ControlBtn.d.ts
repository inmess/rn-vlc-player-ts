/**
 * Created by yuanzhou.xu on 2018/5/16.
 */
import React from 'react';
import { ViewStyle } from 'react-native';
interface ControlBtnProps {
    titleGolive?: string;
    showLeftButton?: boolean;
    showMiddleButton?: boolean;
    showRightButton?: boolean;
    paused: boolean;
    isFull: boolean;
    showGG?: boolean;
    showSlider?: boolean;
    showGoLive?: boolean;
    onGoLivePress?: () => void;
    onReplayPress?: () => void;
    onPausedPress?: (paused: boolean) => void;
    onFullPress: (isFull: boolean) => void;
    onValueChange: (value: number) => void;
    onSlidingComplete: (value: number) => void;
    currentTime: number;
    totalTime: number;
    onLeftPress?: () => void;
    title?: string;
    onEnd?: () => void;
    style?: ViewStyle;
}
export default function ControlBtn(props: ControlBtnProps): React.JSX.Element;
export {};
//# sourceMappingURL=ControlBtn.d.ts.map