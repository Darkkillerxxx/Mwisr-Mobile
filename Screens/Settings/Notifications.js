import React from 'react'
import { View,StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import NormalText from '../../Components/NormalText'
import moment from "moment";
import {get_received_messages,getIconForNT,getColorForNT} from '../../Utils/api'
import { connect }from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';


class Notifications extends React.Component{
    constructor()
    {
        super()
        this.state={
            NTYpeSub:[
                {
                    Id:1,
                    Name:"Tip Status Notifications",
                    icon:"fas fa-question",
                    alias:"GS"
                },
                {
                    Id:1,
                    Name:"Reports Notifications",
                    icon:"fas fa-print",
                    alias:"RP"
                },
                {
                    Id:3,
                    Name:"User Addition Notifications",
                    icon:"fas fa-user",
                    alias:"UD"
                },
                {
                    Id:3,
                    Name:"User Accept Notifications",
                    icon:"fas fa-check",
                    alias:"UA"
                },
                {
                    Id:1,
                    Name:"Assign Package Notifications",
                    icon:"fas fa-arrows-alt-h",
                    alias:"AP"
                },
                {
                    Id:2,
                    Name:"New Call Notifications",
                    icon:"fas fa-plus",
                    alias:"CN"
                },
                {
                    Id:2,
                    Name:"Edit Call Notifications",
                    icon:"fas fa-pencil-ruler",
                    alias:"CE"
                },
                {
                    Id:2,
                    Name:"Target 1 Notifications",
                    icon:"fas fa-bullseye",
                    alias:"T1"
                },
                {
                    Id:2,
                    Name:"Target 2 Notifications",
                    icon:"fas fa-bullseye",
                    alias:"T2"
                },
                {
                    Id:2,
                    Name:"Target 3 Notifications",
                    icon:"fas fa-bullseye",
                    alias:"T3"
                },
                {
                    Id:2,
                    Name:"Stoploss 1 Notifications",
                    icon:"fas fa-stop-circle",
                    alias:"S1"
                },
                {
                    Id:2,
                    Name:"Stoploss 2 Notifications",
                    icon:"fas fa-stop-circle",
                    alias:"S2"
                },
                {
                    Id:2,
                    Name:"Stoploss 3 Notifications",
                    icon:"fas fa-stop-circle",
                    alias:"S3"
                },
                {
                    Id:2,
                    Name:"Book Profit 1 Notifications",
                    icon:"fas fa-wallet",
                    alias:"BP1"
                },
                {
                    Id:2,
                    Name:"Book Profit 2 Notifications",
                    icon:"fas fa-wallet",
                    alias:"BP2"
                },
                {
                    Id:2,
                    Name:"Book Profit 3 Notifications",
                    icon:"fas fa-wallet",
                    alias:"BP3"
                },
                {
                    Id:2,
                    Name:"Exit Value Notifications",
                    icon:"fas fa-sign-out-alt",
                    alias:"XV"
                },
                {
                    Id:2,
                    Name:"Stop Call Notifications",
                    icon:"fas fa-stop-circle",
                    alias:"SC"
                },
                {
                    Id:2,
                    Name:"Call Expired Notifications",
                    icon:"fas fa-power-off",
                    alias:"EX"
                },
                {
                    Id:2,
                    Name:"Call Activision Notifications",
                    icon:"fas fa-check-double",
                    alias:"TG"
                }
            ],
            NType:[
                {
                    Name:"All Notifications",
                    icon:"fas fa-globe",
                    alias:""
                },
                {
                    Name:"General Notifications",
                    icon:"fas fa-question",
                    alias:"GS"
                },
                {
                    Name:"Call Notifications",
                    icon:"fas fa-globe",
                    alias:"T1"
                },
                {
                    Name:"User Notifications",
                    icon:"fas fa-user",
                    alias:"UA"
                }
            ],
            ReceivedNotifications:[],
            MessageType:"",
            ReceivedFromDate:moment(new Date()).subtract(15,'days').format("YYYY/MM/DD"),
            SelectedType:"",
            ReceivedFromBackDays:15,
            SelectedTypeName:"All Notifications",
            SpinnerStatus:false
        }
    }

    InitializeNotifications=(MessageType,TypeName = "")=>{
        this.setState({SpinnerStatus:true})
        let payload={
            receivedFromUserId:"",
            receivedFromUserTypeId:"",
            receivedForPackageId:"",
            messageType:MessageType,
            receivedFromDate:this.state.ReceivedFromDate,
            receivedToDate:moment(new Date()).format("YYYY/MM/DD") 
        }
        get_received_messages(this.props.loginState.AuthHeader,payload).then(res => {
            if(res.IsSuccess)
            {
                this.setState({ReceivedNotifications:res.Data})
            }
        })
    }

    componentDidMount(){
        this.InitializeNotifications("","")
    }

    SelectTab=(Tab)=>{
        this.setState({SelectedType:Tab})
    }

    getDateAndTime=(data,isDate)=>{
        let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let dataArray=data.split('T')
        let DateArray=dataArray[0].split('-')
        if(isDate)
        {
            return `${DateArray[2]}-${months[DateArray[1]-1]}-${DateArray[0]}`
        }
        else
        {
            return dataArray[1]
        }

    }

    ShowNotifications=(itemData)=>(
         <View style={styles.Notification}>
               <View style={styles.NotificationLeft}>
                   <FontAwesome name={getIconForNT(itemData.item.MessageType)} size={30} color={getColorForNT(itemData.item.MessageType)} />
               </View>
               <View style={styles.NotificationRight}>
                    <NormalText style={{fontSize:12,marginBottom:5,color:'black'}}>{itemData.item.Msg}</NormalText>
                   <NormalText style={{fontSize:12,marginBottom:5,color:'grey'}}>{`${this.getDateAndTime(itemData.item.ReceivedOn,true)} ${this.getDateAndTime(itemData.item.ReceivedOn,false)}`}</NormalText>
               </View>
           </View> 
    )

    render() {
        return(
            <Container style={styles.Contianer}>
                <View style={styles.TabContainer}>
                    <View style={this.state.SelectedType === "" ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.SelectTab("")}>
                            <NormalText style={this.state.SelectedType === "" ? styles.TabsTextSelected:styles.TabsText}>All</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedType === "GS" ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.SelectTab("GS")}>
                            <NormalText style={this.state.SelectedType === "GS" ? styles.TabsTextSelected:styles.TabsText}>General </NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedType === "T1" ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.SelectTab("T1")}>
                            <NormalText style={this.state.SelectedType === "T1" ? styles.TabsTextSelected:styles.TabsText}>Call </NormalText>
                        </TouchableOpacity>
                    </View>
                     <View style={this.state.SelectedType === "UA" ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.SelectTab("UA")}>
                            <NormalText style={this.state.SelectedType === "UA" ? styles.TabsTextSelected:styles.TabsText}>Users</NormalText>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.NotificationsContainer}>
                    <Card style={styles.CustomCard}>
                       
                        <FlatList
                            keyExtractor={(item,index)=>index.toString()}
                            data={this.state.ReceivedNotifications}
                            renderItem={this.ShowNotifications}
                            onEndReached={(distance)=>{
                                console.log("End Reached Notifications")
                                this.setState({ReceivedFromBackDays:this.state.ReceivedFromBackDays + 15},()=>{
                                    this.setState({ReceivedFromDate:moment(new Date()).subtract(this.state.ReceivedFromBackDays,'days').format("YYYY/MM/DD")},()=>{
                                        this.InitializeNotifications(this.state.MessageType,"")
                                    })
                                })
                            }}/>
                    </Card>
                </View>
            </Container>
        )
    }
}


const styles=StyleSheet.create({
    Contianer:{
        backgroundColor:'#FAFAFA',
        justifyContent:'flex-start'
    },
    TabContainer:{
        width:'100%',
        height:35,
        backgroundColor:'white',
        flexDirection:'row',
        elevation:3  
    },
    Tabs:{
        width:'25%',
        alignItems:'center',
        justifyContent:'center'
    },
    TabsSelected:{
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
    NotificationsContainer:{
        flex:1,
        width:'100%',
        padding:5
    },
    CustomCard:{
        width:'100%',
        flex:1,
        borderRadius:5,
        justifyContent:'flex-start',
        padding:5
    },
    Notification:{
        width:'100%',
        minHeight:75,
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#EAEBF0'
    },
    NotificationRight:{
        width:'80%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    NotificationLeft:{
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    }
    // FilterContainer:{
    //     width:'100%',
    //     height:50,
    //     alignItems:'flex-end'
    // },
    // Filter:{
    //     width:125,
    //     height:35,
    //     borderRadius:5,
    //     backgroundColor:"#f5bb18",
    //     elevation:2
    // }   
})

const mapStateToProps= state =>{
    return{
        loginState:state.login.login
    }
}

const mapDispatchToProps = dispatch =>{
    return{
 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Notifications);