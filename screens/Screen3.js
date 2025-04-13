import { View, Text, StyleSheet } from "react-native";

const Screen3 = ({navigation, route}) => {
    function getTime(){
        let date = new Date(route.params.person.registered);
        return date.toString()
    }

    return(
        <View style={styles.main}>
            <Text style={styles.text}>Name:</Text>
            <Text style={styles.highlight}>{route.params.person.name}</Text>
            <Text style={styles.text}>Password:</Text>
            <Text style={styles.highlight}>{route.params.person.password}</Text>
            <Text style={styles.text}>Registered:</Text>
            <Text style={styles.highlight}>{getTime()}</Text>
        </View>
    )
}

let styles = StyleSheet.create({
    highlight: {
        color: "#7777dd",
        textAlign: "center",
        fontSize: 15
    },
    text: {
        textAlign: "center",
        fontSize: 15
    },
    main: {
        marginTop: "50%",
        textAlign: "center"
    }
})

export default Screen3;
