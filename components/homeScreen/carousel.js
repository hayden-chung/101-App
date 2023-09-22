import React, {useState} from 'react';
import { StatusBar, StyleSheet, Text, View, Image, Dimensions, ScrollView, useWindowDimensions} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate} from 'react-native-reanimated';
import MiniTodoList from './miniTodoList';
import MiniTimetable from './miniTimetable';
import MiniQuote from './miniQuote'
import { TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Carousel = ({navigation}) => { 
    const data = [ 
        {key: 'spacer'}, {key: 'quote'}, {key: 'timetable'},{key: 'todo'},{key: 'spacer'}, // list of carousel
    ];

    const {width} = useWindowDimensions(); // width of screen
    const SIZE = width * 0.77; // width of component
    const SPACER = (width-SIZE) / 2;
    const x = useSharedValue(0); // allows variable (x value of object in this case) to be shared and manipulated in different places. 
    const onScroll = useAnimatedScrollHandler({ // when carousel is scrolled, change x pos of container. 
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })
    


    return(     
        <Animated.ScrollView 
            horizontal 
            overScrollMode="never"
            showsHorizontalScrollIndicator={false} 
            scrollEventThrottle={16}
            snapToInterval={SIZE} // snap at every interval value: SIZE
            decelerationRate="fast"
            onScroll={onScroll}>
            {/* render list of components (todo and timetable screen) */}
            {data.map((item, index) => {
                const style= useAnimatedStyle(() => {
                    // left, middle and right objects
                    const scale = interpolate(
                        x.value, 
                        [(index-2) * SIZE, (index-1) * SIZE, index * SIZE], 
                        [0.8, 1, 0.8]
                    );
                    return{
                        transform: [{scale}], // return scale of left, middle and right objects
                    }
                })
                if(item.key === 'spacer'){ // if item.object doesn't exist
                    return <View style={{width: SPACER}} key={index}/>;
                }
                return (
                    <View key={index}> 
                        <View style={[styles.container, {width: SIZE}]} key={index}>
                            {/* Aniamted.View allows smooth carousel animations for the three components. */}
                            <Animated.View style={[styles.componentContainer, style]}>

                                {item.key === 'todo' ? ( 
                                    // if item.key === todo, display todo 
                                    <MiniTodoList navigation={navigation}/>
                                ) : item.key === 'timetable' ? (
                                    // if item.key === 'timetable', displays timetable
                                    <MiniTimetable navigation={navigation} small={true}/>
                                ) : item.key === 'quote' ? (
                                    // if item.key === 'quote', displays quote
                                    <MiniQuote navigation={navigation}/>
                                ) : null
                                }
                            </Animated.View>
                        </View>
                    </View>
                );
            })}
        </Animated.ScrollView> 

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: SCREEN_HEIGHT/80,
        height: SCREEN_HEIGHT/2,
    },
    componentContainer: { // contains component 
        borderRadius: 30, 
        overflow: 'hidden',
        elevation: 5,
        backgroundColor: 'white',
    },
    componentTitle: { // title (timetable e.g.)
        textAlign: 'center',
    },
});

export default Carousel;