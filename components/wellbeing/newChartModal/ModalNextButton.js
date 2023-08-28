import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';

export default NextButton = (props) => {

    const size = 100;
    const strokeWidth = 2;
    const center = size/2;
    const radius = size/2 - strokeWidth /2;
    const circumference = 2 * Math.PI * radius; 

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, { // Animted.timing = React Native's Animated API to create timed animation
            toValue, // the target value
            duration: 250, // 250 milliseconds
            useNativeDriver: true, // allows the native driver to send everything about the animation to native before starting the animatino
        }).start();
    };
        
    useEffect(() => {
        animation((props.pagePercentage))
    }, [(props.pagePercentage)]); // dependency array. every time this changes, the effect is re-executed. 

    useEffect(() => {
        progressAnimation.addListener((value) => { // addListener creates a smooth animation to the progress animation.
            const strokeDashoffset = circumference - (circumference * value.value) / 100;

            if (progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset
                });
            }
        },
        [(props.pagePercentage)]
        );
    });

    return (
        <View style={styles.container}>

            {/* Svg = image format library for React Native */}
            <Svg width={size} height={size}>

                {/* rotate the outline filler by -90 deg so it starts from the top */}
                <G rotation="-90" origin={center}>

                    {/* Circle (Empty) (before progress)*/}
                    <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth}/>

                    {/* Circle Outline (Full) (after progress. gets larger as page number increases)*/}
                    <Circle
                        ref={progressRef}
                        stroke="#F4338F"
                        cx={center}
                        cy={center} // 
                        r={radius} // radius of outline 
                        strokeWidth={strokeWidth} // border width
                        strokeDasharray={circumference} // pattern of dashes (outline) 
                        fill="white"
                    />
                </G>
            </Svg>

            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => props.changePage('right')}>
                <AntDesign name="arrowright" size={size * 0.27} color="#fff"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute', 
        backgroundColor: '#f4338f', 
        borderRadius: 100, 
        padding: 20,
    }
});