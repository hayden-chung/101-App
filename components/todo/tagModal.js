import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {updateTag} from './taskControls';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const TagModal = ({setTagModalVisible, setAspect, index, taskItems, setTaskItems}) => {

  const handlePressed = (aspect) => { // return aspect and close modal
    setAspect(aspect);
    updateTag(index, taskItems, setTaskItems, aspect);
    setTagModalVisible(false);
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>

        <TouchableOpacity style={styles.exitContainer} onPress={() => setTagModalVisible(false)}>
          <Text style={styles.exitText}>x</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tag an aspect:</Text>
        </View>

        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('work')}>
          <Entypo name={'suitcase'} size={SCREEN_WIDTH/15} color="#3a46bf" />
          <Text style={[styles.aspectText, { color: "#3a46bf"}]}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('exercise&nutrition')}>
          <MaterialIcons name={'fitness-center'} size={SCREEN_WIDTH/15} color="orange" />
          <Text style={[styles.aspectText, { color: "orange"}]}>Exercise & Nutrition</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('relaxation')}>
          <FontAwesome5 name="coffee" size={SCREEN_WIDTH/15} color="#50bfd1" />
          <Text style={[styles.aspectText, { color: "#50bfd1"}]}>Relaxation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('relationships')}>
          <Entypo name={'chat'} size={SCREEN_WIDTH/15} color="#9e32db" />
          <Text style={[styles.aspectText, { color: "#9e32db"}]}>Relationships</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('sleep')}>
          <MaterialCommunityIcons name={'power-sleep'} size={SCREEN_WIDTH/15} color="#f0ca00" />
          <Text style={[styles.aspectText, { color: "#f0ca00"}]}>Sleep</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aspectBox} onPress={() => handlePressed('personaldevelopment')}>
          <MaterialCommunityIcons name={'head-cog'} size={SCREEN_WIDTH/15} color="#21a177" />
          <Text style={[styles.aspectText, { color: "#21a177"}]}>Personal Development</Text>
        </TouchableOpacity>

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
    backgroundColor: 'rgba(0, 0, 0, 0.60)', // set opacity to 0.6
  },
  wrapper: {
    // paddingVertical: SCREEN_HEIGHT/15,
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
  aspectBox: {
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
  removeTagText: {
    color: '#f70000',
    fontSize: SCREEN_HEIGHT/35,
    fontWeight: '500',
  },
});

export default TagModal;