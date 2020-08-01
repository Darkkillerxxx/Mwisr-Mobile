import React,{component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';


const Card = (props) => {

    return(
        <View style={{...styles.card,...props.style}}>
            {props.children}
        </View>
    )
} 


const styles=StyleSheet.create({
    card:{
        backgroundColor:'white',
        width:'90%',
        borderColor:'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        justifyContent:'center',
        alignItems:'center',
    }
})


export default Card;

