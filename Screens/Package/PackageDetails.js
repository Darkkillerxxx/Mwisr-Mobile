import React from 'react'
import {View, StyleSheet,ActivityIndicator, TouchableOpacity} from 'react-native'
import Container from '../../Components/Container'
import {NavigationEvents} from 'react-navigation'
import {get_pacakge_details} from '../../Utils/api'
import { connect }from 'react-redux'
import NormalText from '../../Components/NormalText'
import * as Progress from 'react-native-progress'; 
import { FontAwesome } from '@expo/vector-icons';

class PackageDetails extends React.Component{
    constructor(){
        super()
        this.state={
            Details:[],
            HeadingDetails:0,
            isLoading:true
        }
    }

    onInitialize=()=>{
        this.setState({isLoading:true})
        let payload={
            forOwnerId:this.props.navigation.state.params.OwnerId,
            packageId:this.props.navigation.state.params.PackageId
        }
        get_pacakge_details(this.props.loginState.AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Details:result.Data},()=>{
                    this.setState({isLoading:false})
                })
            }
        })
    }

    //////
    render(){
        
        return(
            <Container style={styles.PackageDetailsContainer}>
                <NavigationEvents onDidFocus={() => this.onInitialize()}/>
                    {console.log("HeadingDetails",this.state.HeadingDetails)}
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