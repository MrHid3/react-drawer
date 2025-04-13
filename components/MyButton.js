import {TouchableOpacity, StyleSheet, Text} from "react-native";

const MyButton = (props) => {
    return (
        <TouchableOpacity style={props.style.button} onPress={props.onPress}>
            <Text style={props.style.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default MyButton;