import * as React from 'react';
import {Alert, Image, StyleSheet, View, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import Plus from "./src/images/plus.png"
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

const Drawer = createDrawerNavigator();

function App() {
    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Informacja"

                    onPress={() => Alert.alert("Informacja", "To jest super informacja o aplikacji")}
                />

            </DrawerContentScrollView>
        );
    }
    function CustomDrawerContent2(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Dodaj notatkę"

                    onPress={() => Alert.alert("Informacja", "To jest super informacja o aplikacji")}
                />

            </DrawerContentScrollView>
        );
    }
    return (
        <NavigationContainer style={styles.main}>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="s1" component={Screen1} options={{
                    title: 'Notatki',
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#7777dd',
                        boxShadow: 'none',
                    },
                }} />
                <Drawer.Screen options={{
                    title: 'Dodaj notatkę',
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#7777dd',
                        boxShadow: 'none',
                    },}}
                               name="Dodaj notatkę" component={Screen2}/>
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