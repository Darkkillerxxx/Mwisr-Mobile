import React from 'react'
import { View, StyleSheet } from 'react-native'
import Card from '../Components/Card'
import NormalText from './NormalText'
import {getPackageFontColor} from '../Utils/api'
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
class MiniPackage extends React.Component{


    render()
    {
        return(
            <View style={{...styles.MiniCard,...this.props.style}}>
                <View style={{width:'90%'}}>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:12}}>Package : {this.props.Package.PackageName}</NormalText>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:12}}>Exchanges : {this.props.Package.ForExchanges}</NormalText>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:12}}>Type : {this.props.Package.PackageTypeName}</NormalText>
                </View>
                <View style={{width:'10%',alignItems:'center',justifyContent:'flex-start'}} >
                    {this.props.ShowClose ?                     <TouchableOpacity>
                        <FontAwesome name="close" size={12} color="black" />
                    </TouchableOpacity>:null}
                </View>
            </View>
        )
        
    }
}

const styles=StyleSheet.create({
    MiniContainer:{
        width:'100%'
    },
    MiniCard:{
        width:'100%',
        borderLeftWidth:5,
        borderLeftColor:'#16d39a',
        elevation:1,
        padding:5,
        flexDirection:'row'
    }
})


export default MiniPackage