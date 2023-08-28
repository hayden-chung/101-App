import {useRef} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';


const AlertMessage = ({isAlarmMessage, toggleAlarmMessage, text, fontSize, fontColor}) => {

    const fadeAnim =useRef (new Animated.Value(0)).current; // useRef is used as it does not cause a re-render when updated. Persists values between renders.

    const startFadeAnim = () => { // alert message for when task cannot be selected
        toggleAlarmMessage(false);  // set animation back to false as it has now been toggled once. 
        fadeAnim.setValue(0);       // initial value of fadeAnim
    
        Animated.sequence([
            Animated.timing(fadeAnim, { // React native function to animate fade animation. 
                toValue: 1,             // Final value (opacity). 
                duration: 0,            // duration of animation
                useNativeDriver: true,  // enables animations to be executed on the platform's native thread to prevent lag and for a smooth run. 
            }),
            Animated.timing(fadeAnim, { 
                toValue: 1, 
                duration: 2000, 
                useNativeDriver: true, 
            }), 
            Animated.timing(fadeAnim, {
                toValue: 0, 
                duration: 1000, 
                useNativeDriver: true,
            }),
        ]).start(); // start animation (everything inside this bracket).
    };

    if (isAlarmMessage) { // When isAlarmMessage === true, start animation
        startFadeAnim();
    }

    return (
            <Animated.View style={{opacity:fadeAnim}}>
                {/* 'text' displays when 'startFadeAnim' is toggled, depending on opacity: fadeAnim */}
                <View style={styles.anim}>
                    <Text style={styles.anim}>
                        <Text style={[styles.text, { fontSize, color: fontColor }]} >
                            {text}
                        </Text>
                    </Text>
                </View>
            </Animated.View>
    );
}

const styles = StyleSheet.create({
   
});

export default AlertMessage;