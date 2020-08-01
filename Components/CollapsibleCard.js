import React,{component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NormalText from './NormalText'

class CollapsibleCard extends React.Component{
    constructor()
    {
        super();
        this.state={
            Collapse:false
        }
    }

    triggerCollapseExpand=()=>{
        this.setState({Collapse:!this.state.Collapse})
    }

    render()
    {
        return(
            <View style={{...styles.card,...this.props.style}}>
                <View style={styles.CustomCardHeading}>
                    <View style={{width:'50%'}}>
                        <NormalText style={{marginBottom:0,fontSize:17,color:'black'}}>{this.props.Heading}</NormalText>
                    </View>
                    <View style={{width:'50%',paddingHorizontal:5,alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>this.triggerCollapseExpand()}>
                            <FontAwesome name={this.state.Collapse ? "chevron-down":"chevron-up"} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                !this.state.Collapse ? 
                    this.props.children
                :
                    null
                }
            </View>
        )
    }
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
    },
    CustomCardHeading:{
        width:'100%',
        flexDirection:'row',
        padding:7,
        borderWidth:1,
        borderBottomColor:"#CBCFD6",
        borderTopColor:'white',
        borderRightColor:'white',
        borderLeftColor:'white'
    },
})


export default CollapsibleCard;

