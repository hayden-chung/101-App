import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {wellbeingData} from './wellbeingData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);
const EMJOI_SIZE = SCREEN_HEIGHT/10;

const Feedback = ({navigation, ratings}) => { // main function for wellbeing screen  

    // Find sum of ratings (max 60) and find the percentage to find the overall wellbeing rating. 
    let sumOfRatings = 0
    for (let i = 0; i < ratings.length; i++) {
        sumOfRatings += ratings[i]
    } 
    const sumOfRatingsInPercentage = ((sumOfRatings/60)*100).toFixed(0)

    // make a list of aspects to improve (if a rating is below 5)
    let aspectsToImprove = [false, false, false, false, false, false]
    for (let i = 0; i < ratings.length; i++) {
        if (ratings[i] <= 5) {
            aspectsToImprove[i] = true
        }
    } 

    return (
        <View style={styles.container}> 
            <View style={styles.wrapper}>

                {/* Improvemnets to make box (left) */}
                <View style={styles.boxContainer}>
                    <Text style={styles.boxTitleText}>Improvements to make:</Text>

                        {/* List of aspects below 5 */}
                        <View style={styles.improvementList}>
                            <FlatList
                                data={aspectsToImprove}
                                renderItem={({item, index}) => {
                                    if (aspectsToImprove[index] === true){
                                    return (
                                            // Display item in text with bullet point
                                            <View>
                                                <Text style={styles.improveText}>{`\u2022 ${wellbeingData.label[index]}`}</Text>
                                            </View>

                                        );
                                    } else {
                                        // if aspect is not required to improve, display nothing
                                        return (null)
                                    }
                                }}
                            />
                        </View>
     
                </View>

                {/* Wellbeing rating box (right) */}
                <View style={styles.boxContainer}>

                    {/* Wellbeing rating Text */}
                    <Text style={styles.boxTitleText}>
                        My Wellbeing Rating: {sumOfRatingsInPercentage}%
                    </Text>

                        {/* If total rating below or equal to 20, poor */}
                        {sumOfRatings <= 20 ? (
                            <View style={styles.emojiContainer}>
                                <Entypo name="emoji-sad" size={EMJOI_SIZE} color="red" style={styles.emojiFace}/>
                                <Text style={styles.emojiFaceText}>Poor</Text>
                            </View>
                        // if greater than 20 and below 40, average
                        ) : sumOfRatings > 20 && sumOfRatings <= 40 ? (
                            <View style={styles.emojiContainer}>
                                <Entypo name="emoji-neutral" size={EMJOI_SIZE} color="orange" style={styles.emojiFace}/>
                                <Text style={styles.emojiFaceText}>Average</Text>
                            </View>
                        ) : (
                        // If greater than 40, good
                            <View style={styles.emojiContainer}>
                                <Entypo name="emoji-happy" size={EMJOI_SIZE} color="green" style={styles.emojiFace}/>
                                <Text style={styles.emojiFaceText}>Good</Text>
                            </View>
                        )}
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
  container: { // screen container
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingVertical: SCREEN_HEIGHT/90,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxContainer: { // small box containers (2 containers)
    flex: 1, 
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH/60,
    borderRadius: 20,
    elevation: 7,
    backgroundColor: 'white',
  },
  boxTitleText: { // Header text
    paddingTop: SCREEN_HEIGHT/60,
    paddingHorizontal: SCREEN_WIDTH/30,
    fontWeight: '600',
    fontSize: SCREEN_HEIGHT/50,
    textAlign: 'center',
  },
  improvementList: { // container of aspect improvement list
    marginTop: SCREEN_HEIGHT/60,
  },
  improveText: { // text styling for list of wellbeing improvements. 
    color: '#5c5c5c',
  },
  emojiContainer: { // emoji for wellbeing rating
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiFace: { // emoji
    marginTop: SCREEN_HEIGHT/40,
  },
  emojiFaceText: { // text below emoji (poor, average, good)
    marginTop: SCREEN_HEIGHT/40,
    fontSize: SCREEN_HEIGHT/40,
    fontWeight: '500',
  },

});


export default Feedback;