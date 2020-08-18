import React,{component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';


const NormalText = (props) => {

    return(
        <Text lineBreakMode="tail" numberOfLines={1} style={{...styles.NormalText,...props.style}}>
            {props.children}
        </Text>
    )
} 


const styles=StyleSheet.create({
    NormalText:{
        marginBottom:10,
        fontSize:12,
        fontFamily:'open-sans'
    }
})


export default NormalText;

