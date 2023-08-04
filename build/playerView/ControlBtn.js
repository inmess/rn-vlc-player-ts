/**
 * Created by yuanzhou.xu on 2018/5/16.
 */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ControlBtn(props) {
    const { titleGolive = 'Go live', showLeftButton = true, showMiddleButton = true, showRightButton = true } = props;
    const getTime = (data = 0) => {
        let hourCourse = Math.floor(data / 3600);
        let diffCourse = data % 3600;
        let minCourse = Math.floor(diffCourse / 60);
        let secondCourse = Math.floor(diffCourse % 60);
        let courseReal = '';
        if (hourCourse) {
            if (hourCourse < 10) {
                courseReal += '0' + hourCourse + ':';
            }
            else {
                courseReal += hourCourse + ':';
            }
        }
        if (minCourse < 10) {
            courseReal += '0' + minCourse + ':';
        }
        else {
            courseReal += minCourse + ':';
        }
        if (secondCourse < 10) {
            courseReal += '0' + secondCourse;
        }
        else {
            courseReal += secondCourse;
        }
        return courseReal;
    };
    let { paused, isFull, showGG, showSlider, showGoLive, onGoLivePress, onReplayPress, onPausedPress, onFullPress, onValueChange, onSlidingComplete, currentTime, totalTime, onLeftPress, title, onEnd, style } = props;
    return (React.createElement(View, { style: [styles.controls, style] },
        React.createElement(View, { style: styles.controlContainer },
            React.createElement(TouchableOpacity, { style: styles.controlContent, activeOpacity: 1 },
                React.createElement(View, { style: styles.controlContent2 },
                    React.createElement(View, { style: styles.right },
                        showLeftButton ? (React.createElement(TouchableOpacity, { activeOpacity: 1, onPress: () => {
                                onReplayPress && onReplayPress();
                            }, style: { width: 50, alignItems: 'center', justifyContent: 'center' } },
                            React.createElement(Icon, { name: 'replay', size: 30, color: "#fff" }))) : React.createElement(View, { style: { width: 50 } }),
                        React.createElement(Text, { style: { fontSize: 11, color: '#fff' } }, "       ")),
                    showMiddleButton && (React.createElement(TouchableOpacity, { activeOpacity: 1, onPress: () => {
                            onPausedPress && onPausedPress(!paused);
                        }, style: { width: 50, alignItems: 'center', justifyContent: 'center' } },
                        React.createElement(Icon, { name: paused ? 'play' : 'pause', size: 30, color: "#fff" }))),
                    React.createElement(View, { style: styles.right },
                        React.createElement(TouchableOpacity, { activeOpacity: 1, onPress: () => {
                                onGoLivePress && onGoLivePress();
                            } },
                            React.createElement(Text, { style: { fontSize: 11, color: '#fff' } }, showGoLive ? titleGolive : '       ')),
                        showRightButton ? (React.createElement(TouchableOpacity, { activeOpacity: 1, onPress: () => {
                                onFullPress && onFullPress(!isFull);
                            }, style: { width: 50, alignItems: 'center', justifyContent: 'center' } },
                            React.createElement(Icon, { name: isFull ? 'fullscreen-exit' : 'fullscreen', size: 30, color: "#fff" }))) : React.createElement(View, { style: { width: 50 } })))))));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#000',
    },
    controls: {
        width: '100%',
        height: 50,
    },
    rateControl: {
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        //backgroundColor: 'rgba(0,0,0,0.5)',
        width: 120,
        height: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
    },
    controlOption: {
        textAlign: 'center',
        fontSize: 13,
        color: '#fff',
        width: 30,
        //lineHeight: 12,
    },
    controlContainer: {
        flex: 1,
        //padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlContent: {
        width: '100%',
        height: 50,
        //borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    controlContent2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progress: {
        flex: 1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumb: {
        width: 6,
        height: 18,
        backgroundColor: '#fff',
        borderRadius: 4,
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
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
//# sourceMappingURL=ControlBtn.js.map