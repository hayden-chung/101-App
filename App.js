import { StyleSheet, View} from 'react-native';

import colors from './assets/colors';
import ToDoScreen from './app/todoScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <ToDoScreen />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
