import React, {useState} from 'react';
import { StatusBar, StyleSheet, Text, View, Image, Dimensions, ScrollView, useWindowDimensions} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate} from 'react-native-reanimated';
import TodoList from './todoList';
import MiniTimetable from './miniTimetable';
import { TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Carousel = ({navigation}) => { 
    const data = [ 
        {object: 'item'},{object: 'item'},{object: 'item'},{object: 'item'}, 
    ];
    
    const [newData] = useState([{ // create space for left and right end of carousel.
        key: 'spacer-left'}, 
        ...data, 
        {key: 'spacer-right'}])

    const {width} = useWindowDimensions(); // width of screen
    const SIZE = width * 0.77; // width of component
    const SPACER = (width-SIZE) / 2;
    const x = useSharedValue(0); // allows variable (x value of object in this case) to be shared and manipulated in different places. 
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })
    


    return(     
        <Animated.ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            scrollEventThrottle={16}
            snapToInterval={SIZE} // snap at every interval value: SIZE
            decelerationRate="fast"
            onScroll={onScroll}>
            {newData.map((item, index) => {
                console.log(index)
                const style= useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value, 
                        [(index-2) * SIZE, (index-1) * SIZE, index * SIZE], 
                        [0.8, 1, 0.8]
                    );
                    console.log(x.value)
                    return{
                        transform: [{scale}],
                    }
                })
                if(!item.object){ // if item.object doesn't exist
                    return <View style={{width: SPACER}} key={index}/>;
                }
                return (
                    <View> 
                        <View style={[styles.container, {width: SIZE}]} key={index}>
                            <Animated.View style={[styles.componentContainer, style]}>

                                {index % 2 === 0 ?( // if index num is even, display todo list.
                                    <TodoList navigation={navigation}/>
                                ) :  // if index num is odd, display timetable. 
                                    <MiniTimetable navigation={navigation} small={true}/>
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
        height: SCREEN_HEIGHT/2,
    },
    boxContainer: {
        height: '100%',
    },
    componentContainer: {
        borderRadius: 34, 
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    componentTitle: {
        textAlign: 'center',
    },
});

export default Carousel;