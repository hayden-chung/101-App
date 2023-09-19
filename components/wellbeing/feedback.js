import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {wellbeingData} from './wellbeingData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);
const EMJOI_SIZE = SCREEN_HEIGHT/10;

const Feedback = ({navigation, ratings}) => { // main function for wellbeing screen  
    console.log('ratings', ratings)

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
    console.log('aspectsToImprove', aspectsToImprove)


    return (
        <View style={styles.container}> 
            <View style={styles.wrapper}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxTitleText}>Improvements to make:</Text>

                        <View style={styles.improvementList}>
                            <FlatList
                                data={aspectsToImprove}
                                renderItem={({item, index}) => {
                                    if (aspectsToImprove[index] === true){
                                    return (
                                        
                                            <View>
                                                <Text style={styles.improveText}>{`\u2022 ${wellbeingData.label[index]}`}</Text>
                                            </View>

                                        );
                                    } else {
                                        return (null)
                                    }
                                }}
                            />
                        </View>
     
                </View>

                <View style={styles.boxContainer}>
                    <Text style={styles.boxTitleText}>
                        My Wellbeing Rating: {sumOfRatingsInPercentage}%
                    </Text>
                        {sumOfRatings <= 20 ? (
                            <View style={styles.emojiContainer}>
                                <Entypo name="emoji-sad" size={EMJOI_SIZE} color="red" style={styles.emojiFace}/>
                                <Text style={styles.emojiFaceText}>Poor</Text>
                            </View>
                        ) : sumOfRatings > 20 && sumOfRatings <= 40 ? (
                            <View style={styles.emojiContainer}>
                                <Entypo name="emoji-neutral" size={EMJOI_SIZE} color="orange" style={styles.emojiFace}/>
                                <Text style={styles.emojiFaceText}>Average</Text>
                            </View>
                        ) : (
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
  boxContainer: {
    flex: 1, 
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH/60,
    borderRadius: 20,
    elevation: 7,
    backgroundColor: 'white',
  },
  boxTitleText: {
    paddingTop: SCREEN_HEIGHT/60,
    paddingHorizontal: SCREEN_WIDTH/30,
    fontWeight: '600',
    fontSize: SCREEN_HEIGHT/50,
    textAlign: 'center',
  },
  improvementList: {
    marginTop: SCREEN_HEIGHT/60,
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiFace: {
    marginTop: SCREEN_HEIGHT/40,
  },
  emojiFaceText: {
    marginTop: SCREEN_HEIGHT/40,
    fontSize: SCREEN_HEIGHT/40,
    fontWeight: '500',
  },
  improveText: {
    color: '#5c5c5c',
  }

});


export default Feedback;