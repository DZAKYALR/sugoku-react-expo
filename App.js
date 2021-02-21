import React from 'react';
import Home from './src/pages/Home';
import Board from './src/pages/Board';
import End from './src/pages/End';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/store/index'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'


const Stack = createStackNavigator();

export default function App() {
  return (  
      <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Board" component={Board} />
          <Stack.Screen name="End" component={End} />
        </Stack.Navigator>
    </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
