import React from 'react'
import { View, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import Container from '../../Components/Container';
import NormalText from '../../Components/NormalText';
import BoldText from '../../Components/BoldText'
import { connect }from 'react-redux'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import CollapsibleCard from '../../Components/CollapsibleCard'
import Card from '../../Components/Card'
import {NavigationEvents} from 'react-navigation';
import {get_call_details,formatDate} from '../../Utils/api'

class CallDetails extends React.Component{
    constructor(props)
    {
        super();
        this.state={
            MaxDetails:[],
            isLoading:false,
            SelectedTab:0
        }
    }

    triggerCollapse=()=>{
        this.refs.Company.CollapseCard()
    }

    getCallDetails=(pId,cId)=>{
        console.log(this.props.MiniCDState.Legs[this.state.SelectedTab])
        this.setState({isLoading:true})
        let payload={
            packageId:pId,
            callId:cId
        }

        get_call_details(this.props.loginState.AuthHeader,payload).then(result=>{
            console.log("Getting",result)
            if(result.IsSuccess)
            {
               this.setState({MaxDetails:result.Data},()=>{
                   if(this.state.MaxDetails.length > 0)
                   {
                       this.setState({isLoading:false})
                   } 
               })
            }
        })   
    }

    GetAddedDateTime=(DateTime)=>{
        let Temp=DateTime.split(' ')
        return `${formatDate(DateTime)} ${Temp[1]} ${Temp[2]} `
    }

    render()
    {
       const {PackageId,CallId,MarketSegmentId,MarketSegmentName,ProfitPerInvestment,ExpiryDate,FutOption,CallStatus,StrikePrice,TipStartDate,CMPMin,CMPMax,CMPName}=this.props.MiniCDState.Legs[this.state.SelectedTab]
        return(
          <Container style={styles.CallDetailsContainer}>
              <NavigationEvents onDidFocus={() => this.getCallDetails(PackageId,CallId) } />
              <View style={styles.CallDetailsContentContainer}>
                <ScrollView style={styles.CallDetailsScrollView}>
                    <View style={styles.ContentTopContainer} >
                        
                        {!this.state.isLoading && this.state.MaxDetails.length > 0 ?
                        <View style={styles.ContentTop}>
                            <View style={styles.ContentTopMiddle}>
                                <View style={styles.ContentTopMiddleLeftContainer}>
                                    <View style={this.state.MaxDetails[0].CallType === 1 ? styles.Buy:styles.Sell}>
                                        <NormalText style={{marginBottom:0,fontSize:15,color:'white'}}>{this.state.MaxDetails[0].CallType === 1 ? "BUY":"SELL"}</NormalText>
                                    </View>
                                    <View style={{height:50,justifyContent:'space-evenly'}}>
                                        <NormalText style={{marginBottom:0,fontSize:12,color:'white'}}>{`${this.state.MaxDetails[0].Symbol} ${MarketSegmentId !== "1" ? formatDate(ExpiryDate):""} ${MarketSegmentId === "9" || MarketSegmentId === "11" || MarketSegmentId === "12" ? `${FutOption} ${StrikePrice}`:""} `  }</NormalText>
                                        <NormalText style={{marginBottom:0,fontSize:12,color:'white'}}>{this.GetAddedDateTime(TipStartDate)}</NormalText>
                                    </View>
                                </View>
                                <View style={styles.ContentTopMiddleRightContainer}>
                                    <View style={{height:50,justifyContent:'space-evenly',alignItems:'flex-end'}}>
                                        <NormalText style={{marginBottom:0,fontSize:12,color:'white'}}>Profit</NormalText>
                                        <View style={{flexDirection:'row',width:'100%'}}>
                                            {ProfitPerInvestment !== 0 ?   <FontAwesome name="arrow-up" size={14} color={`${ProfitPerInvestment > 0 ? "green":ProfitPerInvestment < 0 ? "red":"white" }`} />:null }
                                            <NormalText style={{marginBottom:0,fontSize:12,color:`${ProfitPerInvestment > 0 ? "green":ProfitPerInvestment < 0 ? "red":"white" }`,marginLeft:5}}>{ProfitPerInvestment} ₹</NormalText>
                                        </View>                    
                                    </View>
                                </View>
                               
                            </View>
                        </View>:null}
                        
                        {!this.state.isLoading && this.state.MaxDetails.length > 0 ?
                        <View style={styles.ContentBottomContainer}>
                            <View style={styles.ContentBottomLeft}>
                                <NormalText style={styles.ContentBottomHeadingText}>{MarketSegmentName}</NormalText>
                                <NormalText style={styles.ContentBottomNormalText}>Status {CallStatus === "A" ? "Active":"In-Active"}</NormalText>
                            </View>
                            <View style={styles.ContentBottomRight}>
                                <NormalText style={styles.ContentBottomHeadingText}>Accuracy</NormalText>
                                <NormalText style={styles.ContentBottomNormalText}>{this.state.MaxDetails[0].Accuracy} %</NormalText>
                            </View>
                        </View>:null}

                        {this.state.isLoading?
                        <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="white"/>
                        </View>
                        :null}
                    </View>

                    {this.state.MaxDetails.length > 0 && !this.state.isLoading ? 
                    <View style={styles.ContentBottom}>
                        <CollapsibleCard style={styles.CustomCard} Heading="Company">
                            <View style={styles.CustomCardCompanyContainer}>
                                <View style={styles.CustomCardCompanyLeft}>
                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{`${this.state.MaxDetails[0].Symbol} ${MarketSegmentId !== "1" ? formatDate(ExpiryDate):""}`}</NormalText>
                                    {MarketSegmentId === "9" || MarketSegmentId === "11" || MarketSegmentId === "12" ? 
                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{`${FutOption} ${StrikePrice}`}</NormalText>:null}
                                </View>
                                <View style={styles.CustomCardCompanyRight}>
                                    <NormalText style={{fontSize:15,marginBottom:0}}>{this.GetAddedDateTime(TipStartDate)}</NormalText>
                                </View>
                            </View>                            
                        </CollapsibleCard>

                        <CollapsibleCard style={styles.CustomCard} Heading={CMPName}>
                            <View style={styles.CustomCardCompanyContainer}>
                                <View style={styles.CustomCardCompanyLeft}>
                                    <BoldText style={{fontSize:15,color:'black',marginBottom:0}}>Trigger Min</BoldText>
                                    <NormalText style={{fontSize:17,marginBottom:0,marginTop:5}}>{CMPMin}</NormalText>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0,marginTop:15}}>Triggers at 1500</NormalText>
                                </View>
                                <View style={{...styles.CustomCardCompanyRight,...{alignItems:'flex-start'}}}>
                                    <BoldText style={{fontSize:15,marginBottom:0,color:'black'}}>Trigger Max</BoldText>
                                    <NormalText style={{fontSize:17,marginBottom:0,marginTop:5}}>{CMPMax}</NormalText>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0,marginTop:15}}>Activates at 9.30</NormalText>
                                </View>
                            </View>                            
                        </CollapsibleCard>

                        <CollapsibleCard style={styles.CustomCard} Heading="Target">
    
                                <View style={styles.CustomCardTargetStoplossHeading}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <BoldText style={{fontSize:15,marginVertical:0}}>Target</BoldText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <BoldText style={{fontSize:15,marginVertical:0}}>Target Time</BoldText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnRight}>
                                        <BoldText style={{fontSize:15,marginVertical:0}}>Hit</BoldText>
                                    </View>
                                </View>
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3000</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>8.30</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3000</NormalText>
                                    </View>
                                </View>
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3800</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>-</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>-</NormalText>
                                    </View>
                                </View>
                          
                        </CollapsibleCard>

                        <CollapsibleCard style={styles.CustomCard} Heading="Stoploss">
    
                                <View style={styles.CustomCardTargetStoplossHeading}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <BoldText style={{fontSize:15,marginVertical:0}}>Stoploss</BoldText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <BoldText style={{fontSize:15,marginVertical:0}}>Stoploss Time</BoldText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnRight}>
                                        <BoldText style={{fontSize:15,marginVertical:0}}>Hit</BoldText>
                                    </View>
                                </View>
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3000</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>8.30</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3000</NormalText>
                                    </View>
                                </View>
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3800</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>-</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>-</NormalText>
                                    </View>
                                </View>
                          
                        </CollapsibleCard>

                        <Card style={styles.CustomCard}>
                            <View style={styles.CustomCardHeading}>
                                <View style={{width:'50%'}}>
                                    <NormalText style={{marginBottom:0,fontSize:17,color:'black'}}>Duration</NormalText>
                                </View>
                                <View style={{width:'50%',paddingHorizontal:5,alignItems:'flex-end'}}>
                                    <NormalText style={{marginBottom:0,fontSize:17,color:'black'}}>Intraday</NormalText>
                                </View>
                            </View>
                        </Card>

                        

                        <View style={styles.BpExitContainer}>
                                <View style={styles.BPExitTopHeader}>
                                    <NormalText style={{color:'white',marginBottom:0,fontSize:17}}>Book Profit</NormalText>
                                </View>

                                <View style={{flexDirection:'row',width:'100%',paddingHorizontal:15,marginTop:15,alignItems:'center',justifyContent:'center'}}>
                                    <View style={{height:30,width:30,backgroundColor:'#102346',borderRadius:100,elevation:5,zIndex:5,justifyContent:'center',alignItems:'center'}}>
                                        <NormalText style={{color:'white',marginBottom:0,fontSize:15}}>1</NormalText>
                                    </View>
                                    <View style={{width:'80%',marginLeft:-15,paddingHorizontal:15,borderRadius:5,borderWidth:4,backgroundColor:'white',elevation:3,borderLeftColor:'white',borderTopColor:'white',borderBottomColor:'white',borderRightColor:'#F0B22A'}}>
                                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Book Profit</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3000</NormalText>
                                            </View>
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Investment Size</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>2,50,000</NormalText>
                                            </View>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Profit</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>1000</NormalText>
                                            </View>
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Time</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>2:50</NormalText>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flexDirection:'row',width:'100%',paddingHorizontal:15,marginTop:15,alignItems:'center',justifyContent:'center'}}>
                                    <View style={{height:30,width:30,backgroundColor:'#102346',borderRadius:100,elevation:5,zIndex:5,justifyContent:'center',alignItems:'center'}}>
                                        <NormalText style={{color:'white',marginBottom:0,fontSize:15}}>2</NormalText>
                                    </View>
                                    <View style={{width:'80%',marginLeft:-15,paddingHorizontal:15,borderRadius:5,borderWidth:4,backgroundColor:'white',elevation:3,borderLeftColor:'white',borderTopColor:'white',borderBottomColor:'white',borderRightColor:'#F0B22A'}}>
                                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Book Profit</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>3000</NormalText>
                                            </View>
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Investment Size</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>2,50,000</NormalText>
                                            </View>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Profit</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>1000</NormalText>
                                            </View>
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Time</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>2:50</NormalText>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                        </View>

                        <CollapsibleCard style={styles.CustomCard} Heading="Performance">
                            <View style={styles.CustomCardCompanyContainer}>
                                <View style={styles.CustomCardCompanyLeft}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0,marginTop:15}}>Accuracy</NormalText>
                                </View>
                                <View style={{...styles.CustomCardCompanyRight,...{alignItems:'flex-end'}}}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0,marginTop:15}}>{this.state.MaxDetails[0].Accuracy}%</NormalText>
                                </View>
                            </View>    
                            <View style={styles.CustomCardCompanyContainer}>
                                <View style={styles.CustomCardCompanyLeft}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0}}>ROI</NormalText>
                                </View>
                                <View style={{...styles.CustomCardCompanyRight,...{alignItems:'flex-end'}}}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].ROI} %</NormalText>
                                </View>
                            </View>          
                            <View style={styles.CustomCardCompanyContainer}>
                                <View style={styles.CustomCardCompanyLeft}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0}}>Profit</NormalText>
                                </View>
                                <View style={{...styles.CustomCardCompanyRight,...{alignItems:'flex-end'}}}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0}}>{ProfitPerInvestment} ₹</NormalText>
                                </View>
                            </View>          
                            <View style={styles.CustomCardCompanyContainer}>
                                <View style={styles.CustomCardCompanyLeft}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0}}>Investment</NormalText>
                                </View>
                                <View style={{...styles.CustomCardCompanyRight,...{alignItems:'flex-end'}}}>
                                    <NormalText style={{fontSize:17,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].InvestmentSizeLot !== null ? this.state.MaxDetails[0].InvestmentSizeLot : this.state.MaxDetails[0].InvestmentSizeEq } {`${this.state.MaxDetails[0].InvestmentSizeLot !== null ? 'Lot':`${'₹'}`}`}</NormalText>
                                </View>
                            </View>                            
                        </CollapsibleCard>
                    </View>:null}
                </ScrollView>
              </View>
              
              <View style={styles.EditCallContainer}>
                <TouchableOpacity style={styles.EditCallButtonContainer}>
                    <View style={styles.EditCallButton}>
                        <NormalText style={styles.EditCallButtonText}>Edit Call</NormalText>
                    </View>
                </TouchableOpacity>
              </View>
          </Container>
        )
    }
}

const styles=StyleSheet.create({
    CallDetailsContainer:{
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor:'#EBECF1'
    },
    EditCallContainer:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    EditCallButtonContainer:{
        width:'50%'
    },
    EditCallButton:{
        width:'100%',
        height:35,
        borderRadius:10,
        backgroundColor:'#F0B22A',
        elevation:3,
        alignItems:'center',
        justifyContent:'center'
    },
    EditCallButtonText:{
        fontSize:16,
        color:'white',
        marginBottom:0
    },
    CallDetailsContentContainer:{
        flex:1,
        width:'100%'
    },
    CallDetailsScrollView:{
        width:'100%'
    },
    ContentTopContainer:{
        width:'100%',
        height:200,
        backgroundColor:"#0f2346"
    },
    ContentTop:{
        flexDirection:'row',
        height:'65%'
    },
    ContentTopMiddle:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        borderBottomColor:'#21365A',
        borderWidth:1
    },
    ContentTopMiddleLeftContainer:{
        width:'65%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    Buy:{
        width:50,
        height:50,
        backgroundColor:'#378E61',
        marginRight:10,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    Sell:{
        width:50,
        height:50,
        backgroundColor:'#ff6961',
        marginRight:10,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    ContentTopMiddleRightContainer:{
        width:'35%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    ContentBottomContainer:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        padding:10
    },
    ContentBottomLeft:{
        width:'50%',
        alignItems:'center',
        borderBottomColor:'#0F2346',
        borderLeftColor:'#0F2346',
        borderTopColor:'#0F2346',
        borderRightColor:'#21365A',
        borderWidth:1
    },
    ContentBottomRight:{
        width:'50%',
        alignItems:'center'
    },
    ContentBottomHeadingText:{
        color:'#5F7297',
        fontSize:16,
        marginBottom:0
    },
    ContentBottomNormalText:{
        color:'white',
        fontSize:16
    },
    ContentBottom:{
        width:'100%',
        alignItems:'center',
        paddingVertical:10
    },
    CustomCard:{
        borderRadius:7,
        width:'95%',
        marginTop:10,
        elevation:3
    },
    CustomCardCompanyContainer:{
        flexDirection:'row',
        padding:10
    },
    CustomCardTargetStoploss:{
    },
    CustomCardTargetStoplossHeading:{
        width:'100%',
        flexDirection:'row',
        height:35,
        backgroundColor:'#E8EAED',
        paddingHorizontal:10
    },
    CustomCardTargetStoplossContent:{
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:10
    },
    CustomCardCompanyLeft:{
        width:'50%',
        alignItems:'flex-start'
    },
    CustomCardCompanyRight:{
        width:'50%',
        alignItems:'flex-end'
    },
    TargetStoplossColumnLeft:{
        width:'33.33%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    TargetStoplossColumnMid:{
        width:'33.33%',
        alignItems:'center',
        justifyContent:'center'
    },
    TargetStoplossColumnRight:{
        width:'33.33%',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    TargetStoplossColumnHit:{
        width:'33.33%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    Check:{
        width:25,
        height:25,
        borderWidth:1,
        borderColor:'#F0B22A',
        marginRight:10,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
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
    BpExitContainer:{
        width:'100%',
        alignItems:'center',
        marginTop:15
    },
    BPExitTopHeader:{
        width:150,
        height:35,
        backgroundColor:'#F0B22A',
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    }
})


const mapStateToProps= state =>{
    return{
      MiniCDState:state.CallDetails.MiniCallDetails,
      MaxCDState:state.CallDetails.MaxCallDetails,
      loginState:state.login.login
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetLogin:(response)=>dispatch(setLogin(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CallDetails);