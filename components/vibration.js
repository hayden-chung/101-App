import {Vibration} from 'react-native';

const TIMER_PATTERN = [0, 90, 50, 180, 900]; // wait -> vibrate -> wait -> vibrate -> ...

export const triggerVibration = (forever) => {
    Vibration.vibrate(TIMER_PATTERN, forever); 
}

export const stopVibration = () => {
    Vibration.cancel()
  }