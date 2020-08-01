import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button,TouchableWithoutFeedback,findNodeHandle } from 'react-native';


const Container = (props)=>{
    return(
        <View style={{...style.Container,...props.style}}>
            {props.children}
        </View>
    )
}

const style=StyleSheet.create({
    Container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
})

export default Container;