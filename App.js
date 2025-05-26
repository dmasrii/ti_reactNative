import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    main: {
    flex: 1
  },
});
