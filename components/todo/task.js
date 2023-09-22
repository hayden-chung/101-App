import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TagModal from './tagModal';
import PickEstimatedTime from './pickEstimatedTime';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

let checkIconSize = SCREEN_HEIGHT/30

const Task = ({text, timetableGenerator, taskStatus, taskTime, aspect, index, taskItems, setTaskItems, completedTask, updateWellbeingRating, miniScreen}) => { // Task Item

    const [isTagModalVisible, setTagModalVisible] = useState(false);
    const [isEstimatedTimeVisible, setEstimatedTimeVisible] = useState(false);


    return (
        <View style={[styles.item, taskStatus === true && timetableGenerator === false ? {backgroundColor:'#ededed'}:null, timetableGenerator === false ? {elevation: 5, marginHorizontal: SCREEN_HEIGHT/70,}:null, miniScreen?{borderWidth: 5, borderColor: '#e6ecf7'}:null]}>
            <View style={styles.itemLeft}>
                
                {/* Check box in timetable generator (circle fill) */}
                {timetableGenerator ? ( 
                    taskStatus ? ( // (Timetable Generator) If taskStatus = true, display selected circle, else display empty circle
                        <MaterialIcons name="radio-button-checked" size={checkIconSize} color="black" style={[styles.checkbox, {marginLeft: SCREEN_WIDTH/50}]}/>
                    ) : (
                        <MaterialIcons name="radio-button-unchecked" size={checkIconSize} color="black" style={[styles.checkbox, {marginLeft: SCREEN_WIDTH/50}]}/>
                    )
                ) : (
                // Check box in to-do screen (square check)
                    <TouchableOpacity
                        style={styles.checkButton}
                        onPress={() => {completedTask(index, taskItems, setTaskItems); updateWellbeingRating(index); }} // when quote pressed, change completed state (compelted/not completed)
                    >
                    {taskStatus ? ( // (To-Do Screen) If taskStatus = true, display checked checkbox, else display empty checkbox 
                            <Ionicons name="checkbox-sharp" size={checkIconSize} color="black" style={styles.checkbox} />
                        ) : (
                            <Ionicons name="checkbox-outline" size={checkIconSize} color="black" style={styles.checkbox}/>
                        )
                    }
                    </TouchableOpacity>
                )}

                {/*  Task Text */}
                <Text style={[styles.taskText, taskStatus && timetableGenerator === false ? { textDecorationLine: 'line-through' }: {}]}>{text}</Text> 
            </View>

            { !miniScreen ? (
            <View style={styles.itemsRight}>
                {/* ----- WELLBEING TAG ----- */}
                {aspect === null ? (
                // Display an empty box 
                <View style={styles.addTagContainer}>
                    <TouchableOpacity style={styles.addBoxTag} onPress={() => setTagModalVisible(true)}>
                        <Text style={styles.addBoxText}>+</Text>
                    </TouchableOpacity> 
                    <Text style={styles.belowBoxText}>Tag</Text>
                </View>
                ): 
                // Display an icon
                <TouchableOpacity style={styles.taggedBox} onPress={() => setTagModalVisible(true)}>
                    <View>
                        {aspect === 'work' && (
                            <Entypo name={'suitcase'} size={SCREEN_WIDTH/15} color="#3a46bf" />
                        )}
                        {aspect === 'exercise&nutrition' && (
                            <MaterialIcons name={'fitness-center'} size={SCREEN_WIDTH/15} color="orange" />
                        )}
                        {aspect === 'relaxation' && (
                            <FontAwesome5 name="coffee" size={SCREEN_WIDTH/19} color="#50bfd1" />
                        )}
                        {aspect === 'relationships' && (
                            <Entypo name={'chat'} size={SCREEN_WIDTH/15} color="#9e32db" />
                        )}
                        {aspect === 'sleep' && (
                            <MaterialCommunityIcons name={'power-sleep'} size={SCREEN_WIDTH/15} color="#f0ca00" />
                        )}
                        {aspect === 'personaldevelopment' && (
                            <MaterialCommunityIcons name={'head-cog'} size={SCREEN_WIDTH/15} color="#21a177" />
                        )}
                    </View>
                </TouchableOpacity>
                }
                {/* Wellbeing select aspect modal */}
                <Modal
                    transparent ={true} // covers screen completely but allows transparency in empty areas. 
                    animationType='fade' // fade animation when appearing/disappearing.
                    visible={isTagModalVisible} // modal is visible (true/false)
                    onRequestClose={() => setTagModalVisible(false)}
                >
                    <TagModal
                        setTagModalVisible={setTagModalVisible}
                        index={index}
                        taskItems={taskItems}
                        setTaskItems={setTaskItems}
                    />
                </Modal>

                {/* ----- ESTIMATED TIME ------ */}
                {/* If estimated time exists */}
                {taskTime !== null ? (
                    <TouchableOpacity style={styles.timeBox} onPress={() => setEstimatedTimeVisible(true)}>
                        <Text style={styles.estimatedTime}> {taskTime}h </Text>
                    </TouchableOpacity> 
                ) : 
                // No estimated time
                <View style={styles.addTagContainer}>
                    <TouchableOpacity style={styles.addBoxTime} onPress={() => setEstimatedTimeVisible(true)}>
                        <Text style={styles.addBoxText}>+</Text>
                    </TouchableOpacity> 
                    <Text style={styles.belowBoxText}>Time</Text>
                </View>
                }
                {/* Timer Picker Modal */}
                <PickEstimatedTime
                    setEstimatedTimeVisible={setEstimatedTimeVisible}
                    isEstimatedTimeVisible={isEstimatedTimeVisible}
                    taskItems={taskItems}
                    setTaskItems={setTaskItems}
                    index={index}
                />
            </View>
            ) : <View style={styles.fill}></View>}
            
        </View>
  );
}

const styles = StyleSheet.create({
    item: { // quote Item
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingTop: SCREEN_HEIGHT/1000,
        paddingRight: SCREEN_HEIGHT/70,
        paddingBottom: SCREEN_HEIGHT/70,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'white',

    },
    itemLeft: { // text and checkbox
        paddingTop: SCREEN_HEIGHT/80,
        flexDirection: 'row',
        alignItems: 'center',
        width: '65%',
    },
    itemsRight: { // tag and estimated time
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: SCREEN_WIDTH/40,
    },
    fill: {
        width: SCREEN_WIDTH/4.5,
        backgroundColor: 'green',
    },
    checkbox: {
        marginRight: 15,
    },
    checkButton: {
        paddingVertical: SCREEN_HEIGHT/170, 
        paddingLeft: SCREEN_HEIGHT/70,
    },
    taskText:{
        maxWidth: '65%',
    },
    estimatedTime: { // box
        color: 'gray',
    },
    addTagContainer: { // box
        flexDirection: 'column',
        alignItems: 'center',
        top: SCREEN_HEIGHT/93,
    },
    addBoxTag: {  // add box tag 
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/12,
        height: SCREEN_WIDTH/12,
        borderRadius: SCREEN_HEIGHT/120,
        borderWidth: SCREEN_HEIGHT/400,
    },
    taggedBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/12,
        height: SCREEN_WIDTH/12,
        borderRadius: SCREEN_HEIGHT/120,
        borderWidth: SCREEN_HEIGHT/400,
        borderColor: '#d1d1d1',
    },
    addBoxTime: { // time text
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/6.6,
        height: SCREEN_WIDTH/12,
        borderRadius: SCREEN_HEIGHT/120,
        borderWidth: SCREEN_HEIGHT/400,
        marginLeft: SCREEN_WIDTH/30,
    },
    timeBox: { // estaimted timetbox
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/6.6,
        height: SCREEN_WIDTH/12,
        borderRadius: SCREEN_HEIGHT/120,
        borderWidth: SCREEN_HEIGHT/400,
        borderColor: '#d1d1d1',
        marginLeft: SCREEN_WIDTH/30,    
    },
    addBoxText: { // add box label below
        fontSize: SCREEN_HEIGHT/30,
        lineHeight: SCREEN_HEIGHT / 27, 
        textAlignVertical: 'center',
    },
    belowBoxText: { // label below tag and estimated time 
        fontSize: SCREEN_HEIGHT/70,
        marginLeft: SCREEN_WIDTH/40,    
    },
});

export default Task;