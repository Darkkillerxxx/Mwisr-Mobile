import React from 'react'
import {View, StyleSheet,ActivityIndicator, TouchableOpacity,FlatList} from 'react-native'
import Container from '../../Components/Container'
import {NavigationEvents} from 'react-navigation'
import {get_pacakge_details,get_research_reports} from '../../Utils/api'
import { connect }from 'react-redux'
import NormalText from '../../Components/NormalText'
import * as Progress from 'react-native-progress'; 
import { FontAwesome } from '@expo/vector-icons';
import CollapsibleCard from '../../Components/CollapsibleCard'
import Card from '../../Components/Card'
import ViewCalls from '../../Components/ViewCalls'
import ReportsCard from '../../Components/ReportsCard'

class PackageDetails extends React.Component{
    constructor(){
        super()
        this.state={
            Details:[],
            HeadingDetails:0,
            isLoading:true,
            SelectedTab:"",
            Reports:[]
        }
    }

    onInitialize=()=>{
        this.setState({isLoading:true})
        let payload={
            forOwnerId:this.props.navigation.state.params.OwnerId,
            packageId:this.props.navigation.state.params.PackageId
        }

        let ReportsPayload={
            forUserId:this.props.navigation.state.params.OwnerId,
            PackageIds:this.props.navigation.state.params.PackageId,
            Tags:"",
            SectorIds:"",
            MasterScripCodeIds:"",
            CoverageTypeIds:"",
            MarketCapIds:"",
            SegmentIds:"",
            ResearchHousIds:"",
            AuthorIds:"",
            ReportTypeIds:"",
            Symbol:""
        }

        console.log(ReportsPayload)

        get_pacakge_details(this.props.loginState.AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Details:result.Data},()=>{
                    this.setState({isLoading:false})
                })
            }
        })

        get_research_reports(this.props.loginState.AuthHeader,ReportsPayload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Reports:result.Data},()=>{
                    console.log("Package Details Reports",this.state.Reports)
                })
            }
        })
    }

    SelectTab = (Tab) => {
        this.setState({SelectedTab:Tab})
    }

    ShowReports=(itemData)=>{
        return(
            <ReportsCard report={itemData.item}/>
        )
    }

   

   HandleCreatedDate=(date)=>{
    let DateArray=date.split('T')
    return DateArray[0]
   }
    render(){
        
        return(
            <Container style={styles.PackageDetailsContainer}>
                <NavigationEvents onDidFocus={() => this.onInitialize()}/>
                   <View style={styles.PackageTopContainer}>
                    
                    { this.state.isLoading ? null:
                        <View style={styles.PackageTop}>
                            <View style={styles.PackageTopLeft}>
                                <NormalText style={{fontSize:14,color:'white',marginBottom:0}}>Total Profit</NormalText>
                                <NormalText style={{fontSize:14,color:'green'}}> ₹ {this.state.Details[this.state.HeadingDetails].ProfitPerInvestment} </NormalText>
                            </View>
                            <View style={styles.PackageTopRight}>
                                <NormalText style={{fontSize:14,color:'white',marginBottom:0}}>{this.state.Details[this.state.HeadingDetails].PackageName}</NormalText>
                                <View style={styles.PackageTopRightButtonsContainer}>
                                    <TouchableOpacity>
                                        <View style={styles.TopRightButtons}>
                                            <NormalText style={{fontSize:10,color:'white',marginBottom:0}}>Assign Users</NormalText>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={styles.TopRightButtons}>
                                            <NormalText style={{fontSize:10,color:'white',marginBottom:0}}>Package Permissions</NormalText>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.AccuracyContainer}>
                                    <View style={styles.AccuracyTextContainer}>
                                        <NormalText style={{fontSize:12,color:'white',marginBottom:5}}>Accuracy</NormalText>
                                        <NormalText style={{fontSize:12,color:'white',marginBottom:5}}>{this.state.Details[this.state.HeadingDetails].AVGAccuracy} %</NormalText>
                                    </View>
                                    <Progress.Bar progress={parseInt(this.state.Details[this.state.HeadingDetails].AVGAccuracy)/100} color='#36A077' unfilledColor='#233A5A' width={200}/>
                                </View>
                            </View>
                        </View>}
                        
                        { this.state.isLoading ? null: 
                        <View style={styles.PackageBottom}>
                            <View style={styles.PackageBottomContent}>
                                <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                    <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>ROI</NormalText>
                                    <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.Details[this.state.HeadingDetails].AvgROI} %</NormalText>
                                </View>
                            </View>
                            <View style={styles.PackageBottomContent}>
                                <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                    <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>Calls</NormalText>
                                    <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.Details[this.state.HeadingDetails].TotalCalls}</NormalText>
                                </View>
                            </View>
                            <View style={styles.PackageBottomContent}>
                                <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                    <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>Risk : Reward</NormalText>
                                    <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.Details[this.state.HeadingDetails].RiskAvg} : {this.state.Details[this.state.HeadingDetails].RewardAvg}</NormalText>
                                </View>
                            </View>
                        </View>}

                        <View style={{...styles.LeftRightArrowContainers,...{alignItems:`${this.state.HeadingDetails === 0 ? 'flex-end':'flex-start'}`}}}>
                            {this.state.HeadingDetails === 0 ? 
                            <TouchableOpacity onPress={()=>this.setState({HeadingDetails:1})}>
                                <View style={{height:35,width:35,borderRadius:100,backgroundColor:'black',opacity:0.5,alignItems:'center',justifyContent:'center'}}>
                                    <FontAwesome name="chevron-right" size={12} color="white" />
                                </View>
                            </TouchableOpacity>:
                            <TouchableOpacity onPress={()=>this.setState({HeadingDetails:0})}>
                                <View style={{height:35,width:35,borderRadius:100,backgroundColor:'black',opacity:0.5,alignItems:'center',justifyContent:'center'}}>
                                    <FontAwesome name="chevron-left" size={12} color="white" />
                                </View>
                            </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <View style={styles.TabContainer}>
                        <View style={this.state.SelectedTab === "" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("")}>
                                <NormalText style={this.state.SelectedTab === "" ? styles.TabsTextSelected:styles.TabsText}>Details</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={this.state.SelectedTab === "1" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("1")}>
                                <NormalText style={this.state.SelectedTab === "1" ? styles.TabsTextSelected:styles.TabsText}>Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={this.state.SelectedTab === "3" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("3")}>
                                <NormalText style={this.state.SelectedTab === "3" ? styles.TabsTextSelected:styles.TabsText}>Reports</NormalText>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.PackageBottomContainer}>
                        
                        {this.state.SelectedTab === "" && this.state.Details.length > 0 ? 
                       
                       <CollapsibleCard style={styles.CustomCollapsibleCard} Heading="Pakage Details">
                            <View style={styles.CollapsibleCardContent}>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Name</NormalText>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.Details[0].PackageName}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Owner Name</NormalText>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.Details[0].OwnerName}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Pakcage Created On</NormalText>
                                    <NormalText style={{fontSize:14,color:`black`,marginBottom:0}}>{this.HandleCreatedDate(this.state.Details[0].PackageCreatedOn)}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Package Type</NormalText>
                                    <NormalText style={{fontSize:14,color:`black`,marginBottom:0}}>{this.state.Details[0].PackageTypeName}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Exchanges</NormalText>
                                    <NormalText style={{fontSize:14,color:`black`,marginBottom:0}}>{this.state.Details[0].ForExchanges}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Calls</NormalText>
                                    <NormalText style={{fontSize:14,color:`black`,marginBottom:0}}>{this.state.Details[0].TotalCalls}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Active Calls</NormalText>
                                    <NormalText style={{fontSize:14,color:`black`,marginBottom:0}}>{this.state.Details[0].ActiveCalls}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Tips Triggered</NormalText>
                                    <NormalText style={{fontSize:14,color:`black`,marginBottom:0}}>{this.state.Details[0].TipsTriggered}</NormalText>
                                </View>
                                <View style={styles.ContentRow}>
                                    <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Package Description</NormalText>
                                    <NormalText style={{fontSize:14,color:`${this.state.Details[0].PackageDescription === "" ? 'grey':'black'}`,marginBottom:0}}>{this.state.Details[0].PackageDescription === "" ? 'Not Available':this.state.Details[0].PackageDescription}</NormalText>
                                </View>
                            </View>
                        </CollapsibleCard>:
                        this.state.SelectedTab === "1" ? 
                        <Card style={styles.CallsCard}>
                            <ViewCalls 
                                AuthHeader={this.props.loginState.AuthHeader} 
                                STab={""}
                                UserId={this.props.navigation.state.params.UserId}
                                OwnerId=""
                                ShowActive={true}
                                PackageId={this.props.navigation.state.params.PackageId}
                                PackageOwnerId=""
                                CallId=""
                                Exchange=""
                                Symbol=""
                                AssignedToMe={false}
                                CallDetails={this.MoveToCallDetails}/>
                        </Card> :
                        this.state.SelectedTab === "3" ? 
                        <FlatList 
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.Reports}
                            renderItem={this.ShowReports}
                            showsVerticalScrollIndicator={true}/>:null}
                    </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    PackageDetailsContainer:{
        justifyContent: 'flex-start'
    },
    PackageTopContainer:{
        width:'100%',
        height:200,
        backgroundColor:"#102346"
    },
    PackageTop:{
        height:125,
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:"flex-start"
    },
    PackageBottom:{
        width:'100%',
        height:75,
        borderWidth:1,
        borderColor:'#25395D',
        flexDirection:'row'
    },
    PackageBottomContent:{
        width:'33%',
        alignItems:'center',
        justifyContent:'center'
    },
    PackageTopLeft:{
        width:'40%',
        height:'100%',
        alignItems:"flex-start",
        justifyContent:'center',
        paddingLeft:10
    },
    PackageTopRight:{
        width:'60%',
        height:'100%',
        alignItems:"flex-start",
        justifyContent:'center',
        paddingLeft:10
    },
    PackageTopRightButtonsContainer:{
        flexDirection:'row'
    },
    TopRightButtons:{
        padding:5,
        backgroundColor:'#378E61',
        borderRadius:5,
        marginTop:5,
        marginRight:5
    },
    AccuracyContainer:{
        marginTop:10
    },
    AccuracyTextContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    LeftRightArrowContainers:{
        width:'100%',
        height:35,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        marginTop:110,
        paddingHorizontal:10
    },
    TabContainer:{
        width:'100%',
        height:35,
        backgroundColor:'white',
        flexDirection:'row',
        elevation:3  
    },
    Tabs:{
        width:'33%',
        alignItems:'center',
        justifyContent:'center'
    },
    TabsSelected:{
        width:'33%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#F0B22A',
        borderBottomWidth:3
    },
    TabsText:{
        fontSize:10,
        color:'black',
        marginBottom:0
    },
    TabsTextSelected:{
        fontFamily:'open-sans-bold',
        fontSize:11,
        color:'black',
        marginBottom:0
    },
    PackageBottomContainer:{
        flex:1,
        width:"100%",
        padding:10,
        alignItems:"center"
    },
    CustomCollapsibleCard:{
        width:'95%',
        borderRadius:10
    },
    CollapsibleCardContent:{
        width:'100%'
    },
    ContentRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginVertical:5
    },
    CallsCard:{
        flex:1,
        width:'100%',
        elevation:3,
        margin:10,
        backgroundColor:'white'
    }
})

const mapStateToProps= state =>{
    return{
        loginState:state.login.login
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetMiniCD:(response)=>dispatch(setMiniDetails(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PackageDetails);