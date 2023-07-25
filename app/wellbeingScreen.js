import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from 'react-native';

const SCREEN_WIDTH = (Dimensions.get('window').width);
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const WellbeingScreen = () => {

  const size = 1;

  return (
    <View style={styles.container}>
      <View style={styles.triangle}/>
      <View style={styles.chartWrapper}>
        <Image 
          source={require('../assets/radarchart.png')}
          style={styles.radarChart} 
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  triangle: {
    bottom: 0,
    marginBottom: SCREEN_HEIGHT/1.33,
    position: 'absolute',
    width: 0,
    height: 0, 
    borderBottomWidth: 58, 
    borderBottomColor: 'yellow',
    borderLeftWidth: 32,
    borderLeftColor: "transparent",
    borderRightWidth: 32,
    borderRightColor: "transparent",
    transform: [{rotate: "180deg"}],
  },
  chartWrapper: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1, // display on the top layer (over other objects)
  },
  radarChart:{
      position: 'absolute',
      resizeMode: 'contain',
      width: SCREEN_WIDTH/1.1,
      height:  SCREEN_HEIGHT/2.2,
      marginTop: SCREEN_HEIGHT/10,
  },

});


export default WellbeingScreen;