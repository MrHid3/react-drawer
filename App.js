import * as React from 'react';
import {Alert, Image, StyleSheet, View, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
// import Plus from "./src/images/plus.png"
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

const Drawer = createDrawerNavigator();

function App() {
    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItem 
                    label="Notes"
                    onPress={() => props.navigation.navigate("s1")}
                />
                <DrawerItem
                    label="Add Note"
                    onPress={() => props.navigation.navigate("s2")}
                />
                <DrawerItem
                    label="Informacja"
                    onPress={() => Alert.alert("Informacja", "To jest super informacja o aplikacji")}
                    icon={() => <Ionicons name="information-circle-outline" size={24} color="black" />}
                />

            </DrawerContentScrollView>
        );
    }
    return (
        <NavigationContainer style={styles.main}>
        <Ionicons name="information-circle-outline" size={24} color="black" />

            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="s1" component={Screen1} options={{
                    title: 'Notes',
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#7777dd',
                        boxShadow: 'none',
                    },
                }} />
                <Drawer.Screen name="s2" component={Screen2} options={{
                    title: 'Add Note',
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#7777dd',
                        boxShadow: 'none',
                    },}}/>
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
    dot: {
        position: 'absolute',
        top: 0,
        width: 150,
        height: 150,
        borderRadius: "100%",
        backgroundColor: '#7777dd'
    },
    main: {
        position: 'relative',
    }
});

export default App;
