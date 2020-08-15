import React from 'react';
import { View,StyleSheet,TouchableOpacity, ScrollView,Image,FlatList,ActivityIndicator} from 'react-native';
import Container from '../../Components/Container';
import NormalText from '../../Components/NormalText';
import { connect }from 'react-redux'
import ViewCalls from '../../Components/ViewCalls.js'
import {NavigationEvents} from 'react-navigation'
import {get_sub_detail,get_research_reports} from '../../Utils/api'
import CollapsibleCard from '../../Components/CollapsibleCard'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CustomButton from '../../Components/Button'
import Packages from '../../Components/Pacakges'
import ReportsCard from '../../Components/ReportsCard'
import Users from '../../Components/Users'

class UserDetails extends React.Component {
    constructor() {
        super();
        this.state={
            SelectedTab:"",
            UserDetails:[],
            Reports:[]
        }
    }

    SelectTab=(Tab)=>{
        this.setState({SelectedTab:Tab})
    }

    onInitialize=()=>{
        const {AuthHeader}=this.props.loginState
        const {UserId,OwnerId}=this.props.navigation.state.params
        let payload={
            ForOwnerId:OwnerId,
            ForUserId:UserId
        }

        let ReportsPayload={
            forUserId:UserId,
            PackageIds:"",
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

        console.log(payload)
        get_sub_detail(AuthHeader,payload).then(result=>{
            console.log(result)
            if(result.IsSuccess)
            {
                this.setState({UserDetails:result.Data})
            }
        })

        get_research_reports(AuthHeader,ReportsPayload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Reports:result.Data})
            }
        })
    }

    resetDetails=()=>{
        this.setState({SelectedTab:"",
                       UserDetails:[],
                       Reports:[]})
    }

    ShowReports=(itemData)=>{
        return(
            <ReportsCard report={itemData.item}/>
        )
    }

    MoveToUserPermissions=()=>{
        this.props.navigation.navigate('UserPermission',{
            UserId:this.props.navigation.state.params.UserId,
            OwnerId:this.props.navigation.state.params.OwnerId,
            Route:2
        })
    }

    render()
    {
        return(
           <Container style={styles.CustomContainer}>
               <NavigationEvents onDidFocus={() => this.onInitialize()} onDidBlur={()=>this.resetDetails()}/>
               <View style={styles.ProfileHeading}>
                    {this.state.UserDetails.length > 0 ? 
                    <View style={{width:'100%',height:125,flexDirection:'row',alignItems:'center',paddingHorizontal:10}}>
                        <View style={{width:'30%',alignItems:'flex-start',justifyContent:'center'}}>
                            <View>
                                <NormalText style={{...styles.AccuracyNo,...{backgroundColor:this.props.navigation.state.params.UserColor}}}>{parseInt(this.state.UserDetails[0].Accuracy)}</NormalText>
                            </View>
                            <AnimatedCircularProgress
                                size={80}
                                width={5}
                                fill={parseInt(this.state.UserDetails[0].Accuracy)}
                                tintColor={this.props.navigation.state.params.UserColor}
                                onAnimationComplete={() =>{}}
                                backgroundColor="white"
                                rotation={180}>
                                    {
                                        (fill)=>(
                                            <Image source={require('../../assets/Images/Analyst.png')} style={styles.ProfilePic}/>
                                        )
                                    }
                            </AnimatedCircularProgress>
                            <NormalText style={{...styles.AccuracyText,...{backgroundColor:this.props.navigation.state.params.UserColor}}}>Accuracy</NormalText>
                        </View>
                        <View style={{width:'70%'}}>
                            <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.UserDetails[0].Name}</NormalText>
                            <View style={{flexDirection:'row'}}>
                                <CustomButton style={{height:20,width:90,borderRadius:5,backgroundColor:"#378E61"}}>
                                    <TouchableOpacity onPress={()=>this.MoveToUserPermissions()}>
                                        <NormalText style={{fontSize:10,color:'white',marginBottom:0}}>User Permission</NormalText>
                                    </TouchableOpacity>
                                </CustomButton>
                                <CustomButton style={{height:20,width:90,borderRadius:5,backgroundColor:"#378E61",marginLeft:5}}>
                                    <TouchableOpacity >
                                        <NormalText style={{fontSize:10,color:'white',marginBottom:0}}>Activate User</NormalText>
                                    </TouchableOpacity>
                                </CustomButton>    
                            </View>
                        </View>
                    </View>:
                    <View style={{height:'100%',width:'100%',align:'center',justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="white" />
                    </View>   
                    }
                    {this.state.UserDetails.length > 0 ? 
                    <View style={{width:'100%',height:75,borderWidth:1,borderColor:'#25395D',flexDirection:'row'}}>
                        <View style={{width:'33%',alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>Profit</NormalText>
                                <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>₹ {this.state.UserDetails[0].ProfitPerInvestment}</NormalText>
                            </View>
                        </View>
                        <View style={{width:'33%',alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>ROI</NormalText>
                                <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.UserDetails[0].ROI} %</NormalText>
                            </View>
                        </View>
                        <View style={{width:'33%',alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>Calls</NormalText>
                                <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.UserDetails[0].Calls}</NormalText>
                            </View>
                        </View>
                    </View>:null}
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
                    <View style={this.state.SelectedTab === "4" ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.SelectTab("4")}>
                            <NormalText style={this.state.SelectedTab === "4" ? styles.TabsTextSelected:styles.TabsText}>Users</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedTab === "2" ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.SelectTab("2")}>
                            <NormalText style={this.state.SelectedTab === "2" ? styles.TabsTextSelected:styles.TabsText}>Packages</NormalText>
                        </TouchableOpacity>
                    </View>
                     <View style={this.state.SelectedTab === "3" ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.SelectTab("3")}>
                            <NormalText style={this.state.SelectedTab === "3" ? styles.TabsTextSelected:styles.TabsText}>Reports</NormalText>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ContentsContainer}>
                    {this.state.SelectedTab === "1" ? 
                        <View style={styles.CallsCard}>
                            <ViewCalls 
                            AuthHeader={this.props.loginState.AuthHeader} 
                            STab={""}
                            UserId={this.props.navigation.state.params.UserId}
                            OwnerId={this.props.navigation.state.params.OwnerId}
                            ShowActive={true}
                            PackageId=""
                            PackageOwnerId=""
                            CallId=""
                            Exchange=""
                            Symbol=""
                            AssignedToMe={false}
                            CallDetails={this.MoveToCallDetails}/>
                        </View>:
                        this.state.SelectedTab === "" ? 
                        this.state.UserDetails.length > 0 ?
                        <ScrollView style={{width:'100%'}}>
                             
                            <CollapsibleCard style={styles.CustomCollapsibleCard} Heading={"Profile & Contact Info"}>
                                <View style={styles.CollapsibleCardContent}>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Name</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.UserDetails[0].Name}</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Mobile No.</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>+91{this.state.UserDetails[0].MobileNo}</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Email Id</NormalText>
                                        <NormalText style={{fontSize:14,color:`${this.state.UserDetails[0].EmailId === "" || this.state.UserDetails[0].EmailId === null ? "grey":"black"}`,marginBottom:0}}>{this.state.UserDetails[0].EmailId === "" || this.state.UserDetails[0].EmailId === null ? "Not Available":this.state.UserDetails[0].EmailId }</NormalText>
                                    </View>
                                </View>
                            </CollapsibleCard>

                            <CollapsibleCard style={styles.CustomCollapsibleCard} Heading={"Buisness Registration"}>
                                <View style={styles.CollapsibleCardContent}>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>SEBI Registration No.</NormalText>
                                        <NormalText style={{fontSize:14,marginBottom:0,color:`${this.state.UserDetails[0].SEBIRegistrationNo === "" || this.state.UserDetails[0].SEBIRegistrationNo === null ? "grey":"black"}`}}>{this.state.UserDetails[0].SEBIRegistrationNo === "" || this.state.UserDetails[0].SEBIRegistrationNo === null ? "Not Available":this.state.UserDetails[0].SEBIRegistrationNo}</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>PAN No.</NormalText>
                                        <NormalText style={{fontSize:14,marginBottom:0,color:`${this.state.UserDetails[0].PanNo === "" || this.state.UserDetails[0].PanNo === null ? "grey":"black"}`}}>{this.state.UserDetails[0].PanNo === "" || this.state.UserDetails[0].PanNo === null ? "Not Available":this.state.UserDetails[0].PanNo}</NormalText>
                                    </View>
                                </View>
                            </CollapsibleCard>

                            <CollapsibleCard style={styles.CustomCollapsibleCard} Heading={"Mwisr Information"}>
                                <View style={styles.CollapsibleCardContent}>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Profit</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.UserDetails[0].ProfitPerInvestment} ₹</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total ROI</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.UserDetails[0].ROI} %</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Accuracy</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.UserDetails[0].Accuracy}%</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Sub-Brokers</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>10</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Analyst</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>7</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Partner</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>5</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Customer</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>35</NormalText>
                                    </View>
                                    <View style={styles.ContentRow}>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Calls</NormalText>
                                        <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.UserDetails[0].Calls}</NormalText>
                                    </View>
                                </View>
                            </CollapsibleCard>
                        </ScrollView>:
                        <View style={{height:'100%',width:'100%',align:'center',justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="#F0B22A" />
                        </View>
                        :
                        this.state.SelectedTab === "2" ? 
                            <Packages Type={2} SelectedTab={"2"} UserProfile={true} UserId={this.props.navigation.state.params.UserId} OwnerId={this.props.navigation.state.params.OwnerId} assignedToMe={false} createdByMe={true} />
                        :
                        this.state.SelectedTab === "3" ? 
                        <FlatList 
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.Reports}
                            renderItem={this.ShowReports}
                            showsVerticalScrollIndicator={true}/>
                        : 
                        this.state.SelectedTab === "4" ? 
                            <Users UserColor="#16d39a" UserType={2} AuthHeader={this.props.loginState.AuthHeader} Type={2}/>       
                        : null}
                </View>

           </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustomContainer:{
        justifyContent: 'flex-start',
        backgroundColor:'#E9EAEF'
    },
    ProfileHeading:{
        width:'100%',
        height:200,
        backgroundColor:'#102346'
    },
    TabContainer:{
        width:'100%',
        height:35,
        backgroundColor:'white',
        flexDirection:'row',
        elevation:3  
    },
    Tabs:{
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    TabsSelected:{
        width:'20%',
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
    ContentsContainer:{
        flex:1,
        width:'100%',
        alignItems:'center',
    },
    CallsCard:{
        flex:1,
        width:'95%',
        elevation:3,
        margin:10,
        backgroundColor:'white'
    },
    CustomCollapsibleCard:{
        borderRadius:7,
        width:'95%',
        marginTop:10,
        elevation:3,
        alignSelf:'center'
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
    ProfilePic:{
        resizeMode:'stretch',
        width:80,
        height:80
    },
    AccuracyText:{
        textAlign:'center',
        borderRadius:10,
        backgroundColor:'#00e0ff',
        color:'white',
        marginTop:-10,
        width:75
    },
    AccuracyNo:{
        position:'absolute',
        zIndex:1,
        borderRadius:100,
        paddingHorizontal:10,
        paddingVertical:5,
        fontSize:12,
        backgroundColor:'#00e0ff',
        color:'white'
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

export default connect(mapStateToProps,mapDispatchToProps)(UserDetails);