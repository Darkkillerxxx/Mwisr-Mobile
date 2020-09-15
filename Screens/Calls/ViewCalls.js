import React from  'react'
import { View, StyleSheet,TouchableOpacity,Modal,ToastAndroid } from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import { connect }from 'react-redux'
import Card from '../../Components/Card'
import ViewCalls from '../../Components/ViewCalls'
import { FontAwesome } from '@expo/vector-icons';
import CallsFilter from '../../Components/CallsFilter'
import { get_user_owners } from '../../Utils/api'
import {setMiniDetails} from '../../store/Actions/ActionCallDetails'

class ViewCall extends React.Component{

    constructor()
    {
        super();
        this.state={
            SelectedTab:"",
            AssignedToMe:false,
            Symbol:"",
            Exchange:"",
            ShowActive:"",
            ShowFilterModal:false,
            UserOwners:[],
            SearchText:"",
            Exchange:"",
            CallStatus:"",
            SelectedOwnerId:""
        }
    }

    componentDidMount()
    {   
        get_user_owners(this.props.loginState.AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({UserOwners:result.Data})
            }
        })
    }

    SelectTab=(Tab)=>{
        this.setState({SelectedTab:Tab})
    }

    MoveToCallDetails=(MiniCallDetails)=>{
        let TempMiniCD=[]
        TempMiniCD.push(MiniCallDetails)
        this.props.onSetMiniCD(MiniCallDetails)
        
        this.props.navigation.navigate('CallDetails',{
            MiniDetails:MiniCallDetails
        })
    }

    closeFilterModal=(Search,Exchange,CallStatus,OwnerId)=>{
        this.setState({SelectedOwnerId:OwnerId})
        this.setState({CallStatus:CallStatus === 0 ? "":CallStatus === 1 ? true:false})
        this.setState({Exchange:Exchange.toString()})
        this.setState({SearchText:Search},()=>{
            this.setState({ShowFilterModal:false})
        })
        
    }

    render()
    {
        return(
            <Container style={styles.ViewCallsContainer}>
                {this.props.loginState.UserTypeId !== 7 ? 
                    <View style={styles.TabContainer}>
                        <View style={this.state.SelectedTab === "" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("")}>
                                <NormalText style={this.state.SelectedTab === "" ? styles.TabsTextSelected:styles.TabsText}>All Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={this.state.SelectedTab === "2" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("2")}>
                                <NormalText style={this.state.SelectedTab === "2" ? styles.TabsTextSelected:styles.TabsText}>Sub-Broker Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={this.state.SelectedTab === "6" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("6")}>
                                <NormalText style={this.state.SelectedTab === "6" ? styles.TabsTextSelected:styles.TabsText}>Analyst Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={this.state.SelectedTab === "5" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("5")}>
                                <NormalText style={this.state.SelectedTab === "5" ? styles.TabsTextSelected:styles.TabsText}>Partner Calls</NormalText>
                            </TouchableOpacity>
                        </View>
                    </View>:null}

                <View style={{width:'100%',flex:1,padding:5,justifyContent:'flex-end',alignItems:'center'}} >
   
                    <View style={{width:'100%',minHeight:100,position:'absolute',elevation:6,alignItems:'flex-end',justifyContent:'center',zIndex:1}}>
                        <TouchableOpacity onPress={()=>this.setState({ShowFilterModal:true})}>
                            <View style={{width:60,height:60,borderRadius:100,backgroundColor:'#F0B22A',alignItems:'center',justifyContent:'center'}}>
                                <FontAwesome name="filter" size={28} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <Card style={{width:'100%',height:'100%',zIndex:0}}>
                        <ViewCalls 
                            AuthHeader={this.props.loginState.AuthHeader} 
                            STab={this.state.SelectedTab}
                            UserId=""
                            OwnerId={this.state.SelectedOwnerId}
                            ShowActive={this.state.CallStatus}
                            PackageId=""
                            PackageOwnerId=""
                            CallId=""
                            Exchange={this.state.Exchange}
                            Symbol={this.state.SearchText}
                            AssignedToMe={false}
                            CallDetails={this.MoveToCallDetails}/>
                    </Card>

                </View>

                <Modal visible={this.state.ShowFilterModal} animationType="slide" transparent={true}>
                    <CallsFilter 
                        UserOwners={this.state.UserOwners}
                        closeFilter={this.closeFilterModal}/>
                </Modal>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    ViewCallsContainer:{
        backgroundColor:'#EAEBF0',
        alignItems:'flex-start',
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

export default connect(mapStateToProps,mapDispatchToProps)(ViewCall);