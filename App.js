import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';

const Drawer = createDrawerNavigator();

function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="s1">
          <Drawer.Screen name="s1" component={Screen1} options={{
              title: 'main',
              headerTitle: '',
              headerStyle: {
                  backgroundColor: '#7777dd',
                  boxShadow: 'none',
              },
          }} />
          <Drawer.Screen name="s2" component={Screen2} />
          <Drawer.Screen name="s3" component={Screen3} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;