import React from 'react'
import { View, StyleSheet,TouchableOpacity } from 'react-native';


class RadioBtn extends React.Component{
    constructor()
    {
        super();
    }

    render()
    {
        return(
            <View style={{...style.RBContainer,...this.props.style}}>
               <View style={style.RadioButtonOuter}>
                   <View style={this.props.Selected ? style.RBSelected:{}}>
                      
                   </View>
               </View>
               {this.props.children} 
            </View>
        )
    }
}

const style=StyleSheet.create({
    RBContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        textAlign:'center',
        marginBottom:5
    },
    RadioButtonOuter:{
        width:15,
        borderWidth:1,
        height:15,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10
    },
    RBSelected:{
        width:10,
        height:10,
        borderWidth:1,
        borderRadius:100,
        backgroundColor:'black'
    }
})

export default RadioBtn