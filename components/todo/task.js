import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TagModal from './tagModal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

let checkIconSize = SCREEN_HEIGHT/30

const Task = ({text, timetableGenerator, taskStatus, taskTime, aspect, index, taskItems, setTaskItems}) => {

    const [isTagModalVisible, setTagModalVisible] = useState(false);
    const [isAspect, setAspect] = useState(aspect);
    console.log('aspect', isAspect);

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                
                {timetableGenerator ? ( 
                    taskStatus ? ( // (Timetable Generator) If taskStatus = true, display selected circle, else display empty circle
                        <MaterialIcons name="radio-button-checked" size={checkIconSize} color="black" style={styles.checkbox}/>
                    ) : (
                        <MaterialIcons name="radio-button-unchecked" size={checkIconSize} color="black" style={styles.checkbox}/>
                    )
                ) : (
                    taskStatus ? ( // (To-Do Screen) If taskStatus = true, display checked checkbox, else display empty checkbox 
                        <Ionicons name="checkbox-sharp" size={checkIconSize} color="black" style={styles.checkbox} />
                    ) : (
                        <Ionicons name="checkbox-outline" size={checkIconSize} color="black" style={styles.checkbox}/>
                    )
                )}

                {/*  Task Text */}
                <Text style={styles.taskText}>{text}</Text> 
            </View>

            {isAspect === null ? (

            <View style={styles.addTagContainer}>
                <TouchableOpacity style={styles.addBox} onPress={() => setTagModalVisible(true)}>
                    <Text style={styles.addBoxText}>+</Text>
                </TouchableOpacity> 
                <Text style={styles.tagText}>Tag</Text>
            </View>
            ): 
            <TouchableOpacity onPress={() => setTagModalVisible(true)}>
                <View>
                    {isAspect === 'work' && (
                        <Entypo name={'suitcase'} size={SCREEN_WIDTH/15} color="#3a46bf" />
                    )}
                    {isAspect === 'exercise&nutrition' && (
                        <MaterialIcons name={'fitness-center'} size={SCREEN_WIDTH/15} color="orange" />
                    )}
                    {isAspect === 'relaxation' && (
                        <FontAwesome5 name="coffee" size={SCREEN_WIDTH/15} color="#50bfd1" />
                    )}
                    {isAspect === 'relationships' && (
                        <Entypo name={'chat'} size={SCREEN_WIDTH/15} color="#9e32db" />
                    )}
                    {isAspect === 'sleep' && (
                        <MaterialCommunityIcons name={'power-sleep'} size={SCREEN_WIDTH/15} color="#f0ca00" />
                    )}
                    {isAspect === 'personaldevelopment' && (
                        <MaterialCommunityIcons name={'head-cog'} size={SCREEN_WIDTH/15} color="#21a177" />
                    )}
                </View>
            </TouchableOpacity>
            }

            {/* Estimated Time */}
            {taskTime !== null ? (
                <Text style={styles.estimatedTime}> ({taskTime}h) </Text>
            ) : null}

            <Modal
                transparent ={true} // covers screen completely but allows transparency in empty areas. 
                animationType='fade' // fade animation when appearing/disappearing.
                visible={isTagModalVisible} // modal is visible (true/false)
                onRequestClose={() => setTagModalVisible(false)}
            >
                <TagModal
                    setAspect={setAspect}
                    setTagModalVisible={setTagModalVisible}
                    index={index}
                    taskItems={taskItems}
                    setTaskItems={setTaskItems}
                />
            </Modal>
            
        </View>
  );
}

const styles = StyleSheet.create({
    item: { // quote Item
        padding: SCREEN_HEIGHT/60,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 10,
    },
    itemLeft: { 
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    checkbox: {
        marginRight: 15,
    },
    taskText:{
        maxWidth: '80%',
    },
    estimatedTime: {
        color: 'gray',
    },
    addTagContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    addBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/12,
        height: SCREEN_WIDTH/12,
        borderRadius: SCREEN_HEIGHT/120,
        borderWidth: SCREEN_HEIGHT/400,
    },
    addBoxText: {
        fontSize: SCREEN_HEIGHT/30,
        lineHeight: SCREEN_HEIGHT / 27, 
        textAlignVertical: 'center',
    },
    tagText: {
        fontSize: SCREEN_HEIGHT/60,
    },
});

export default Task;