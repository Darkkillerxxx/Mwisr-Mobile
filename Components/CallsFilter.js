import React from 'react'
import { View, StyleSheet, TouchableOpacity,TextInput,FlatList } from 'react-native';
import NormalText from './NormalText';
import BoldText from './BoldText';
import { FontAwesome } from '@expo/vector-icons';


class CallsFilter extends React.Component{
    constructor()
    {
        super();
        this.state={
            Owners:[
                {
                "OwnerId": "",
                "OwnerName": "Own",
                "SuperOwner": ""
                }
            ],
            SearchText:"",
            Exchange:[],
            CallStatus:0,
            OwnerId:""
        }
    }

    componentDidMount()
    {
        let TempOwners=this.state.Owners
        this.props.UserOwners.forEach(element=>{
            TempOwners.push(element)
        })
        this.setState({Owners:TempOwners},()=>{
            console.log(this.state.Owners)
        })
    }

    showOwners=(itemData)=>{
        return(
            <View style={{width:'30%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',marginHorizontal:5,backgroundColor:`${itemData.item.OwnerId === this.state.OwnerId ? '#F0B22A':'white'}`}}>
               <TouchableOpacity onPress={()=>this.setState({OwnerId:itemData.item.OwnerId})}> 
                    <NormalText style={{marginBottom:0,color:`${itemData.item.OwnerId === this.state.OwnerId ? 'white':'#F0B22A'}`}}>{itemData.item.OwnerName}</NormalText>
                </TouchableOpacity>
            </View>
        )
    }

    SelectExchange=(Exchange)=>{
        if(Exchange !== "")
        {
            let TempExchange=this.state.Exchange
            if(TempExchange.includes(Exchange))
            {
                let index=TempExchange.indexOf(Exchange)
                if (index > -1)
                {
                    TempExchange.splice(index,1)
                }

                this.setState({Exchange:TempExchange})
            }
            else
            {
                TempExchange.push(Exchange)
                this.setState({Exchange:TempExchange})
            }
        }
        else
        {
            this.setState({Exchange:[]})
        }
    }

    CallStatus=(status)=>{
        this.setState({CallStatus:status})
    }
    
    render()
    {
        const {SearchText,Exchange,CallStatus,OwnerId}=this.state
        return(
            <View style={styles.CallsFilterContainer}>
                <View style={styles.FilterHeadingContainer}>
                    <BoldText style={styles.FilterHeading}>Filters</BoldText>
                    <TouchableOpacity onPress={()=>this.props.closeFilter(SearchText,Exchange,CallStatus,OwnerId)}>
                        <View style={styles.FilterButton}>
                            <FontAwesome name="filter" size={24} color="white" />
                            <NormalText style={{marginBottom:0,color:'white'}}>Apply Filters</NormalText> 
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%',marginVertical:5}}>
                    <BoldText style={{fontSize:15}}>Search</BoldText>
                        <View style={{width:'100%',alignItems:'center'}}>
                            <View style={{width:'90%',height:40,borderWidth:1,borderColor:'#bcc4cb',flexDirection:'row',alignItems:'center',borderRadius:5}}>
                                <TextInput onChangeText={(e)=>this.setState({SearchText:e})} style={{width:'90%',height:37,backgroundColor:'white'}} underlineColorAndroid ='transparent'/>
                                <TouchableOpacity>
                                    <FontAwesome name="search" size={24} color="#bcc4cb" />
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>

                <View style={{width:'100%',marginVertical:5}}>
                    <BoldText style={{fontSize:15}}>Exchanges</BoldText>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{width:'18%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${Exchange.length === 0 ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.SelectExchange("")}>
                                <NormalText style={{color:'black',marginBottom:0,color:`${Exchange.length === 0 ? 'white':'#F0B22A'}`}}>All</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'18%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${Exchange.includes('NSE') ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.SelectExchange('NSE')}>
                                <NormalText style={{marginBottom:0,color:`${Exchange.includes('NSE') ? 'white':'#F0B22A'}`}}>NSE</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'18%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${Exchange.includes('BSE') ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.SelectExchange('BSE')}>
                                <NormalText style={{marginBottom:0,color:`${Exchange.includes('BSE') ? 'white':'#F0B22A'}`}}>BSE</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'18%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${Exchange.includes('NCDEX') ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.SelectExchange('NCDEX')}>
                                <NormalText style={{color:`${Exchange.includes('NCDEX') ? 'white':'#F0B22A'}`,marginBottom:0}}>NCDEX</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'18%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${Exchange.includes('MCX') ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.SelectExchange('MCX')}>
                                <NormalText style={{marginBottom:0,color:`${Exchange.includes('MCX') ? 'white':'#F0B22A'}`}}>MCX</NormalText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                <View style={{width:'100%',marginVertical:5}}>
                    <BoldText style={{fontSize:15}}>Call Status</BoldText>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{width:'30%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${this.state.CallStatus === 0 ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.CallStatus(0)}>
                                <NormalText style={{marginBottom:0,color:`${this.state.CallStatus === 0 ? 'white':'#F0B22A'}`}}>All Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'30%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${this.state.CallStatus === 1 ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.CallStatus(1)}>
                                <NormalText style={{marginBottom:0,color:`${this.state.CallStatus === 1 ? 'white':'#F0B22A'}`}}>Active Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'30%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${this.state.CallStatus === 2 ? '#F0B22A':'white'}`}}>
                            <TouchableOpacity onPress={()=>this.CallStatus(2)}>
                                <NormalText style={{marginBottom:0,color:`${this.state.CallStatus === 2 ? 'white':'#F0B22A'}`}}>In-Active Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{width:'100%',marginVertical:5}}>
                    <BoldText style={{fontSize:15}}>Owners</BoldText>
                    <FlatList
                        keyExtractor={(item, index) => item.OwnerId}
                        data={this.state.Owners}
                        renderItem={this.showOwners}
                        numColumns={3}/>                 
                </View>
                
                
            </View>
        )
    }
}

const styles=StyleSheet.create({
    CallsFilterContainer:{
        flex:1,
        marginTop:'10%',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        backgroundColor:'white',
        elevation:3,
        padding:15
    },
    FilterHeadingContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    FilterHeading:{
        fontSize:20
    },
    FilterButton:{
        backgroundColor:"#F0B22A",
        width:125,
        height:35,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    }
})

export default CallsFilter;