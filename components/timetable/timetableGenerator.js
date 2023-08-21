import React, {useState, useRef} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Animated} from 'react-native';
import Task from '../todo/task';
import {TaskItemsList} from '../todo/taskItemsList';
import {selectedTask} from '../todo/taskControls'; // import taskControl functions
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {GenerateTimetable} from './timetableGeneratorAlgorithm';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height); 

export let timetable = [] 

const TimetableGenerator = ({navigation}) => { 

    const {taskItems, setTaskItems} = TaskItemsList();// destructure function (TaskItemsList) into 'taskItems' variable and 'setTaskItems' function.
    const [isBreakChecked, setBreakChecked] = useState(false); // 'Fill With Breaks' checkbox.
    const [isAlarmMessage, toggleAlarmMessage] = useState(false); // Alarm message for when user presses task with no estimated time. 

    const fadeAnim =useRef (new Animated.Value(0)).current; // useRef is used as it does not cause a re-render when updated. Persists values between renders.

    // const navigation = useNavigation()

    const register = (timetable) => { // send timetable parameter to timetable screen function. 
        navigation.navigate("TimetableScreen", {
            timetable: timetable // reference variable: variable to send
        })
    }



    const handleAlarmMessage = () => { // alert message for when task cannot be selected
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

    const onGenerateTimetablePressed = () => {
        timetable = []
        timetable = GenerateTimetable(taskItems, timetable)
        register(timetable)
    }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.subTitle}>Select today's tasks...</Text>
                <View style={styles.taskWrapper}>
                    <FlatList   
                    data = {taskItems}                   // Data being inputted for flatlist to access.
                    showsVerticalScrollIndicator={false} // Hide scroll bar.
                    renderItem={({item, index}) =>       // Item and index no. of task in array. 
                        <TouchableOpacity                // Task is responsive to touches
                        onPress={() => { // when quote pressed, 
                            selectedTask(index, taskItems, setTaskItems, toggleAlarmMessage, isAlarmMessage); // select/unselect task (if possible)
                            if (isAlarmMessage) { // if this variable is true, 
                                handleAlarmMessage(); // use function for popup alert message
                            }
                        }}>

                        {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                        <Task text={item[0]} timetableGenerator={true} taskStatus={taskItems[index][2]} taskTime={taskItems[index][3]} /> 
                        </TouchableOpacity>
                    }/>
                </View>

                <Animated.View style={{opacity:fadeAnim}}>
                    <View style={styles.anim}>
                        <Text style={styles.anim}>
                            <Text style={styles.text}>
                                You can only select tasks with an estimated time 
                            </Text>
                        </Text>
                    </View>

                </Animated.View>
                
                
                <TouchableOpacity style={styles.timetableSettingsButton} onPress={() => navigation.navigate("TimetableSettings")}>
                    <Text>Timetable Settings</Text>
                </TouchableOpacity>

                {/* ---------- Generate Timetable Button ---------- */}
                <TouchableOpacity style={styles.generateButton} onPress={() => onGenerateTimetablePressed()}> 
                    <MaterialCommunityIcons name="gesture-double-tap" size={SCREEN_HEIGHT/10} color="white" />
                </TouchableOpacity>

                <Text style={styles.buttonDescription}>GENERATE TIMETABLE</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#FF7276',
    },
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        height: '75%',
        paddingTop: SCREEN_HEIGHT/20,
        // backgroundColor: 'yellow',
    },
    title: {
        fontSize: SCREEN_HEIGHT/25,
        fontWeight: '600',
        color: 'white',
    },
    subTitle: {
        paddingTop: SCREEN_HEIGHT/80,
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '500',
        color: 'white',
    },
    taskWrapper: { // container for list of quotes. 
        width: '100%',
        height: '90%',
        marginTop: SCREEN_HEIGHT/80,
        paddingTop: SCREEN_HEIGHT/100,
        paddingHorizontal: SCREEN_HEIGHT/100,
        borderRadius: 15,
        borderWidth: 5, 
        backgroundColor: '#E8EAED',
        borderColor: 'black',
    },
    breakCheckBoxWrapper: {
        flexDirection: 'row',
        paddingTop: SCREEN_HEIGHT/70,
    },
    breakCheckBoxText: {
        fontSize: SCREEN_HEIGHT/45,
        paddingRight: SCREEN_WIDTH/30,
        color: 'white',
    },
    timetableSettingsButton: {
        width: SCREEN_WIDTH/1.5,
        height: SCREEN_HEIGHT/30,
        backgroundColor: 'yellow',
        alignItems: 'center',
    },
    generateButton: {
        marginTop: SCREEN_HEIGHT/50,
        padding: SCREEN_HEIGHT/100,
        borderRadius: 200,
        borderWidth: SCREEN_HEIGHT/200,
        borderColor: 'white',
    },
    buttonDescription: {
        color: 'white',
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '500',
        paddingTop: SCREEN_HEIGHT/50,
        paddingBottom: SCREEN_HEIGHT/50,
    },
});

export default TimetableGenerator;