import {StyleSheet, View, Text, FlatList} from "react-native";
import {useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store';

const Screen1 = ({ navigation }) => {
    const [notes, setNotes] = useState([]); // Initialize as array, not object

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

    useEffect(() => {
        const initialize = async () => {
            await loadNotes();
            await createNote("skibi", "didi");
            await createNote("title", "content");
            await createNote("title2", "content2");
            await createNote("title3", "content3");
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
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <Text style={styles.big}>{item.title}</Text>
                        <Text>{item.content}</Text>
                    </View>}
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
        fontSize: 20,
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
