import {Text, View, FlatList, StyleSheet, Alert, TextInput} from "react-native";
import {useEffect, useState} from "react";
import MyButton from "../components/MyButton";
import {createNote, loadNotes, getKeys} from "./Screen1"
import * as SecureStore from "expo-secure-store";
import {Picker} from '@react-native-picker/picker'

const Screen2 = ({navigation}) => {

    const [categories, setCategories] = useState([]);

    async function getKeys(){
        const storedKeys = await SecureStore.getItemAsync("keys");
        if (!storedKeys) {
            await SecureStore.setItemAsync("keys", JSON.stringify([]));
            return [];
        }
        return JSON.parse(storedKeys);
    }

    async function loadCategories() {
        const storedKeys = await getKeys();
        const categoriesArray = [];
        for (const key of storedKeys) {
            const content = await SecureStore.getItemAsync(key);
            if (content) {
                categoriesArray.push(key);
            }
        }
        setCategories(categoriesArray);
    }

    async function createNote(title, content){
        const currentKeys = await getKeys();
        const colors = ["red", "green", "yellow", "blue", "cyan"]
        if (currentKeys.includes(title)){
            Alert.alert("Wrong title", "Title already exists")
            return;
        }else if(title.trim() == "" || content.trim() == ""){
            Alert.alert("Content not provided", "Please provide a title and content")
        }else{
            const newKeys = [...currentKeys, title];
            await SecureStore.setItemAsync("keys", JSON.stringify(newKeys));
            let note = {
                title: title,
                content: content,
                time: Date.now(),
                color: colors[Math.floor(Math.random() * colors.length)]
            }
            await SecureStore.setItemAsync(title, JSON.stringify(note));
            navigation.navigate("s1");
        }
    }

    useEffect(() => {
        const initialize = async () => {
            await loadCategories();
            const unsubscribe = navigation.addListener('focus', () => {
                loadCategories();
            })
        };
        initialize();
        categories.map((category, i) => {
            console.log(category)
        })
    }, [])

    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Content");
    const [category, setCategory] = useState(categories[0]);
    return(
        <View style={styles.main}>
            <View style={styles.container}>
                <TextInput inputMode="text" style={styles.input} placeholder="Title" onChangeText={(text) => setTitle(text)} required ></TextInput>
                <TextInput inputMode="text" style={styles.input} placeholder="Content" onChangeText={(text) => setContent(text)} required ></TextInput>
                <Picker style={{width: 120}} mode="dropdown" onValueChange={(value) => setCategory(value)}>
                    {categories.map((category, i) => (
                            <Picker.Item key={i} label={category} value={category} style={{width: 80}}/>
                    ))}
                </Picker>
                <MyButton text="Create Note" style={styles} onPress={async() => {await createNote(title, content)}}></MyButton>
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
