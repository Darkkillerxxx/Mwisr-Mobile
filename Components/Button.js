import React from 'react'
import {StyleSheet,View} from 'react-native'


const CustomButton=(props)=>{
    return(
        <View style={{...styles.Button,...props.style}}>
            {props.children}
        </View>
    )
}
 const styles=StyleSheet.create({
    
    Button:{
        width:'50%',
        height:35,
        borderRadius:10,
        backgroundColor:'#f5bb18',
        marginTop:10,
        alignItems:'center',
        justifyContent:'center'
      }
  })

export default CustomButton