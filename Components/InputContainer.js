import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button,TouchableWithoutFeedback,findNodeHandle } from 'react-native';


const InputContainer = (props)=>{
    return(
        <View style={style.InputContainer}>
            {props.children}
        </View>
    )
}

const style=StyleSheet.create({
    InputContainer:{
        marginVertical:5,
        width:'100%',
        paddingLeft:'10%',
        alignItems:'flex-start'
    }
})

export default InputContainer;