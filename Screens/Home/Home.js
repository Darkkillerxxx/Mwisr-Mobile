import React from 'react'
import { View,AsyncStorage, StyleSheet,TouchableOpacity} from 'react-native';
import { connect }from 'react-redux'
import {verbose,login_call, GetAuthHeader,get_calls,ArrangeCalls} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import {setMiniDetails} from '../../store/Actions/ActionCallDetails'
import Container from '../../Components/Container.js';
import NormalText from '../../Components/NormalText'
import ViewCalls from '../../Components/ViewCalls.js'
import Dashboard from '../../Components/Dashboard.js'


class Home extends React.Component{
    constructor()
    {
        super();
        this.state={
            SelectedTab:""
        }
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

    NavigateToAddCall=()=>{
        this.props.navigation.navigate('AddCall')
    }

    render()
    {
        return(
            <Container style={styles.HomeContainer}>
                <Dashboard UserType={this.props.loginState.UserTypeId} MoveToAddCall={this.NavigateToAddCall} AuthHeader={this.props.loginState.AuthHeader}/>
                
                {this.props.loginState.UserTypeId !== 7 ? 
                    <View style={styles.TabContainer}>
                        <View style={this.state.SelectedTab === "" ? styles.TabsSelected:styles.Tabs}>
                            <TouchableOpacity onPress={()=>this.SelectTab("")}>
                                <NormalText style={this.state.SelectedTab === "" ? styles.TabsTextSelected:styles.TabsText}>Active Calls</NormalText>
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
                  <View style={{flex:1,width:'100%',backgroundColor:'#EBECF1',padding:5}}>
                    <View style={styles.CallsContainer}>
                        <ViewCalls 
                            AuthHeader={this.props.loginState.AuthHeader} 
                            STab={this.state.SelectedTab}
                            UserId=""
                            OwnerId=""
                            ShowActive={true}
                            PackageId=""
                            PackageOwnerId=""
                            CallId=""
                            Exchange=""
                            Symbol=""
                            AssignedToMe={false}
                            CallDetails={this.MoveToCallDetails}/>
                    </View>     
                  </View>  
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    HomeContainer:{
        flex:1,
        alignItems:'center',
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
    CallsContainer:{
        flex:1,
        width:'100%',
        backgroundColor:'white',
        elevation:3
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);