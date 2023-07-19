import { StyleSheet, View} from 'react-native';

import colors from './assets/colors';
import ToDoScreen from './app/todoScreen';
import HomeScreen from './app/homeScreen';
import QuoteScreen from './app/quoteScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <QuoteScreen />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
