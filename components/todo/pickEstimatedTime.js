import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from 'expo-linear-gradient';
import { TimerPickerModal } from "react-native-timer-picker";

const PickEstimatedTime = ({setEstimatedTimeVisible, isEstimatedTimeVisible, taskItems, setTaskItems, index}) => {

    
    onConfirmPressed = (pickedDuration) => {
        const hours = pickedDuration['hours']
        const minutes = pickedDuration['minutes']
        const timeValue = (hours + minutes/60).toFixed(2)
        let updatedList = [...taskItems]
        updatedList[index][3] = timeValue
        setTaskItems(updatedList)
    }

    return (
            <TimerPickerModal
                visible={isEstimatedTimeVisible}
                hideSeconds
                setIsVisible={setEstimatedTimeVisible}
                disableInfiniteScroll={false}
                onConfirm={(pickedDuration) => {
                    onConfirmPressed(pickedDuration)
                    setEstimatedTimeVisible(false);
                }}
                modalTitle="Set Alarm"
                onCancel={() => setEstimatedTimeVisible(false)}
                closeOnOverlayPress
                LinearGradient={LinearGradient}
                styles={{
                    theme: "light",
                }}
            />

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zindex: 0,
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: 'blue',
    }
})



export default PickEstimatedTime;
