/**
 * Created by yuanzhou.xu on 2018/5/15.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    StatusBar,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text,
    Dimensions,
    BackHandler,
    ViewStyle,
} from 'react-native';

import VLCPlayerView from './VLCPlayerView';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStatusBarHeight } from './SizeController';
const statusBarHeight = getStatusBarHeight();
const _fullKey = 'commonVideo_android_fullKey';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

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

export default function CommonVideo(props: CommonVideoProps) {

    const {
        height: propHeight = 250,
        showGG = false,
        ggUrl = '',
        url = '',
        showBack = false,
        showTitle = false,
        widthCamera,
        isFull
    } = props;

    if(widthCamera) deviceWidth = widthCamera;

    // static navigationOptions = {
    //     header: null,
    // };
    const componentMounted = useRef(false);
    const initialHeight = useRef(200);

    const [isEndGG, setIsEndGG] = useState(false);
    const [isVidFull, setIsVidFull] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const [storeUrl, setStoreUrl] = useState('');
    const [ currentVideoAspectRatio, setCurrentVideoAspectRatio ] = useState(deviceWidth + ":" + 200);
    const [ width, setWidth ] = useState(0);
    const [ height, setHeight ] = useState(0);

    // const width = useRef(0);
    // const height = useRef(0);

    useEffect(() => {
        if (url && url !== storeUrl) {
            if (storeUrl === "") {
                setCurrentUrl(url);
                setStoreUrl(url);
                // setIsEndGG(false);
            } else {
                setCurrentUrl("");
                setStoreUrl(url);
                // setIsEndGG(false);
            }
        }
    }, [url]);

    useEffect(() => {
        if (url !== storeUrl && componentMounted.current) {
            setStoreUrl(url);
            setCurrentUrl(url);
        }
    }, [url]);

    // componentDidMount() {
    //     this._componentMounted = true
    //     StatusBar.setBarStyle("light-content");
    //     let { style, isGG } = this.props;

    //     if (style && style.height && !isNaN(style.height)) {
    //         this.initialHeight = style.height;
    //     }
    //     this.setState({
    //         currentVideoAspectRatio: deviceWidth + ":" + this.initialHeight,
    //     });

    //     let { isFull } = this.props;
    //     console.log(`isFull == ${isFull}`);
    //     if (isFull) {
    //         this._toFullScreen();
    //     }
    // }


    useEffect(() => {
        componentMounted.current = true;
        StatusBar.setBarStyle("light-content");
        const { style, isGG } = props;

        if (style && style.height && typeof style.height === 'number') {
            initialHeight.current = style.height;
        }
        setCurrentVideoAspectRatio(deviceWidth + ":" + initialHeight.current);

        // const { isFull } = props;
        console.log(`isFull == ${isFull}`);
        if (isFull) toFullScreen();

        return () => {
            componentMounted.current = false;
            if(isFull) closeFullScreen();
        }
    },[ isFull ]);

        

    // componentWillUnmount() {
    //     this._componentMounted = false;

    //     let { isFull } = this.props;
    //     if (isFull) {
    //         this._closeFullScreen();
    //     }
    // }

    const closeFullScreen = () => {
        const { closeFullScreen, BackHandle, Orientation } = props;
        if (componentMounted.current) {
            // this.setState({ isFull: false, currentVideoAspectRatio: deviceWidth + ":" + this.initialHeight, });
            setCurrentVideoAspectRatio(deviceWidth + ":" + initialHeight.current);
            setIsVidFull(false);

        }
        BackHandle && BackHandle.removeBackFunction(_fullKey);
        Orientation && Orientation.lockToPortrait;
        StatusBar.setHidden(false);
        //StatusBar.setTranslucent(false);
        componentMounted.current && closeFullScreen && closeFullScreen();
    };

    const toFullScreen = () => {
        const { startFullScreen, BackHandle, Orientation } = props;
        //StatusBar.setTranslucent(true);
        // this.setState({ isFull: true, currentVideoAspectRatio: deviceHeight + ":" + deviceWidth, });
        setCurrentVideoAspectRatio(deviceHeight + ":" + deviceWidth);
        setIsVidFull(true);
        StatusBar.setHidden(true);
        BackHandle && BackHandle.addBackFunction(_fullKey, closeFullScreen);
        startFullScreen && startFullScreen();
        Orientation && Orientation.lockToLandscape && Orientation.lockToLandscape;
    };

    const _onLayout = (e: any) => {
        let { 
            width: layoutWidth, 
            height: layoutHeight 
        } = e.nativeEvent.layout;
        console.log(e.nativeEvent.layout);

        if (layoutWidth * layoutHeight > 0) {
            // this.width = layoutWidth;
            // this.height = layoutHeight;
            if (!initialHeight.current) {
                initialHeight.current = layoutHeight;
            }
        }
    }

    let { 
        onGGEnd, 
        onEnd, 
        style, 
        title, 
        onLeftPress, 
        videoAspectRatio = null, 
        fullVideoAspectRatio = null
    } = props;
    
    let currVidAspectRatio: string | null = null;
    if (isFull) {
        currVidAspectRatio = fullVideoAspectRatio;
    } else {
        currVidAspectRatio = videoAspectRatio;
    }
    if (!currVidAspectRatio) {
        // let { width, height } = this.state;
        currVidAspectRatio = currentVideoAspectRatio;
    }
    let realShowGG = false;
    let type = '';
    let ggType = '';
    let showVideo = false;
    let showTop = false;
    if (showGG && ggUrl && !isEndGG) {
        realShowGG = true;
    }
    if (currentUrl) {
        if (!showGG || (showGG && isEndGG)) {
            showVideo = true;
        }
        if (currentUrl.split) {
            let types = currentUrl.split('.');
            if (types && types.length > 0) {
                type = types[types.length - 1];
            }
        }
    }
    if (ggUrl && ggUrl.split) {
        let types = ggUrl.split('.');
        if (types && types.length > 0) {
            ggType = types[types.length - 1];
        }
    }
    if (!showVideo && !realShowGG) {
        showTop = true;
    }
    return (
        <View
            //onLayout={this._onLayout}
            style={[isFull ? styles.container : { height: 200, backgroundColor: '#000' }, style]}>
            {showTop && <View style={styles.topView}>
                <View style={styles.backBtn}>
                    {showBack && <TouchableOpacity
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
                    }
                    <View style={{ justifyContent: 'center', flex: 1, marginRight: 10 }}>
                        {showTitle &&
                            <Text style={{ color: '#fff', fontSize: 16 }} numberOfLines={1}>{title}</Text>
                        }
                    </View>
                </View>
            </View>
            }
            {realShowGG && (
                <VLCPlayerView
                    {...props}
                    videoAspectRatio={currentVideoAspectRatio}
                    uri={ggUrl}
                    source={{ uri: ggUrl, type: ggType }}
                    type={ggType}
                    isGG={true}
                    showBack={showBack}
                    showTitle={showTitle}
                    isFull={isFull}
                    onEnd={() => {
                        onGGEnd && onGGEnd();
                        setIsEndGG(true);
                    }}
                    startFullScreen={toFullScreen}
                    closeFullScreen={closeFullScreen}
                />
            )}

            {showVideo && (
                <VLCPlayerView
                    {...props}
                    uri={currentUrl}
                    videoAspectRatio={currentVideoAspectRatio}
                    onLeftPress={onLeftPress}
                    title={title}
                    type={type}
                    isFull={isFull}
                    showBack={showBack}
                    showTitle={showTitle}
                    isGG={true}
                    // isEndGG={isEndGG}
                    //initPaused={this.state.paused}
                    style={showGG && !isEndGG ? { position: 'absolute', zIndex: -1 } : {}}
                    source={{ uri: currentUrl, type: type }}
                    startFullScreen={toFullScreen}
                    closeFullScreen={closeFullScreen}
                    onEnd={() => {
                        onEnd && onEnd();
                    }}
                />
            )}
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    topView: {
        top: Platform.OS === 'ios' ? statusBarHeight : 0,
        left: 0,
        height: 45,
        position: 'absolute',
        width: '100%'
    },
    backBtn: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: 40,
        borderRadius: 20,
        width: 40,
    }
});
