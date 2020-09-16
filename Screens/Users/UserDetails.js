import React from 'react';
import { View,StyleSheet,TouchableOpacity, ScrollView,Image,FlatList,ActivityIndicator,Modal} from 'react-native';
import Container from '../../Components/Container';
import NormalText from '../../Components/NormalText';
import { connect }from 'react-redux'
import ViewCalls from '../../Components/ViewCalls.js'
import {NavigationEvents} from 'react-navigation'
import {get_sub_detail,get_research_reports,change_user_status,getUserOwnerDetails,get_customer_details,get_customer_answers,verbose} from '../../Utils/api'
import CollapsibleCard from '../../Components/CollapsibleCard'
import Card from '../../Components/Card'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CustomButton from '../../Components/Button'
import Packages from '../../Components/Pacakges'
import ReportsCard from '../../Components/ReportsCard'
import Users from '../../Components/Users'
import ViewReports from '../Reports/ViewReports'
import { FontAwesome } from '@expo/vector-icons';
import CallsFilter from '../../Components/CallsFilter'

class UserDetails extends React.Component {
    constructor() {
        super();
        this.state={
            SelectedTab:"",
            UserDetails:[],
            Reports:[],
            IsActive:null,
            OwnerDetails:[],
            ShowFilterModal:false,
            CallExchanges:[],
            CustomerDetails:[],
            CallStatus:true,
            CallSearch:"",
            CustomerAnswers:[],
            Name:"",
            Email:"",
            Contact:"",
            Profit:"",
            ROI:"",
            Calls:"",
            Accuracy:""
        }
    }

    SelectTab=(Tab)=>{
        this.setState({SelectedTab:Tab})
    }

    onInitialize=()=>{
        const {AuthHeader}=this.props.loginState
      console.log("UserType",this.props.navigation.state.params.UserType)
      if(this.props.navigation.state.params.UserType === 0)
      {
        let payload={
            forOwnerId:this.props.navigation.state.params.OwnerId
          }
          console.log("Payload",payload)
          getUserOwnerDetails(AuthHeader,payload).then(result=>{
            
            if(result.IsSuccess)
            {
                this.setState({OwnerDetails: result.Data},()=>{
                    console.log("Owner Details",result.Data)
                    this.setState({Name:result.Data[0].OwnerName})
                    this.setState({Email:result.Data[0].OwnerEMailId})
                    this.setState({Contact:result.Data[0].OwnerMobileNo})
                    this.setState({Profit:result.Data[0].Profit})
                    this.setState({ROI:result.Data[0].Roi})
                    this.setState({Calls:result.Data[0].TotalCalls})
                    this.setState({Accuracy:result.Data[0].Accuracy})
                    
                })
            }
            else
            {
                verbose(false,"Failed To Get Owner details",resul.DisplayMsg)
            }
          })

      }
      else if(this.props.navigation.state.params.UserType === 7)
      {

        let payload={
            ForUserId: this.props.navigation.state.params.UserId
          }

        get_customer_details(AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({CustomerDetails:[result.Data]},()=>{
                    console.log(this.state.CustomerDetails)
                    let payload={
                        forCustomerId:this.props.navigation.state.params.UserId
                    }

                    get_customer_answers(AuthHeader,payload).then(result=>{
                        if(result.IsSuccess)
                        {
                            this.setState({CustomerAnswers:result.Data},()=>{
                                // console.log(this.state.CustomerAnswers)
                                const {CustomerDetails}=this.props.navigation.state.params
                                console.log("Customer Details",CustomerDetails)
                                this.setState({Name:CustomerDetails[0].CustomerName})
                                this.setState({Email:CustomerDetails[0].CustomerContact})
                                this.setState({Contact:CustomerDetails[0].CustomerContact})
                                this.setState({Profit:CustomerDetails[0].TotalProfit})
                                this.setState({ROI:CustomerDetails[0].TotalROI})
                                this.setState({Calls:CustomerDetails[0].TotalCalls})
                                this.setState({Accuracy:CustomerDetails[0].Accuracy})

                                let payload={
                                    UserId:this.props.navigation.state.params.UserId
                                }

                                get_customer_details(this.props.loginState.AuthHeader,payload).then(res => {
                                    if(res.IsSuccess)
                                    {
                                        this.setState({CustomerDetails:result.Data})
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
      }
      else
      {
        const {UserId,OwnerId,IsActive,UserType} =this.props.navigation.state.params

      this.setState({IsActive:IsActive})

        let payload={
            ForOwnerId:OwnerId,
            ForUserId:UserId
        }

        let ReportsPayload={
            forUserId:UserType === 0 ? OwnerId : UserId,
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
            console.log("User Detail",result)
            if(result.IsSuccess)
            {
                this.setState({UserDetails:result.Data},()=>{
                    this.setState({Name:result.Data[0].Name})
                    this.setState({Email:result.Data[0].EmailId})
                    this.setState({Contact:result.Data[0].MobileNo})
                    this.setState({Profit:result.Data[0].ProfitPerInvestment})
                    this.setState({ROI:result.Data[0].ROI})
                    this.setState({Calls:result.Data[0].Calls})
                    this.setState({Accuracy:result.Data[0].Accuracy})
                })
            }
        })

        get_research_reports(AuthHeader,ReportsPayload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Reports:result.Data})
            }
        })
    }

    }

    resetDetails=()=>{
        this.setState({SelectedTab:"",
                       UserDetails:[],
                       Reports:[],
                       CustomerDetails:[],
                       OwnerDetails:[]})
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

    MoveToPackageDetails=(OwnerId,PackageId,PackageName)=>{
        console.log(OwnerId,PackageId,PackageName)
        this.props.navigation.navigate("PackageDetails",{
            OwnerId:OwnerId,
            PackageId:PackageId,
            PackageName:PackageName
        })
    }

    ActivateDeActivateUser=(Action)=>{
        let payload={
            userIdToBeActedOn:this.props.navigation.state.params.UserId,
            Action:Action,
            tillDate:""
        }
        change_user_status(this.props.loginState.AuthHeader,payload).then(result =>{
            if(result.IsSuccess)
            {
                this.setState({IsActive:!this.state.IsActive},()=>{
                    verbose(true,"Action Completed",`User Has Been ${this.state.IsActive ? "Activated":"DeActivated"}`)    
                })
            }
            else
            {
                verbose(false,"Failed To Complete Action",result.DisplayMsg)
            }
        })
    }

    render()
    {
        const {UserType,UserId} = this.props.navigation.state.params
      
        return(
           <Container style={styles.CustomContainer}>
               <NavigationEvents onDidFocus={() => this.onInitialize()} onDidBlur={()=>this.resetDetails()}/>
               <View style={styles.ProfileHeading}>
                    {this.state.UserDetails.length > 0 || this.state.OwnerDetails.length > 0 || this.state.CustomerDetails.length > 0 ? 
                    <View style={{width:'100%',height:125,flexDirection:'row',alignItems:'center',paddingHorizontal:10}}>
                        <View style={{width:'30%',alignItems:'flex-start',justifyContent:'center'}}>
                            <View>
                                <NormalText style={{...styles.AccuracyNo,...{backgroundColor:this.props.navigation.state.params.UserColor}}}>{parseInt(this.state.Accuracy)}</NormalText>
                            </View>
        
                            <AnimatedCircularProgress
                                size={80}
                                width={5}
                                fill={parseInt(this.state.Accuracy)}
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
                            <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.Name}</NormalText>
                            {UserType === 0 ? 
                            <>
                            <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.Email}</NormalText>
                            <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.Contact}</NormalText>
                            </>:null}
                            {UserType !== 0  ? 
                            <View style={{flexDirection:'row'}}>
                                {UserType !== 7 ? 
                                <CustomButton style={{height:20,width:90,borderRadius:5,backgroundColor:"#378E61"}}>
                                    <TouchableOpacity onPress={()=>this.MoveToUserPermissions()}>
                                        <NormalText style={{fontSize:10,color:'white',marginBottom:0}}>User Permission</NormalText>
                                    </TouchableOpacity>
                                </CustomButton>:null}


                                {UserType !== 7 ?
                                this.state.IsActive ? 
                                    <CustomButton style={{height:20,width:90,borderRadius:5,backgroundColor:"#ff6961",marginLeft:5}}>
                                        <TouchableOpacity onPress={()=>this.ActivateDeActivateUser('DeActivate')}>
                                            <NormalText style={{fontSize:10,color:'white',marginBottom:0}}>De-Activate User</NormalText>
                                        </TouchableOpacity>
                                    </CustomButton>
                                :
                                    <CustomButton style={{height:20,width:90,borderRadius:5,backgroundColor:"#378E61",marginLeft:5}}>
                                        <TouchableOpacity onPress={()=>this.ActivateDeActivateUser('Activate')}>
                                            <NormalText style={{fontSize:10,color:'white',marginBottom:0}}>Activate User</NormalText>
                                        </TouchableOpacity>
                                    </CustomButton>
                                :null} 

                                {UserType === 7 && this.state.CustomerAnswers.length !== 0 ? null:null}   
                            </View>:null}
                        </View>
                    </View>:
                    <View style={{height:'100%',width:'100%',align:'center',justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="white" />
                    </View>   
                    }
                    {this.state.UserDetails.length > 0 ||this.state.OwnerDetails.length > 0 || this.state.CustomerDetails.length > 0  ? 
                    <View style={{width:'100%',height:75,borderWidth:1,borderColor:'#25395D',flexDirection:'row'}}>
                        <View style={{width:'33%',alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>Profit</NormalText>
                                <NormalText style={{fontSize:15,color:`${this.state.Profit > 0 ? "green":this.state.Profit < 0 ? "red":"white"}`,marginBottom:5}}>₹ {this.state.Profit}</NormalText>
                            </View>
                        </View>
                        <View style={{width:'33%',alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>ROI</NormalText>
                                <NormalText style={{fontSize:15,color:`${this.state.ROI > 0 ? "green":this.state.ROI < 0 ? "red":"white"}`,marginBottom:5}}>{this.state.ROI} %</NormalText>
                            </View>
                        </View>
                        <View style={{width:'33%',alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#25395D',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                <NormalText style={{fontSize:15,color:'#859BC3',marginBottom:5}}>Calls</NormalText>
                                <NormalText style={{fontSize:15,color:'white',marginBottom:5}}>{this.state.Calls}</NormalText>
                            </View>
                        </View>
                    </View>:null}
               </View>
                
                {/* Tabs Start Here */}

                {UserType !== 7 && UserType !== 0  ?
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
                </View>:
                <View style={styles.TabContainer}>
                    <View style={this.state.SelectedTab === "" ? styles.TabsSelectedCustomer:styles.TabsCustomer}>
                        <TouchableOpacity onPress={()=>this.SelectTab("")}>
                            <NormalText style={this.state.SelectedTab === "" ? styles.TabsTextSelected:styles.TabsText}>Details</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedTab === "1" ? styles.TabsSelectedCustomer:styles.TabsCustomer}>
                        <TouchableOpacity onPress={()=>this.SelectTab("1")}>
                            <NormalText style={this.state.SelectedTab === "1" ? styles.TabsTextSelected:styles.TabsText}>Calls</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedTab === "2" ? styles.TabsSelectedCustomer:styles.TabsCustomer}>
                        <TouchableOpacity onPress={()=>this.SelectTab("2")}>
                            <NormalText style={this.state.SelectedTab === "2" ? styles.TabsTextSelected:styles.TabsText}>Packages</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedTab === "3" ? styles.TabsSelectedCustomer:styles.TabsCustomer}>
                        <TouchableOpacity onPress={()=>this.SelectTab("3")}>
                            <NormalText style={this.state.SelectedTab === "3" ? styles.TabsTextSelected:styles.TabsText}>Reports</NormalText>
                        </TouchableOpacity>
                    </View>
                </View>
                }

                {/* Tabs End Here */}

                <View style={styles.ContentsContainer}>
                    {this.state.SelectedTab === "1" ? 
                    <View style={{width:'100%',flex:1,alignItems: "flex-end",justifyContent:'flex-end'}}>
                            <View style={{width:'100%',minHeight:100,position:'absolute',elevation:6,alignItems:'flex-end',justifyContent:'center',zIndex:1}}>
                                <TouchableOpacity onPress={()=>this.setState({ShowFilterModal:true})}>
                                    <View style={{width:60,height:60,borderRadius:100,backgroundColor:'#F0B22A',alignItems:'center',justifyContent:'center'}}>
                                        <FontAwesome name="filter" size={28} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.CallsCard}>
                                <ViewCalls 
                                AuthHeader={this.props.loginState.AuthHeader} 
                                STab={""}
                                UserId={this.props.navigation.state.params.UserId }
                                OwnerId={this.props.navigation.state.params.OwnerId}
                                ShowActive={true}
                                PackageId=""
                                PackageOwnerId=""
                                CallId=""
                                Exchange=""
                                Symbol=""
                                AssignedToMe={UserType === 0 ? true: false}
                                CallDetails={this.MoveToCallDetails}
                                From={1}/>
                            </View>

                            <Modal visible={this.state.ShowFilterModal} animationType="slide" transparent={true}>
                            <CallsFilter 
                                UserOwners={[]}
                                closeFilter={this.closeFilterModal}/>
                            </Modal>
                        </View>:

                        this.state.SelectedTab === "" ? 
                        this.state.UserDetails.length > 0 || this.state.OwnerDetails.length > 0 || this.state.CustomerDetails.length > 0 ?
                        <ScrollView style={{width:'100%'}}>
                             {UserType === 7 ? 
                                this.state.CustomerAnswers.length === 0 ?
                                <Card style={{flex:1,width:'100%'}}>

                                </Card>
                                :null
                            : 
                            <>
                                {UserType !== 0 ?
                                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading={"Profile & Contact Info"}>
                                        <View style={styles.CollapsibleCardContent}>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Name</NormalText>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{this.state.Name}</NormalText>
                                            </View>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Mobile No.</NormalText>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>+91{this.state.Contact}</NormalText>
                                            </View>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Email Id</NormalText>
                                                <NormalText style={{fontSize:14,color:`${this.state.EmailId === "" || this.state.EmailId === null ? "grey":"black"}`,marginBottom:0}}>{this.state.EmailId === "" || this.state.EmailId === null ? "Not Available":this.state.EmailId }</NormalText>
                                            </View>
                                        </View>
                                    </CollapsibleCard>:null}

                                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading={"Buisness Registration"}>
                                        <View style={styles.CollapsibleCardContent}>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>SEBI Registration No.</NormalText>
                                                <NormalText style={{fontSize:14,marginBottom:0,color:`${UserType === 0 ? "grey":this.state.UserDetails[0].SEBIRegistrationNo === "" || this.state.UserDetails[0].SEBIRegistrationNo === null ? "grey":"black"}`}}>{UserType === 0 ? "NA" :this.state.UserDetails[0].SEBIRegistrationNo === "" || this.state.UserDetails[0].SEBIRegistrationNo === null ? "Not Available":this.state.UserDetails[0].SEBIRegistrationNo}</NormalText>
                                            </View>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>PAN No.</NormalText>
                                                <NormalText style={{fontSize:14,marginBottom:0,color:`${UserType === 0 ? "grey" :this.state.UserDetails[0].PanNo === "" || this.state.UserDetails[0].PanNo === null ? "grey":"black"}`}}>{UserType === 0 ? "NA":this.state.UserDetails[0].PanNo === "" || this.state.UserDetails[0].PanNo === null ? "Not Available":this.state.UserDetails[0].PanNo}</NormalText>
                                            </View>
                                        </View>
                                    </CollapsibleCard>

                                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading={"Mwisr Information"}>
                                        <View style={styles.CollapsibleCardContent}>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Profit</NormalText>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{UserType === 0 ? this.state.OwnerDetails[0].Profit:this.state.UserDetails[0].ProfitPerInvestment} ₹</NormalText>
                                            </View>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total ROI</NormalText>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{UserType === 0 ? this.state.OwnerDetails[0].Roi:this.state.UserDetails[0].ROI} %</NormalText>
                                            </View>
                                            <View style={styles.ContentRow}>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>Total Accuracy</NormalText>
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{UserType === 0 ? this.state.OwnerDetails[0].Accuracy:this.state.UserDetails[0].Accuracy}%</NormalText>
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
                                                <NormalText style={{fontSize:14,color:'black',marginBottom:0}}>{UserType === 0 ? this.state.OwnerDetails[0].TotalCalls:this.state.UserDetails[0].Calls}</NormalText>
                                            </View>
                                        </View>
                                    </CollapsibleCard>
                            </>}
                        </ScrollView>:
                        <View style={{height:'100%',width:'100%',align:'center',justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="#F0B22A" />
                        </View>
                        :
                        this.state.SelectedTab === "2" ?
                            <View style={{width:'100%',flex:1,justifyContent:'center'}}>
                                <Packages SelectPackage={this.MoveToPackageDetails} Type={2} SelectedTab={"2"} UserProfile={true} UserId={this.props.navigation.state.params.UserId} OwnerId={this.props.navigation.state.params.OwnerId} assignedToMe={false} createdByMe={true} />
                            </View>         
                        :
                        this.state.SelectedTab === "3" ? 
                        <ViewReports UserId={UserId}/>
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
    TabsOwners:{
        width:'25%',
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
    TabsSelectedOwners:{
        width:'25%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#F0B22A',
        borderBottomWidth:3
    },
    TabsCustomer:{
        width:'25%',
        alignItems:'center',
        justifyContent:'center'
    },
    TabsSelectedCustomer:{
        width:'25%',
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