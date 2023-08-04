/**
 * Created by yuanzhou.xu on 2018/5/14.
 */
import React, { 
    useEffect, 
    useState,
    useRef
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    // StatusBar,
    // BackHandler,
    // Modal,
    Platform,
    ViewProps,
} from 'react-native';
import VLCPlayer, { VLCPlayerHandler } from '../VLCPlayer';
import TimeLimt from './TimeLimit';
import ControlBtn from './ControlBtn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStatusBarHeight } from './SizeController';
const statusBarHeight = getStatusBarHeight();
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


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

export default function VLCPlayerView (props: VLCPlayerViewProps) {
    // static propTypes = {
    //     uri: PropTypes.string,
    // };
    const [ paused, setPaused ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ loadingSuccess, setLoadingSuccess ] = useState(false);
    const [ isFull, setIsFull ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0.0);
    const [ totalTime, setTotalTime ] = useState(0.0);
    const [ showControls, setShowControls ] = useState(false);
    // const [ seek, setSeek ] = useState(0);
    const [ isError, setIsError ] = useState(false);
    const [ progress, setProgress ] = useState(0);

    const touchTime = useRef(0);
    const changeUrl = useRef(false);
    const isEnding = useRef(false);
    const reloadSuccess = useRef(false);
    const bufferTime = useRef(0);
    const changingSlider = useRef(false);
    
    const {
        initPaused = false,
        source = null,
        seek = 0,
        playInBackground = false,
        isGG = false,
        autoplay = true,
        errorTitle = 'Error play video, please try again',
        // isFull
    } = props;

    const vlcPlayer = useRef<VLCPlayerHandler>(null);
    const bufferInterval = useRef<any>(null);

    // componentDidMount() {
    //     if (this.props.isFull) {
    //         this.setState({
    //             showControls: true,
    //         });
    //     }
    // }
    useEffect(() => {
        if (props.isFull) {
            setShowControls(true);
        }
    }, []);


    useEffect(() => {
        return () => {
            // vlcPlayer.current?
            // _onStopped()
            if (bufferInterval.current) {
                clearInterval(bufferInterval.current);
                bufferInterval.current = null;
            }
        };
    }, []);

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.uri !== prevProps.uri) {
    //         console.log("componentDidUpdate");
    //         this.changeUrl = true;
    //     }
    // }

    // useEffect(() => {
    //     if (props.uri !== prevProps.uri) {
    //         console.log("componentDidUpdate");
    //         changeUrl = true;
    //     }
    // }, [props.uri]);

    /**
     * 视屏播放
     * @param event
     */
    const onPlaying = (event: any) => {
        isEnding.current = false;
        // if (this.state.paused) {
        //   this.setState({ paused: false });
        // }
        console.log('onPlaying');
    }

    /**
     * 视屏停止
     * @param event
     */
    const onPaused = (event: any) => {
        // if (!this.state.paused) {
        //   this.setState({ paused: true, showControls: true });
        // } else {
        //   this.setState({ showControls: true });
        // }
        console.log('onPaused');
    }

    /**
     * 视屏缓冲
     * @param event
     */
    const onBuffering = (event: any) => {
        // this.setState({
        //     isLoading: true,
        //     isError: false,
        // });
        setIsLoading(true);
        setIsError(false);
        bufferTime.current = new Date().getTime();
        if (!bufferInterval.current) {
            bufferInterval.current = setInterval(bufferIntervalFunction, 250);
        }
        console.log('onBuffering');
        console.log(event);
    }

    const bufferIntervalFunction = () => {
        console.log('bufferIntervalFunction');
        let currentTime = new Date().getTime();
        let diffTime = currentTime - bufferTime.current;
        if (diffTime > 1000) {
            clearInterval(bufferInterval.current);
            // this.setState({
            //     paused: true,
            // }, () => {
            //     this.setState({
            //         paused: false,
            //         isLoading: false,
            //     });
            // });
            setPaused(() => true);
            setPaused(() => false);
            setIsLoading(false);
            bufferInterval.current = null;
            console.log('remove  bufferIntervalFunction');
        }
    };

    const _onError = (e: any) => {
        // [bavv add start]
        let { onVLCError } = props;
        onVLCError && onVLCError();
        // [bavv add end]
        console.log('_onError');
        console.log(e);
        reloadSuccess.current = false;
        setIsError(true);
    };

    const _onOpen = (e: any) => console.log('onOpen', e);

    const _onLoadStart = (e: any) => {
        // console.log('_onLoadStart');
        // console.log(e);
        // // let { isError } = this.state;
        // if (isError) {
        //     reloadSuccess.current = true;
        //     // let { currentTime, totalTime } = this.state;
        //     if (Platform.OS === 'ios') {
        //         vlcPlayer.current?.seek(Number((currentTime / totalTime).toFixed(17)));
        //     } else {
        //         vlcPlayer.current?.seek(currentTime);
        //     }
        //     setPaused(() => true);
        //     setPaused(() => false);
        //     setIsError(false);
        // } else {
        //     vlcPlayer.current?.seek(0);
        //     setIsLoading(true);
        //     setIsError(false);
        //     setLoadingSuccess(false);
        //     setPaused(() => true);
        //     setPaused(() => false);
        //     setCurrentTime(() => 0.0);
        //     setTotalTime(() => 0.0);
        // }
    };

    const _reload = () => {
        // if (reloadSuccess.current) {
        //     vlcPlayer.current?.resume && vlcPlayer.current.resume(false);
        // }
    };

    /**
     * 视屏进度变化
     * @param event
     */
    const onProgress = (event: any) => {
        /* console.log(
         'position=' +
         event.position +
         ',currentTime=' +
         event.currentTime +
         ',remainingTime=' +
         event.remainingTime,
         );*/
        let currTime = event.currentTime;
        let currLoadingSuccess = false;
        if (currTime > 0 || currentTime > 0) {
            currLoadingSuccess = true;
        }
        if (!changingSlider.current) {
            if (currTime === 0 || currTime === currentTime * 1000) {
            } else {
                // this.setState({
                //     loadingSuccess: loadingSuccess,
                //     isLoading: false,
                //     isError: false,
                //     progress: event.position,
                //     currentTime: event.currentTime / 1000,
                //     totalTime: event.duration / 1000,
                // });
                setLoadingSuccess(currLoadingSuccess);
                setIsLoading(false);
                setIsError(false);
                setCurrentTime(event.currentTime / 1000);
                setTotalTime(event.duration / 1000);
                setProgress(event.position);
            }
        }
    }

    /**
     * 视屏播放结束
     * @param event
     */
    const onEnded = (event: any) => {
        console.log('onEnded ---------->')
        console.log(event)
        console.log('<---------- onEnded ')
        // let { currentTime, totalTime } = this.state;
        // [bavv add start]
        let { onVLCEnded, onEnd, autoplay, isGG } = props;
        onVLCEnded && onVLCEnded();
        // [bavv add end]
        if (((currentTime + 5) >= totalTime && totalTime > 0) || isGG) {
            setPaused(() => true);
            if (!isEnding.current) {
                onEnd && onEnd();
                if (!isGG) {
                    // vlcPlayer.current?.resume && vlcPlayer.current.resume(false);
                    console.log(props.uri + ':   onEnded');
                } else {
                    console.log('片头：' + props.uri + ':   onEnded');
                }
                isEnding.current = true;
            }
            
        } else {
            /* console.log('onEnded   error:'+this.props.uri);
             this.vlcPlayer.resume && this.vlcPlayer.resume(false);*/
            /*this.setState({
              paused: true,
            },()=>{
              console.log('onEnded   error:'+this.props.uri);
              this.reloadSuccess = false;
              this.setState({
                isError: true,
              });
            });*/
        }
    }

    /**
     * 全屏
     * @private
     */
    const _toFullScreen = () => {
        const { startFullScreen } = props;
        if (isFull) {
            closeFullScreen && closeFullScreen();
        } else {
            startFullScreen && startFullScreen();
        }
    };

    /**
     * 播放/停止
     * @private
     */
    const _play = () => setPaused(paused => !paused);

    const {
        onEnd,
        style,
        type,
        isFull: propIsFull,
        uri,
        title,
        onLeftPress,
        closeFullScreen,
        showBack,
        showTitle,
        videoAspectRatio = '16:9',
        showGoLive,
        onGoLivePress,
        onReplayPress,
        titleGolive,
        showLeftButton,
        showMiddleButton,
        showRightButton,
    } = props;
    // let { isLoading, loadingSuccess, showControls, isError } = this.state;
    let showGG = false;
    let realShowLoding = false;
    let src = {};
    if (uri) {
        if (uri.split) {
            src = { uri: props.uri };
        } else {
            src = uri;
        }
    }
    if (Platform.OS === 'ios') {
        if ((loadingSuccess && isGG) || (isGG && type === 'swf')) {
            showGG = true;
        }
        if (isLoading && type !== 'swf') {
            realShowLoding = true;
        }
    } else {
        if (loadingSuccess && isGG) {
            showGG = true;
        }
        if (isLoading) {
            realShowLoding = true;
        }
    }

    return (
    <TouchableOpacity
        activeOpacity={1}
        style={[styles.videoBtn, style]}
        onPressOut={() => {
            let currentTime = new Date().getTime();
            if (touchTime.current === 0 || currentTime - touchTime.current >= 500) {
                touchTime.current = currentTime;
                setShowControls(sc => !sc);
            }
        }}>
        <VLCPlayer
            // ref={vlcPlayer}
            paused={paused}
            //seek={this.state.seek}
            style={[styles.video]}
            source={source}
            videoAspectRatio={videoAspectRatio}
            onProgress={onProgress}
            onEnded={onEnded}
            //onEnded={this.onEnded.bind(this)}
            onStopped={onEnded}
            onPlaying={onPlaying}
            onVideoBuffering={onBuffering}
            onPaused={onPaused}
            progressUpdateInterval={250}
            onError={_onError}
            onVideoOpen={_onOpen}
            onVideoLoadStart={_onLoadStart}
        />
        {realShowLoding &&
            !isError && (
                <View style={styles.loading}>
                    <ActivityIndicator size={'large'} animating={true} color="#fff" />
                </View>
            )}
        {isError && (
            <View style={[styles.loading, { backgroundColor: '#000' }]}>
                <Text style={{ color: 'red' }}>{errorTitle}</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={_reload}
                    style={{
                        width: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}>
                    <Icon name={'reload'} size={45} color="#fff" />
                </TouchableOpacity>
            </View>
        )}
        <View style={styles.topView}>
            <View style={styles.backBtn}>
                {showBack && (
                    <TouchableOpacity
                        onPress={() => {
                            if (isFull) {
                                closeFullScreen && closeFullScreen();
                            } else {
                                onLeftPress && onLeftPress();
                            }
                        }}
                        style={styles.btn}
                        activeOpacity={0.8}>
                        <Icon name={'chevron-left'} size={30} color="#fff" />
                    </TouchableOpacity>
                )}
                <View style={{ justifyContent: 'center', flex: 1, marginRight: 10 }}>
                    {showTitle &&
                        showControls && (
                            <Text style={{ color: '#fff', fontSize: 16 }} numberOfLines={1}>
                                {title}
                            </Text>
                        )}
                </View>
                {showGG && (
                    <View style={styles.GG}>
                        <TimeLimt
                            onEnd={() => {
                                onEnd && onEnd();
                            }}
                        //maxTime={Math.ceil(this.state.totalTime)}
                        />
                    </View>
                )}
            </View>
        </View>
        <View style={[styles.bottomView]}>
            {showControls && (
                <ControlBtn
                    //style={isFull?{width:deviceHeight}:{}}
                    showSlider={!isGG}
                    showGG={showGG}
                    onEnd={onEnd}
                    title={title}
                    onLeftPress={onLeftPress}
                    paused={paused}
                    isFull={isFull}
                    currentTime={currentTime}
                    totalTime={totalTime}
                    onPausedPress={_play}
                    onFullPress={_toFullScreen}
                    onValueChange={value => {
                        changingSlider.current = true;
                        setCurrentTime(value);
                    }}
                    onSlidingComplete={value => {
                        changingSlider.current = false;
                        if (Platform.OS === 'ios') {
                            // vlcPlayer.current?.seek(Number((value / totalTime).toFixed(17)));
                        } else {
                            // vlcPlayer.current?.seek(value);
                        }
                    }}
                    showGoLive={showGoLive}
                    onGoLivePress={onGoLivePress}
                    onReplayPress={onReplayPress}
                    titleGolive={titleGolive}
                    showLeftButton={showLeftButton}
                    showMiddleButton={showMiddleButton}
                    showRightButton={showRightButton}
                />
            )}
        </View>
    </TouchableOpacity>
    );
    

  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoBtn: {
        flex: 1,
    },
    video: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    GG: {
        backgroundColor: 'rgba(255,255,255,1)',
        height: 30,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        top: Platform.OS === 'ios' ? statusBarHeight : 0,
        left: 0,
        height: 45,
        position: 'absolute',
        width: '100%',
        //backgroundColor: 'red'
    },
    bottomView: {
        bottom: 0,
        left: 0,
        height: 50,
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    backBtn: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 40,
        borderRadius: 20,
        width: 40,
        paddingTop: 3,
    },
});
