import React from 'react'
import { View, StyleSheet, TouchableOpacity,ActivityIndicator,FlatList } from 'react-native';
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
            SelectedTab:0,
            TotalLegs:1
        }
    }

    triggerCollapse=()=>{
        this.refs.Company.CollapseCard()
    }

    getCallDetails=(pId,cId)=>{
        this.setState({TotalLegs:this.props.MiniCDState.Legs.length})
        console.log(this.props.MiniCDState.Legs)
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

    ChangeTab=(SelectedTab)=>{
        const {PackageId,CallId,MarketSegmentId,MarketSegmentName,ProfitPerInvestment,ExpiryDate,FutOption,CallStatus,StrikePrice,TipStartDate,CMPMin,CMPMax,CMPName}=this.props.MiniCDState.Legs[SelectedTab]
        this.setState({SelectedTab:SelectedTab},()=>{
            this.getCallDetails(PackageId,CallId)
        })
    }

    render()
    {
        let ShowTabs=this.props.MiniCDState.Legs.map((result,index)=>{
            return(
                <TouchableOpacity onPress={()=>this.ChangeTab(index)} style={{width:`${100/this.props.MiniCDState.Legs.length}%`}}>
                    <View style={this.state.SelectedTab === index ? styles.SelectedTab:styles.Tabs}>
                        <NormalText style={this.state.SelectedTab === index ? styles.TabsTextSelected:styles.TabsText}>LEG {index + 1}</NormalText>
                    </View>
                </TouchableOpacity>
            )
        })

       const {PackageId,CallId,MarketSegmentId,MarketSegmentName,ProfitPerInvestment,ExpiryDate,FutOption,CallStatus,StrikePrice,TipStartDate,CMPMin,CMPMax,CMPName}=this.props.MiniCDState.Legs[this.state.SelectedTab]
        return(
          <Container style={styles.CallDetailsContainer}>
              <NavigationEvents onDidFocus={() => this.getCallDetails(PackageId,CallId) } />
              {this.state.TotalLegs > 1 ? 
              <View style={styles.TabsContainer}>
                {ShowTabs}
              </View>:null}
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
                                    {/* <NormalText style={{fontSize:17,color:'black',marginBottom:0,marginTop:15}}>Triggers at 1500</NormalText> */}
                                </View>
                                <View style={{...styles.CustomCardCompanyRight,...{alignItems:'flex-start'}}}>
                                    <BoldText style={{fontSize:15,marginBottom:0,color:'black'}}>Trigger Max</BoldText>
                                    <NormalText style={{fontSize:17,marginBottom:0,marginTop:5}}>{CMPMax}</NormalText>
                                    {/* <NormalText style={{fontSize:17,color:'black',marginBottom:0,marginTop:15}}>Activates at 9.30</NormalText> */}
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
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].Target1}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].T1Time === null ? '-':this.state.MaxDetails[0].T1Time}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        {this.state.MaxDetails[0].T1Value !== null ? 
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>:null}
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].T1Value === null ? "-":this.state.MaxDetails[0].T1Value}</NormalText>
                                    </View>
                                </View>

                                {this.state.MaxDetails[0].Target2 !== 0 ? 
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].Target2}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].T2Time === null ? '-':this.state.MaxDetails[0].T2Time}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        {this.state.MaxDetails[0].T2Value !== null ? 
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>:null}
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].T2Value === null ? "-":this.state.MaxDetails[0].T2Value}</NormalText>
                                    </View>
                                </View>:null}
                                
                                {this.state.MaxDetails[0].Target3 !== 0 ? 
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].Target3}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].T3Time === null ? '-':this.state.MaxDetails[0].T3Time}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        {this.state.MaxDetails[0].T3Value !== null ? 
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>:null}
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].T3Value === null ? "-":this.state.MaxDetails[0].T3Value}</NormalText>
                                    </View>
                                </View>:null}
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
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].StopLoss1}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}> {this.state.MaxDetails[0].S1Time === null ? '-':this.state.MaxDetails[0].S1Time} </NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        {this.state.MaxDetails[0].S1Value !== null ?
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>:null}
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].S1Value === null ? "-":this.state.MaxDetails[0].S1Value}</NormalText>
                                    </View>
                                </View>
                                {this.state.MaxDetails[0].StopLoss2 !== 0 ? 
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].StopLoss2}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}> {this.state.MaxDetails[0].S2Time === null ? '-':this.state.MaxDetails[0].S2Time} </NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        {this.state.MaxDetails[0].S2Value !== null ?
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>:null}
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].S2Value === null ? "-":this.state.MaxDetails[0].S2Value}</NormalText>
                                    </View>
                                </View>:null}

                                {this.state.MaxDetails[0].StopLoss3 !== 0 ? 
                                <View style={styles.CustomCardTargetStoplossContent}>
                                    <View style={styles.TargetStoplossColumnLeft}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].StopLoss3}</NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnMid}>
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}> {this.state.MaxDetails[0].S3Time === null ? '-':this.state.MaxDetails[0].S3Time} </NormalText>
                                    </View>
                                    <View style={styles.TargetStoplossColumnHit}>
                                        {this.state.MaxDetails[0].S3Value !== null ?
                                        <View style={styles.Check}>
                                            <FontAwesome name="check" size={12} color="black" />
                                        </View>:null}
                                        <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].S3Value === null ? "-":this.state.MaxDetails[0].S3Value}</NormalText>
                                    </View>
                                </View>:null}
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

                        
                        {this.state.MaxDetails[0].BP1 !== null ? 
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
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BP1}</NormalText>
                                            </View>
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Investment Size</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPTargetAmt1}</NormalText>
                                            </View>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Profit</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPTargetPrice1}</NormalText>
                                            </View>
                                            <View style={{width:'50%',alignItems:'center'}}>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Time</NormalText>
                                                <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPHitDate1}</NormalText>
                                            </View>
                                        </View>
                                    </View>
                                </View>


                                {this.state.MaxDetails[0].BP2 !== null ? 
                                    <View style={{flexDirection:'row',width:'100%',paddingHorizontal:15,marginTop:15,alignItems:'center',justifyContent:'center'}}>
                                        <View style={{height:30,width:30,backgroundColor:'#102346',borderRadius:100,elevation:5,zIndex:5,justifyContent:'center',alignItems:'center'}}>
                                            <NormalText style={{color:'white',marginBottom:0,fontSize:15}}>2</NormalText>
                                        </View>
                                        <View style={{width:'80%',marginLeft:-15,paddingHorizontal:15,borderRadius:5,borderWidth:4,backgroundColor:'white',elevation:3,borderLeftColor:'white',borderTopColor:'white',borderBottomColor:'white',borderRightColor:'#F0B22A'}}>
                                            <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Book Profit</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BP2}</NormalText>
                                                </View>
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Investment Size</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPTargetAmt2}</NormalText>
                                                </View>
                                            </View>
                                            <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Profit</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPTargetPrice2}</NormalText>
                                                </View>
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Time</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPHitDate2}</NormalText>
                                                </View>
                                            </View>
                                        </View>
                                    </View>:null}

                                    {this.state.MaxDetails[0].BP3 !== null ? 
                                    <View style={{flexDirection:'row',width:'100%',paddingHorizontal:15,marginTop:15,alignItems:'center',justifyContent:'center'}}>
                                        <View style={{height:30,width:30,backgroundColor:'#102346',borderRadius:100,elevation:5,zIndex:5,justifyContent:'center',alignItems:'center'}}>
                                            <NormalText style={{color:'white',marginBottom:0,fontSize:15}}>3</NormalText>
                                        </View>
                                        <View style={{width:'80%',marginLeft:-15,paddingHorizontal:15,borderRadius:5,borderWidth:4,backgroundColor:'white',elevation:3,borderLeftColor:'white',borderTopColor:'white',borderBottomColor:'white',borderRightColor:'#F0B22A'}}>
                                            <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Book Profit</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BP3}</NormalText>
                                                </View>
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Investment Size</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPTargetAmt3}</NormalText>
                                                </View>
                                            </View>
                                            <View style={{width:'100%',flexDirection:'row',marginVertical:5}} >
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Profit</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPTargetPrice3}</NormalText>
                                                </View>
                                                <View style={{width:'50%',alignItems:'center'}}>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>Time</NormalText>
                                                    <NormalText style={{fontSize:15,color:'black',marginBottom:0}}>{this.state.MaxDetails[0].BPHitDate3}</NormalText>
                                                </View>
                                            </View>
                                        </View>
                                    </View>:null}
                        </View>:null}

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
              
              {this.props.loginState.UserTypeId !== 7  ?
              <View style={styles.EditCallContainer}>
                <TouchableOpacity style={styles.EditCallButtonContainer}>
                    <View style={styles.EditCallButton}>
                        <NormalText style={styles.EditCallButtonText}>Edit Call</NormalText>
                    </View>
                </TouchableOpacity>
              </View>:null}
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
    },
    TabsContainer:{
        width:'100%',
        height:35,
        flexDirection:'row',
        elevation:3
    },
    Tabs:{
        alignItems:'center',
        justifyContent:'center',
        height:35,
        backgroundColor:'white'
    },
    SelectedTab:{
        alignItems:'center',
        justifyContent:'center',
        height:35,
        backgroundColor:'white',
        borderBottomWidth:3,
        borderColor:'#f5bb18'
    },
    TabsText:{
        fontSize:12,
        color:'black',
        marginBottom:0
    },
    TabsTextSelected:{
        fontFamily:'open-sans-bold',
        fontSize:12,
        color:'black',
        marginBottom:0
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