import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {updateTag} from './taskControls';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const TagModal = ({setTagModalVisible, index, taskItems, setTaskItems}) => { // Wellbeing aspect tag modal

  const handlePressed = (aspect) => { // return aspect and close modal
    updateTag(index, taskItems, setTaskItems, aspect);
    setTagModalVisible(false);
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>

        {/* Close modal button */}
        <TouchableOpacity style={styles.exitContainer} onPress={() => setTagModalVisible(false)}>
          <Text style={styles.exitText}>x</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Tag an aspect:</Text>
        </View>

        {/* Aspect Button (work): If this icon is pressed (work), call function to update tag and close modal. */}
        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('work')}>
          <View style={styles.iconBox}>
            <Entypo name={'suitcase'} size={SCREEN_WIDTH/15} color="#3a46bf" />
          </View>
          <Text style={[styles.aspectText, { color: "#3a46bf"}]}>Work</Text>
          <View style={styles.spaceRight}></View>
        </TouchableOpacity>

        {/* Aspect Button (exercise & nutrition) */}
        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('exercise&nutrition')}>
          <View style={styles.iconBox}>
            <MaterialIcons name={'fitness-center'} size={SCREEN_WIDTH/15} color="orange" />
          </View>
          <Text style={[styles.aspectText, { color: "orange"}]}>Exercise & Nutrition</Text>
          <View style={styles.spaceRight}></View>
        </TouchableOpacity>

        {/* Aspect Button (relaxation) */}
        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('relaxation')}>
          <View style={styles.iconBox}>
            <FontAwesome5 name="coffee" size={SCREEN_WIDTH/15} color="#50bfd1" />
          </View>
          <Text style={[styles.aspectText, { color: "#50bfd1"}]}>Relaxation</Text>
          <View style={styles.spaceRight}></View>
        </TouchableOpacity>

        {/* Aspect Button (relationships) */}
        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('relationships')}>
          <View style={styles.iconBox}>
            <Entypo name={'chat'} size={SCREEN_WIDTH/15} color="#9e32db" />
          </View>
          <Text style={[styles.aspectText, { color: "#9e32db"}]}>Relationships</Text>
          <View style={styles.spaceRight}></View>
        </TouchableOpacity>

        {/* Aspect Button (sleep) */}
        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('sleep')}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name={'power-sleep'} size={SCREEN_WIDTH/15} color="#f0ca00" />
          </View>
          <Text style={[styles.aspectText, { color: "#f0ca00"}]}>Sleep</Text>
          <View style={styles.spaceRight}></View>
        </TouchableOpacity>

        {/* Aspect Button (personal development) */}
        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('personaldevelopment')}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name={'head-cog'} size={SCREEN_WIDTH/15} color="#21a177" />
          </View>
          <Text style={[styles.aspectText, { color: "#21a177"}]}>Personal Development</Text>
          <View style={styles.spaceRight}></View>
        </TouchableOpacity>

        {/* Aspect Button (remove aspect) */}
        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed(null)}>
          <Text style={styles.removeTagText}>X</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.60)', // set opacity to 0.6 (dark background)
  },
  wrapper: {
    paddingHorizontal: SCREEN_WIDTH/25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SCREEN_HEIGHT/40,
    elevation: 5,
    backgroundColor: 'white',
  },
  exitContainer: {
    width: SCREEN_WIDTH/1.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  exitText: {
    fontSize: SCREEN_HEIGHT/30,
  },
  header: {
    marginBottom: SCREEN_HEIGHT/50,
  },
  headerText: {
    fontWeight: '500',
    fontSize: SCREEN_HEIGHT/35,
  },
  aspectBox: { // aspect white box
    width: SCREEN_WIDTH/1.2,
    height: SCREEN_HEIGHT/16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT/100,
    borderRadius: SCREEN_HEIGHT/50,
    elevation: 10,
    backgroundColor: 'white',
  },
  aspectText: {
    
  },
  iconBox: { 
    flex: 1,
    alignItems: 'flex-start',
    left: SCREEN_WIDTH/10,
  },
  spaceRight: { // to make aspect text go to middle, fill space in right of text.
    flex: 1,
  },
  removeTagText: {
    color: '#f70000',
    fontSize: SCREEN_HEIGHT/35,
    fontWeight: '500',
  },
});

export default TagModal;