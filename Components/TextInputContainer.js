import React from 'react'
import {StyleSheet,View} from 'react-native'

const TextInputContainer=(props)=>{
    return(
        <View style={styles.InputCont}>
           {props.children}
        </View>
    )
}

const styles=StyleSheet.create({
    InputCont:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default TextInputContainer;