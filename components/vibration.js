import {Vibration} from 'react-native';

const TIMER_PATTERN = [0, 90, 50, 180, 900]; // wait -> vibrate -> wait -> vibrate -> ... in milliseconds

export const triggerVibration = (forever) => { // trigger vibration when toggled
    Vibration.vibrate(TIMER_PATTERN, forever); // if forever = true, vibrate forever, else, only once. 
}

export const stopVibration = () => { // stop vibration incase vibration was toggled forever. 
    Vibration.cancel()
  }