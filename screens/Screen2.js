import {Text, View, FlatList, StyleSheet, Alert} from "react-native";
import {useEffect, useState} from "react";
import MyButton from "../components/MyButton";

const Screen2 = ({navigation}) => {
    let [people, setPeople] = useState({});

    function deletePerson(name){

    }

    useEffect(() => {

    }, [])

    return(
        <View>
            <FlatList
                data={people}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <Text style={styles.name}>{item.id}: {item.name}</Text>
                        <MyButton text="Details" style={styles} onPress={() => navigation.navigate('s3', {person: item})}></MyButton>
                        <MyButton text="Delete" style={styles} onPress={() => Alert.alert(
                            "Confirm",
                            "Are you sure you want to delete " + item.name + "? This action cannot be undone",
                            [{
                                text: "Cancel"
                            },
                            {text: "OK",
                                onPress: () => deletePerson(item.name)
                            },
                        ])}></MyButton>
                    </View>}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#7777dd",
        padding: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: "black"
    },
    container: {
        display: "flex",
        flexBasis: "50%",
        flexDirection: "row",
        width: "100%",
        height: "fitContent",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        margin: 5,
    },
    name: {
        textAlign: "center",
        flexBasis: "100%",
        padding: 10,
        display: "block"
    }
})

export default Screen2;
