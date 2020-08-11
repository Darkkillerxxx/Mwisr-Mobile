import React, { Component } from 'react'
import {View,StyleSheet, TouchableOpacity} from 'react-native'
import NormalText from './NormalText'
class MwisrSelector extends React.Component{


    onSelected=()=>{
        this.props.onSelect(this.props.value)
    }

    render() {
        return(
            <TouchableOpacity onPress={()=>this.onSelected()}>
                <View style={{...styles.UserType,...{backgroundColor:!this.props.Selected ? 'white' :'#F0B22A',borderColor:this.props.Selected ? 'white' :'#F0B22A',borderWidth:1}}}>
                    <NormalText style={{marginBottom:0,color:'black',color:`${this.props.Selected ? 'white' :'#F0B22A'}`}}>{this.props.Text}</NormalText>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    UserType:{
        padding:10,
        alignItems:'center',
        borderRadius:5
    }
})

export default MwisrSelector