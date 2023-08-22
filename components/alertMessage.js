import {useRef} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';


const FadeAnim = ({isAlarmMessage, toggleAlarmMessage, text}) => {

    const fadeAnim =useRef (new Animated.Value(0)).current; // useRef is used as it does not cause a re-render when updated. Persists values between renders.

    const startFadeAnim = () => { // alert message for when task cannot be selected
        toggleAlarmMessage(false);  // set animation back to false as it has now been toggled once. 
        fadeAnim.setValue(0);       // initial value of fadeAnim
    
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1, 
                duration: 0, 
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, { // React native function to animate fade animation. 
                toValue: 1, // Final value (opacity). 
                duration: 2000, // 2 seconds.
                useNativeDriver: true, // enables animations to be executed on the platform's native thread to prevent lag and for a smooth run. 
            }), // start animation (everything inside this bracket).
            Animated.timing(fadeAnim, {
                toValue: 0, 
                duration: 1000, 
                useNativeDriver: true,
            }),
        ]).start();
    };

    if (isAlarmMessage) { 
        startFadeAnim();
    }

    return (
            <Animated.View style={{opacity:fadeAnim}}>
                <View style={styles.anim}>
                    <Text style={styles.anim}>
                        <Text style={styles.text}>
                            {text}
                        </Text>
                    </Text>
                </View>
            </Animated.View>
    );
}

const styles = StyleSheet.create({
   
});

export default FadeAnim;