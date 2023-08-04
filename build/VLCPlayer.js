import React, { useRef } from "react";
import { StyleSheet, requireNativeComponent } from 'react-native';
import { Image } from "react-native";
const RCTVLCPlayer = requireNativeComponent('RCTVLCPlayer');
export default function VLCPlayer(props) {
    const { progressUpdateInterval = 250, paused = false, seek = 0, resume = false, snapshotPath = "", autoAspectRatio = false, videoAspectRatio = "", } = props;
    const vlcRef = useRef(null);
    // constructor(props, context) {
    //   super(props, context);
    //   this.seek = this.seek.bind(this);
    //   this.resume = this.resume.bind(this);
    //   this.snapshot = this.snapshot.bind(this);
    //   this._assignRoot = this._assignRoot.bind(this);
    //   this._onError = this._onError.bind(this);
    //   this._onProgress = this._onProgress.bind(this);
    //   this._onEnded = this._onEnded.bind(this);
    //   this._onPlaying = this._onPlaying.bind(this);
    //   this._onStopped = this._onStopped.bind(this);
    //   this._onPaused = this._onPaused.bind(this);
    //   this._onBuffering = this._onBuffering.bind(this);
    //   this._onOpen = this._onOpen.bind(this);
    //   this._onLoadStart = this._onLoadStart.bind(this);
    //   this._onLoad = this._onLoad.bind(this);
    //   this.changeVideoAspectRatio = this.changeVideoAspectRatio.bind(this);
    // }
    // static defaultProps = {
    //   autoplay: true,
    // };
    // const setNativeProps = (nativeProps: Partial<VLCPlayerProps>) => {
    //     vlcRef.current?.setNativeProps(nativeProps);
    // }
    // const seek = (pos: number) => setNativeProps({ seek: pos });
    // const resume = (isResume: boolean) => setNativeProps({ resume: isResume })
    // const snapshot = (path: string) => setNativeProps({ snapshotPath: path });
    // const autoAspectRatio = (isAuto: boolean) => setNativeProps({ autoAspectRatio: isAuto });
    // const changeVideoAspectRatio = (ratio: string) => setNativeProps({ videoAspectRatio: ratio });
    // const _assignRoot = (component) => {
    //     this._root = component;
    // }
    const _onBuffering = (event) => {
        if (props.onVideoBuffering) {
            props.onVideoBuffering(event.nativeEvent);
        }
    };
    const _onError = (event) => {
        if (props.onError) {
            props.onError(event.nativeEvent);
        }
    };
    const _onOpen = (event) => {
        if (props.onVideoOpen) {
            props.onVideoOpen(event.nativeEvent);
        }
    };
    const _onLoadStart = (event) => {
        if (props.onVideoLoadStart) {
            props.onVideoLoadStart(event.nativeEvent);
        }
    };
    const _onProgress = (event) => {
        if (props.onVideoProgress) {
            props.onVideoProgress(event.nativeEvent);
        }
    };
    const _onEnded = (event) => {
        if (props.onEnded) {
            props.onEnded(event.nativeEvent);
        }
    };
    // const _onStopped = () => {
    //     setNativeProps({ paused: true });
    //     if (props.onStopped) {
    //         props.onStopped();
    //     }
    // }
    const _onPaused = (event) => {
        if (props.onPaused) {
            props.onPaused(event.nativeEvent);
        }
    };
    const _onPlaying = (event) => {
        if (props.onPlaying) {
            props.onPlaying(event.nativeEvent);
        }
    };
    const _onLoad = (event) => {
        if (props.onVideoLoad) {
            props.onVideoLoad(event.nativeEvent);
        }
    };
    // const pause = () => {
    //     vlcRef.current?.setNativeProps({ paused: true });
    // }
    // // useImperativeHandle(ref, () => ({
    //     // seek,
    //     // resume,
    //     // snapshot,
    //     // autoAspectRatio,
    //     // changeVideoAspectRatio,
    //     _onBuffering,
    //     _onError,
    //     _onOpen,
    //     _onLoadStart,
    //     _onProgress,
    //     _onEnded,
    //     // _onStopped,
    //     _onPaused,
    //     _onPlaying,
    //     _onLoad,
    // }), [])
    // render() {
    /* const {
     source
     } = this.props;*/
    const resolvedSource = Image.resolveAssetSource(props.source) || {};
    // resolvedSource
    let uri = resolvedSource.uri || "";
    if (uri && uri.match(/^\//))
        uri = `file://${uri}`;
    let isNetwork = !!(uri && uri.match(/^https?:/));
    const isAsset = !!(uri && uri.match(/^(assets-library|file|content|ms-appx|ms-appdata):/));
    if (!isAsset)
        isNetwork = true;
    if (uri && uri.match(/^\//))
        isNetwork = false;
    const { autoplay = true, initOptions = [], } = props;
    const source = {
        uri,
        isNetwork,
        autoplay,
        initOptions: [
            ...initOptions,
            "--input-repeat=1000"
        ],
    };
    const nativeProps = Object.assign({}, props);
    Object.assign(nativeProps, {
        style: [styles.base, nativeProps.style],
        source,
        src: {
            uri,
            isNetwork,
            isAsset,
            type: "",
            mainVer: 0,
            patchVer: 0,
        },
        paused,
        seek,
        resume,
        snapshotPath,
        autoAspectRatio,
        videoAspectRatio,
        onVideoLoadStart: _onLoadStart,
        onVideoOpen: _onOpen,
        onVideoError: _onError,
        onVideoProgress: _onProgress,
        onVideoEnded: _onEnded,
        onVideoEnd: _onEnded,
        onVideoPlaying: _onPlaying,
        onVideoPaused: _onPaused,
        // onVideoStopped: _onStopped,
        onVideoBuffering: _onBuffering,
        onVideoLoad: _onLoad,
        progressUpdateInterval,
    });
    return (React.createElement(RCTVLCPlayer, { ...nativeProps }));
}
const styles = StyleSheet.create({
    base: {
        overflow: "hidden",
    },
});
// const RCTVLCPlayer = requireNativeComponent("RCTVLCPlayer", VLCPlayer);
//# sourceMappingURL=VLCPlayer.js.map