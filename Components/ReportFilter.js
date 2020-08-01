import React from 'react'
import { View, StyleSheet, TouchableOpacity,TextInput,FlatList } from 'react-native';
import NormalText from './NormalText';
import BoldText from './BoldText';
import { FontAwesome } from '@expo/vector-icons';


class ReportFilter extends React.Component{
    constructor()
    {
        super();
        this.state={
            SearchText:"",
            SearchTag:"",
            SelectedMarketCap:null,
            MarketCaps:[
                {
                    Id:null,
                    Name:"All"
                },
                {
                    Id:1,
                    Name:"Large Cap"
                },
                {
                    Id:2,
                    Name:"Medium Cap"
                },
                {
                    Id:3,
                    Name:"Small Cap"
                }
            ],
            ReportType:[
                {
                    Id:null,
                    Name:"All"
                },
                {
                    Id:1,
                    Name:"Technical"
                },
                {
                    Id:2,
                    Name:"Fundamental"
                },
                {
                    Id:3,
                    Name:"TechnoFunda"
                }
            ],
            SegmentType:[
                {
                    Id:null,
                    Name:"All"
                },
                {
                    Id:1,
                    Name:"Equity"
                },
                {
                    Id:2,
                    Name:"EquityFutures"
                },
                {
                    Id:3,
                    Name:"EquityOptions"
                },
                {
                    Id:4,
                    Name:"CommodityFutures"
                },
                {
                    Id:5,
                    Name:"CommodityOptions"
                },
                {
                    Id:6,
                    Name:"CurrencyFutures"
                },
                {
                    Id:7,
                    Name:"CurrencyOptions"
                }
            ]
        }
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

    ShowMarketCaps=(itemData)=>{
        return(
            <View style={{width:'32%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${this.state.CallStatus === 0 ? '#F0B22A':'white'}`,marginTop:5,marginRight:5}}>
                <TouchableOpacity onPress={()=>this.CallStatus(0)}>
                    <NormalText style={{marginBottom:0,color:`${this.state.CallStatus === 0 ? 'white':'#F0B22A'}`}}>{itemData.item.Name}</NormalText>
                </TouchableOpacity>
            </View>
        )
    }

     ShowReports=(itemData)=>{
        return(
            <View style={{width:'32%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${this.state.CallStatus === 0 ? '#F0B22A':'white'}`,marginTop:5,marginRight:5}}>
                <TouchableOpacity onPress={()=>this.CallStatus(0)}>
                    <NormalText style={{marginBottom:0,color:`${this.state.CallStatus === 0 ? 'white':'#F0B22A'}`}}>{itemData.item.Name}</NormalText>
                </TouchableOpacity>
            </View>
        )
    }

    ShowSegments=(itemData)=>{
        return(
            <View style={{width:'32%',borderWidth:1,alignItems:'center',justifyContent:'center',padding:5,borderRadius:5,borderColor:'#F0B22A',backgroundColor:`${this.state.CallStatus === 0 ? '#F0B22A':'white'}`,marginTop:5,marginRight:5}}>
                <TouchableOpacity onPress={()=>this.CallStatus(0)}>
                    <NormalText style={{marginBottom:0,color:`${this.state.CallStatus === 0 ? 'white':'#F0B22A'}`}}>{itemData.item.Name}</NormalText>
                </TouchableOpacity>
            </View>
        )
    }
    
    render()
    {
        const {SearchText,Exchange,CallStatus,OwnerId}=this.state
        return(
            <View style={styles.CallsFilterContainer}>
                <View style={styles.FilterHeadingContainer}>
                    <BoldText style={styles.FilterHeading}>Filters</BoldText>
                    <TouchableOpacity onPress={()=>this.props.closeFilter(SearchText)}>
                        <View style={styles.FilterButton}>
                            <FontAwesome name="filter" size={24} color="white" />
                            <NormalText style={{marginBottom:0,color:'white'}}>Apply Filters</NormalText> 
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%',marginVertical:5}}>
                    <BoldText style={{fontSize:15}}>Search By Name</BoldText>
                        <View style={{width:'100%',alignItems:'center'}}>
                            <View style={{width:'90%',height:40,borderWidth:1,borderColor:'#bcc4cb',flexDirection:'row',alignItems:'center',borderRadius:5}}>
                                <TextInput onChangeText={(e)=>this.setState({SearchText:e})} style={{width:'90%',height:37,backgroundColor:'white'}} underlineColorAndroid ='transparent'/>
                                <TouchableOpacity>
                                    <FontAwesome name="search" size={24} color="#bcc4cb" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <BoldText style={{fontSize:15}}>Search By Tag</BoldText>
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
                    <BoldText style={{fontSize:15}}>Market Cap</BoldText>
                    <FlatList
                        keyExtractor={(item,index)=>index.toString()}
                        data={this.state.MarketCaps}
                        renderItem={this.ShowMarketCaps} 
                        numColumns={3}/>
                </View>

                <View style={{width:'100%',marginVertical:5}}>
                    <BoldText style={{fontSize:15}}>Report Type</BoldText>
                    <FlatList
                        keyExtractor={(item,index)=>index.toString()}
                        data={this.state.ReportType}
                        renderItem={this.ShowReports} 
                        numColumns={3}/>
                </View>

                <View style={{width:'100%',marginVertical:5}}>
                    <BoldText style={{fontSize:15}}>Segment Type</BoldText>
                    <FlatList
                        keyExtractor={(item,index)=>index.toString()}
                        data={this.state.SegmentType}
                        renderItem={this.ShowSegments} 
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

export default ReportFilter;