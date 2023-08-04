/**
 * Created by yuanzhou.xu on 2018/5/15.
 */
import React from 'react';
import { ViewStyle } from 'react-native';
interface CommonVideoProps {
    widthCamera?: number;
    height?: number;
    showGG?: boolean;
    ggUrl?: string;
    url?: string;
    isGG?: boolean;
    /**
     * 是否显示返回按钮
     */
    showBack?: boolean;
    /**
     * 是否显示标题
     */
    showTitle?: boolean;
    /**
     * 视频播放结束
     */
    onEnd?: () => void;
    /**
     * 广告头播放结束
     */
    onGGEnd?: () => void;
    /**
     * 开启全屏
     */
    startFullScreen?: () => void;
    /**
     * 关闭全屏
     */
    closeFullScreen?: () => void;
    /**
     * 返回按钮点击事件
     */
    onLeftPress?: () => void;
    /**
     * 标题
     */
    title?: string;
    onGoLivePress?: () => void;
    onReplayPress?: () => void;
    style?: ViewStyle;
    isFull?: boolean;
    videoAspectRatio?: string;
    fullVideoAspectRatio?: string;
    BackHandle?: any;
    Orientation?: any;
}
export default function CommonVideo(props: CommonVideoProps): React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map