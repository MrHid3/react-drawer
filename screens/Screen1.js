import MyButton from '../components/MyButton';
import {StyleSheet, TextInput, View, Text, Alert, FlatList} from "react-native";
import {useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store';

const ip = "192.168.0.104"

const Screen1 = ({ navigation }) => {
    const [keys, setKeys] = useState([]);
    const [notes, setNotes] = useState({});

    function sendPerson(){
        if(name == "" || password == "") {
            console.log("fail")
            return;
        }
    }

    async function getKeys(){
        if(await SecureStore.getItemAsync("keys") == null)
            SecureStore.setItemAsync("keys", [])
        else{
            setKeys(SecureStore.getItemAsync("keys"))
            keys.forEach(item => {
                let note = SecureStore.getItemAsync(item)
                setNotes([...notes, {title: item, content: note}]);
            })
        }
    }

    async function createNote(title, content){
        await SecureStore.setItemAsync(title, content);
        await SecureStore.setItemAsync("keys", [...await SecureStore.getItemAsync("keys"), title]);
        getKeys();
        console.log(keys);
        console.log(notes);
    }

    useEffect(() => {
        getKeys();
        createNote("skibi", "didi");

    }, []);

    return(
        <View style={styles.main}>
            <FlatList
                numColumns="2"
                data={notes}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <Text>{item.title}</Text>
                        <Text>{item.content}</Text>
                    </View>}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ededed",
        width: "100%",
        height: "100%",
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "#7777dd",
        borderBottomStyle: "solid",
        display: "block",
        width: 150,
        height: 30,
        lineHeight: 30,
        fontSize: 20,
        margin: 5,
        padding: 0,
        textAlign: "center",
    },
    button: {
        display: "block",
        backgroundColor: "#7777dd",
        width: "80%",
        padding: 10,
        borderRadius: 10,
        margin: 15
    },
    buttonText: {
        color: "#fdfdfd",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    titleContainer: {
        backgroundColor: "#7777dd",
        height: 160,
        width: "130%",
        position: "absolute",
        top: -20,
        textAlign: "center",
        borderBottomRightRadius: "100%",
        borderBottomLeftRadius: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    h1: {
        color: "#fdfdfd",
        fontSize: 35,
        width: "fit-content",
        fontWeight: "bold"
    },
    h2: {
        color: "#ffe438",
        width: "fit-content"
    }
})

export default Screen1;
