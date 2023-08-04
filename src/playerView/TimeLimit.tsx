/**
 * Created by yuanzhou.xu on 2018/5/16.
 */
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
    maxTime?: number;
    onEnd: () => void;
}

export default function TimeLimt({ maxTime = 0, onEnd }: Props) {

    let timer = useRef<any>(null);

    const [ timeNumber, setTimeNumber ] = useState(0);

    useEffect(() => {
        if (maxTime > 0) {
            timer.current = setInterval(updateTimer, 1000);
        }
        return () => {
            clearInterval(timer.current);
        };
    }, []);

    const updateTimer = () => {

        setTimeNumber(t => t + 1);
        if (timeNumber + 1 >= maxTime) onEnd()
    };

    const _onEnd = () => {
        clearInterval(timer.current);
        onEnd && onEnd();
    };

    return (
        <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={_onEnd}
            activeOpacity={1}>
            {maxTime > 0 && (
                <View style={styles.timeView}>
                    <Text style={{ color: 'green', fontSize: 13 }}>{maxTime - timeNumber}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#000',
    },
    timeView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    nameView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
