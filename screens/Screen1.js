import {StyleSheet, View, Text, FlatList, Touchable, TouchableOpacity, Alert} from "react-native";
import {useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store';

const Screen1 = ({ navigation }) => {
    const [notes, setNotes] = useState([]);

    const colors = ["red", "green", "yellow", "blue", "cyan"]
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
            const note = await SecureStore.getItemAsync(key);
            if (note) {
                notesArray.push(JSON.parse(note));
            }
        }
        setNotes(notesArray);
    }

    async function deleteNote(title){
        const storedKeys = await getKeys();
        await SecureStore.setItem("keys", JSON.stringify(storedKeys.filter((item) => item != title)));
        loadNotes();
    }
    // SecureStore.setItemAsync("keys", JSON.stringify([]));

    useEffect(() => {
        const initialize = async () => {
            await loadNotes();
            const unsubscribe = navigation.addListener('focus', () => {
                loadNotes();
            })
        };
        initialize();
    }, []);

    return(
        <View style={styles.main}>
            <FlatList
                numColumns={2}
                data={notes}
                renderItem={({ item }) =>
                    <TouchableOpacity onLongPress={() => Alert.alert("Warning", "Are you sure you want to delete this note?", [{text: "Cancel"}, {text: "Confirm", onPress: () => deleteNote(item.title)}])} style={[styles.container, {backgroundColor: item.color}]}>
                        <View  >
                            <Text style={styles.big}>{item.title}</Text>
                            <Text>{item.content}</Text>
                            <Text>{new Date(item.time).toString()}</Text>
                        </View>
                    </TouchableOpacity>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#ededed",
        width: "100%",
        height: "100%",
    },

    big: {
        fontSize: 40,
    },
    container: {
        flexBasis: "46%",
        backgroundColor: "#cccccc",
        borderRadius: 5,
        margin: "2%",
        padding: 10,
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
