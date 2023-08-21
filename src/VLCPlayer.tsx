import React from "react";
import {
    ViewProps,
    StyleSheet,
    Platform
} from 'react-native'
import RCTVLCPlayer from "./RCTVLCPlayer";


type VLCPlayerProps = {
    rate?: number,
    seek?: number;
    resume?: boolean;
    snapshotPath?: string;
    paused?: boolean;
    autoplay?: boolean;
    initOptions?: string[];
    mediaOptions?: string[];

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
    source?: {
        uri: string;
    };
    subtitleUri?: string;

    onError?: (event?: any) => void;
    onProgress?: (event?: any) => void;
    onEnded?: (event?: any) => void;
    onStopped?: (event?: any) => void;
    onPlaying?: (event?: any) => void;
    onPaused?: (event?: any) => void;

    // /* Required by react-native */
    // scaleX?: number;
    // scaleY?: number;
    // translateX?: number;
    // translateY?: number;
    // rotation?: number;
} & ViewProps;

export default function VLCPlayer(props: VLCPlayerProps) {
    const {
        // progressUpdateInterval = 250,
        paused = false,
        seek = 0,
        resume = false,
        snapshotPath = "",
        // autoAspectRatio = false,
        videoAspectRatio = "",
        // subtitleUri = "",
        rate = 1,
        muted = false,
        // audioTrack = -1,
        // textTrack = -1,
    } = props;

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

    

    const _onBuffering = (event: any) => {
        if (props.onVideoBuffering) {
            props.onVideoBuffering(event);
        }
    }

    const _onError = (event: any) => {
        if (props.onError) {
            props.onError(event);
        }
    }

    const _onOpen = (event: any) => {
        if (props.onVideoOpen) {
            props.onVideoOpen(event);
        }
    }

    const _onLoadStart = (event: any) => {
        if (props.onVideoLoadStart) {
            props.onVideoLoadStart(event);
        }
    }

    const _onProgress = (event: any) => {
        if (props.onVideoProgress) {
            props.onVideoProgress(event);
        }
    }

    const _onEnded = (event: any) => {
        if (props.onEnded) {
            props.onEnded(event);
        }
    }

    const _onPaused = (event: any) => {
        if (props.onPaused) {
            props.onPaused(event);
        }
    }

    const _onPlaying = (event: any) => {
        if (props.onPlaying) {
            props.onPlaying(event);
        }
    }

    const _onLoad = (event: any) => {
        if (props.onVideoLoad) {
            props.onVideoLoad(event);
        }
    }

    const _onStopped = (event: any) => {
        if(props.onVideoStopped) {
            props.onVideoStopped(event)
        }
    }

    let uri = props.source?.uri || "";

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
        mediaOptions = [],
    } = props

    let options: any 
    let opList: string[] = [...initOptions, '--input-repeat=1000']

    if(Platform.OS === "ios") {
        options = opList.reduce((acc, cur) => {
            if(!cur.startsWith("--")) return acc
            cur = cur.slice(2)
            const [key, value] = cur.split("=")
            acc[key] = value
            return acc
        }, {})
    } else {
        options = opList
    }

    const source = {
        uri,
        isNetwork,
        autoplay,
        initOptions: options,
        mediaOptions,
    };
    
    const nativeProps = {
        // ...props,
        style: [styles.base, props.style],
        source,
        paused,
        // seek,
        // resume,
        snapshotPath,
        videoAspectRatio,
        // subtitleUri,
        muted,
        rate,
        onVideoLoadStart: _onLoadStart,
        onVideoOpen: _onOpen,
        onVideoError: _onError,
        onVideoProgress: _onProgress,
        onVideoEnded: _onEnded,
        onVideoEnd: _onEnded,
        onVideoPlaying: _onPlaying,
        onVideoPaused: _onPaused,
        onVideoStopped: _onStopped,
        onVideoBuffering: _onBuffering,
        onVideoLoad: _onLoad,

        // onVideoProgress,
        // onVideoPaused,
        // onVideoStopped,
        // onVideoBuffering,
        // onVideoPlaying,
        // onVideoEnded,
        // onVideoError,
        // onVideoOpen,
        // onVideoLoadStart,
        // onVideoLoad,
        // progressUpdateInterval,
    };

    return (<RCTVLCPlayer {...nativeProps } />);
}



const styles = StyleSheet.create({
    base: {
        overflow: "hidden",
        flex: 1
    },
});
// const RCTVLCPlayer = requireNativeComponent("RCTVLCPlayer", VLCPlayer);
