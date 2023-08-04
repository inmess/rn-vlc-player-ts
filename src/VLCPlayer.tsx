import React, { 
    useRef, 
    forwardRef, 
    useImperativeHandle 
} from "react";
import {
    ViewProps,
    StyleSheet,
    NativeModules,
    requireNativeComponent
} from 'react-native'
import { Image } from "react-native";
import { requireNativeViewManager } from 'expo-modules-core';


type VLCPlayerProps = {
    rate?: number,
    seek?: number;
    resume?: boolean;
    snapshotPath?: string;
    paused?: boolean;
    autoplay?: boolean;
    initOptions?: string[];

    autoAspectRatio?: boolean;
    videoAspectRatio?: string;
    volume?: number;
    disableFocus?: boolean;
    src?: string;
    playInBackground?: boolean;
    playWhenInactive?: boolean;
    resizeMode?: string;
    poster?: string;
    repeat?: boolean;
    muted?: boolean;
    audioTrack?: number;
    textTrack?: number;
    progressUpdateInterval?: number;

    onVideoLoadStart?: (event?: any) => void;
    onVideoError?: (event?: any) => void;
    onVideoProgress?: (event?: any) => void;
    onVideoEnded?: (event?: any) => void;
    onVideoPlaying?: (event?: any) => void;
    onVideoPaused?: (event?: any) => void;
    onVideoStopped?: (event?: any) => void;
    onVideoBuffering?: (event?: any) => void;
    onVideoOpen?: (event?: any) => void;
    onVideoLoad?: (event?: any) => void;

    /* Wrapper component */
    source: {
        uri: string;
    } | number;
    subtitleUri?: string;

    onError?: (event?: any) => void;
    onProgress?: (event?: any) => void;
    onEnded?: (event?: any) => void;
    onStopped?: (event?: any) => void;
    onPlaying?: (event?: any) => void;
    onPaused?: (event?: any) => void;

    /* Required by react-native */
    scaleX?: number;
    scaleY?: number;
    translateX?: number;
    translateY?: number;
    rotation?: number;
} & ViewProps;

const RCTVLCPlayer = requireNativeComponent('RCTVLCPlayer');
    // requireNativeViewManager('RCTVLCPlayer');

export interface VLCPlayerHandler {
    // seek: (pos: number) => void;
    // resume: (isResume: boolean) => void;
    // snapshot: (path: string) => void;
    // autoAspectRatio: (isAuto: boolean) => void;
    // changeVideoAspectRatio: (ratio: string) => void;
    _onBuffering: (event: any) => void;
    _onError: (event: any) => void;
    _onOpen: (event: any) => void;
    _onLoadStart: (event: any) => void;
    _onProgress: (event: any) => void;
    _onEnded: (event: any) => void;
    // _onStopped: () => void;
    _onPaused: (event: any) => void;
    _onPlaying: (event: any) => void;
    _onLoad: (event: any) => void;
}

export default function VLCPlayer(props: VLCPlayerProps) {
    const {
        progressUpdateInterval = 250,
        paused = false,
        seek = 0,
        resume = false,
        snapshotPath = "",
        autoAspectRatio = false,
        videoAspectRatio = "",

    } = props;

    const vlcRef = useRef<typeof RCTVLCPlayer>(null)

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
    

    const _onBuffering = (event: any) => {
        if (props.onVideoBuffering) {
            props.onVideoBuffering(event.nativeEvent);
        }
    }

    const _onError = (event: any) => {
        if (props.onError) {
            props.onError(event.nativeEvent);
        }
    }

    const _onOpen = (event: any) => {
        if (props.onVideoOpen) {
            props.onVideoOpen(event.nativeEvent);
        }
    }

    const _onLoadStart = (event: any) => {
        if (props.onVideoLoadStart) {
            props.onVideoLoadStart(event.nativeEvent);
        }
    }

    const _onProgress = (event: any) => {
        if (props.onVideoProgress) {
            props.onVideoProgress(event.nativeEvent);
        }
    }

    const _onEnded = (event: any) => {
        if (props.onEnded) {
            props.onEnded(event.nativeEvent);
        }
    }

    // const _onStopped = () => {
    //     setNativeProps({ paused: true });
    //     if (props.onStopped) {
    //         props.onStopped();
    //     }
    // }

    const _onPaused = (event: any) => {
        if (props.onPaused) {
            props.onPaused(event.nativeEvent);
        }
    }

    const _onPlaying = (event: any) => {
        if (props.onPlaying) {
            props.onPlaying(event.nativeEvent);
        }
    }

    const _onLoad = (event: any) => {
        if (props.onVideoLoad) {
            props.onVideoLoad(event.nativeEvent);
        }
    }

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

    if (uri && uri.match(/^\//)) uri = `file://${uri}`

    let isNetwork = !!(uri && uri.match(/^https?:/));

    const isAsset = !!(
        uri && uri.match(/^(assets-library|file|content|ms-appx|ms-appdata):/)
    );

    if (!isAsset) isNetwork = true;

    if (uri && uri.match(/^\//)) isNetwork = false;

    const {
        autoplay = true,
        initOptions = [],
    } = props

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

    return (<RCTVLCPlayer {...nativeProps } />);
}



const styles = StyleSheet.create({
    base: {
        overflow: "hidden",
    },
});
// const RCTVLCPlayer = requireNativeComponent("RCTVLCPlayer", VLCPlayer);
