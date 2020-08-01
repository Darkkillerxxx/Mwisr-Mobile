import React,{Component} from 'react';
import { StyleSheet,View } from 'react-native';


const RBContainer = (props)=>{
    return(
        <View style={style.RBContainer}>
            {props.children}
        </View>
    )
}

const style=StyleSheet.create({
    RBContainer:{
        flexDirection:'row',
        width:'80%'
    }
})

export default RBContainer;