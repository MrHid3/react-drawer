import {Text, View, FlatList, StyleSheet, Alert, TextInput} from "react-native";
import {useEffect, useState} from "react";
import MyButton from "../components/MyButton";
import {createNote, loadNotes, getKeys} from "./Screen1"
import * as SecureStore from "expo-secure-store";

const Screen2 = ({navigation}) => {
    async function getKeys(){
        const storedKeys = await SecureStore.getItemAsync("keys");
        if (!storedKeys) {
            await SecureStore.setItemAsync("keys", JSON.stringify([]));
            return [];
        }
        return JSON.parse(storedKeys);
    }

    async function loadNotes() {
        const storedKeys = await getKeys();
        const notesArray = [];
        for (const key of storedKeys) {
            const content = await SecureStore.getItemAsync(key);
            if (content) {
                notesArray.push({title: key, content});
            }
        }
        setNotes(notesArray);
    }

    async function createNote(title, content){
        const currentKeys = await getKeys();
        if (currentKeys.includes(title))
            return;
        const newKeys = [...currentKeys, title];
        await SecureStore.setItemAsync("keys", JSON.stringify(newKeys));
        await SecureStore.setItemAsync(title, content);
        await loadNotes();
    }

    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Content");
    return(
        <View style={styles.main}>
            <View style={styles.container}>
                <TextInput inputMode="text" style={styles.input} placeholder="Title" onChangeText={(text) => setTitle(text)} required></TextInput>
                <TextInput inputMode="text" style={styles.input} placeholder="Content" onChangeText={(text) => setContent(text)} required></TextInput>
                <MyButton text="Create Note" style={styles} onPress={async() => {await createNote(title, content); navigation.navigate("s1")}}></MyButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
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
        height: 50,
        lineHeight: 50,
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
        flexBasis: "50%",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        margin: "0 auto"
    },
})

export default Screen2;
