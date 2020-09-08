import React from 'react'
import { View,TouchableOpacity } from 'react-native';
import BoldText from './BoldText';
import NormalText from './NormalText';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import MwisrSelector from './MwisrSelector'


class MessageFilter extends React.Component{
    constructor()
    {
        super()
        this.state={

        }
    }

    sendBackFilters=()=>{
        this.props.closeFilter()
    }

    render()
    {
        return(
            <View style={{flex:1,marginTop:60,backgroundColor:'white',borderTopLeftRadius:25,borderTopRightRadius:25,elevation:1,padding:15}}>
                
                <View style={{flexDirection:'row'}}>
                    <View style={{width:'50%',alignItems:'flex-start'}}>
                        <BoldText style={{fontSize:20}}>Filters</BoldText>
                    </View>
                    <View style={{width:'50%',alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>this.sendBackFilters()}>
                            <View style={{width:100,marginTop:10,alignItems:'center',padding:10,borderRadius:5,backgroundColor:'#f5bb18'}}>
                                <NormalText style={{marginBottom:0,color:'white',fontSize:12}}>Apply Filters</NormalText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                

                <NormalText style={{fontSize:18,marginTop:10}}>User Types</NormalText>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly'}}>
                    <MwisrSelector Text="Sub-Broker"/>
                    <MwisrSelector Text="Analyst"/>
                    <MwisrSelector Text="Partner"/>
                    <MwisrSelector Text="Customer"/>
                </View>

                <NormalText style={{fontSize:18,marginTop:10}}>Users</NormalText>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly'}}>
                    <MwisrSelector Text="Adwait Dabholkar"/>
                    <MwisrSelector Text="Amey Dabholkar"/>
                    <MwisrSelector Text="Kanak Shah"/>
                </View>

                
                <NormalText style={{fontSize:18,marginTop:10}}>Packages</NormalText>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly'}}>
                    <MwisrSelector Text="Package 1"/>
                    <MwisrSelector Text="Package 2"/>
                    <MwisrSelector Text="Package 3"/>
                </View>
        </View>
        )
    }
}


export default MessageFilter

