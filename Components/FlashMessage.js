import React from 'react'
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import NormalText from './NormalText';
import { color } from 'react-native-reanimated';
class  FlashMessage extends React.Component{
    constructor()
    {
        super();
        this.state={}
    }    

    render()
    {
        return(
            this.props.ShowMessage ? 
            <View style={{...styles.FlashContainer,...{backgroundColor:this.props.color}}}>
                <View style={styles.IconContainer}>
                    <FontAwesome name={this.props.Icon} size={this.props.IconSize} color="white" />
                </View>
                <View style={styles.TextContainer}>
                    <NormalText style={styles.FlashContent}>{this.props.Message}</NormalText>
                </View>    
            </View>:
            null
        )
    }
}


const styles=StyleSheet.create({
    FlashContainer:{
        width:'100%',
        height:50,
        borderRadius:5,
        marginBottom:10,
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        zIndex:1,
        marginVertical:5
    },
    IconContainer:{
        width:'30%',
        alignItems:'flex-start',
        padding:15
    },
    TextContainer:{
        width:'70%',
        alignItems:'flex-start'
    },
    FlashContent:{
        marginBottom:0,
        color:'white',
        fontSize:15
    }
})

export default FlashMessage