import React from 'react';
import { View,StyleSheet,TouchableOpacity,Picker,TextInput,ScrollView,Switch } from 'react-native';
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import NormalText from '../../Components/NormalText'
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../../Components/Button'
import {get_owners,get_sub_list_message,get_package_addCall,verbose} from '../../Utils/api'
import { connect }from 'react-redux'

class SendMessage extends React.Component{
    constructor()
    {
        super()
        this.state={
            Owners:[],
            Users:[],
            SendType:0,
            SelectedOwner:null,
            Message:"",
            Packages:[],
            SelectedPackageId:null,
            SendToTelegram:false
        }
    }


    componentDidMount()
    {
        get_owners(this.props.loginState.AuthHeader).then(result =>{
            if(result.IsSuccess)
            {
                this.setState({Owners:result.Data},()=>{
                    this.setState({SelectedOwner:result.Data[0].OwnerId},()=>{
                        this.getUsers(null,2,true)
                        get_package_addCall(this.props.loginState.AuthHeader).then(result=>{
                            if(result.IsSuccess)
                            {
                                this.setState({Packages:result.Data},()=>{
                                    console.log("39",this.state.Packages)
                                    this.setState({SelectedPacakges:result.Data[0].PackageId});
                                })     
                            }
                            else
                            {
    
                            }
                        })
                    })
                })
               
            }
            else
            {
                verbose(false,"Error Loading Owners",result.DisplayMsg)
            }
        }) 
    }

    getUsers=(OwnerId,UserType,IsBase)=>{
        const payload = {
            ForUserId:null,
            ForUserTypeId: UserType,
            ForOwnerId:OwnerId,
            PackageNameSize:10,
            IsBaseLevel:IsBase
          };

        get_sub_list_message(this.props.loginState.AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Users:result.Data})
            }
            else
            {
                verbose(false,"Error Loading Users",result.DisplayMsg)
            }
        })
    }

    toggleTelegram=()=>{
        this.setState({SendToTelegram:!this.state.SendToTelegram})
    }

    sendMessage=()=>{
        
    }

    render()
    {
        let ShowOwners=this.state.Owners.map(result=>{
            return(
                <Picker.Item key={result.OwnerId} value={result.OwnerId} label={result.OwnerName}/>
            )
        })

        let ShowUsers=this.state.Users.map(result=>{
            return(
                <Picker.Item key={result.UserId} value={result.UserId} label={result.UserName}/>
            )
        })

        let ShowPackages=this.state.Packages.map(result=>{
            return(
                <Picker.Item key={result.PackageId} value={result.PackageId} label={result.PackageName}/>
            )
        })

        return (
            <Container style={styles.CustomContainer}>
                <ScrollView style={{padding:5}}>
                    <Card style={styles.CustomCard}>
                        <NormalText style={{fontSize:14}}>Send Message To</NormalText>
                        <View style={styles.SelectorContainer}>
                        <TouchableOpacity onPress={()=>this.setState({SendType:0})} style={{width:'30%'}} > 
                            <View style={{...styles.Selector,...{backgroundColor:`${this.state.SendType === 0 ? "#f5bb18":'white'}`}}}>
                                <FontAwesome name="user" size={24} color={`${this.state.SendType === 0 ? 'white':"#f5bb18"}`} />
                                <NormalText style={{fontSize:14,marginBottom:0,color:`${`${this.state.SendType === 0 ? 'white':"#f5bb18"}`}`}}>Users</NormalText>
                            </View>
                        </TouchableOpacity>
                        
                            <TouchableOpacity onPress={()=>this.setState({SendType:1})} style={{width:'30%'}} > 
                                <View style={{...styles.Selector,...{backgroundColor:`${this.state.SendType === 1 ? "#f5bb18":'white'}`}}}>
                                    <FontAwesome name="dropbox" size={24} color={`${this.state.SendType === 1 ? 'white':"#f5bb18"}`} />
                                    <NormalText style={{fontSize:14,marginBottom:0,color:`${`${this.state.SendType === 1 ? 'white':"#f5bb18"}`}`}}>Packages</NormalText>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:'30%'}} onPress={()=>this.setState({SendType:2})}> 
                                <View style={{...styles.Selector,...{backgroundColor:`${this.state.SendType === 2 ? "#f5bb18":'white'}`}}}>
                                    <FontAwesome name="users" size={24} color={`${this.state.SendType === 2 ? 'white':"#f5bb18"}`} />
                                    <NormalText style={{fontSize:14,marginBottom:0,color:`${`${this.state.SendType === 2 ? 'white':"#f5bb18"}`}`}}>User Group</NormalText>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select Owners</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                                {ShowOwners}
                            </Picker>
                        </View>

                        {this.state.SendType !== 1    ? 
                        <>
                            <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select User Type</NormalText>
                            <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                                <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                                    <Picker label="Sub-Broker" value={2}/>
                                    <Picker label="Analyst" value={6}/>
                                    <Picker label="Partner" value={5}/>
                                    <Picker label="Customers" value={7}/>
                                    <Picker label="Owner" value={0}/>
                                </Picker>
                            </View>
                        </>:null}

                        {this.state.SendType !== 1 && this.state.SendType !== 2 ? 
                        <>
                        <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select User</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                                {ShowUsers}
                            </Picker>
                        </View>
                        </>:null}

                        {this.state.SendType !== 0 && this.state.SendType !== 2  ? 
                        <>
                            <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select Package</NormalText>
                            <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                                <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                                    {ShowPackages}
                                </Picker>
                            </View>
                        </>:null}

                        <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Compose Message</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <TextInput onChangeText={(e)=>this.setState({Message:e})} numberOfLines={10} style={{width:'100%',height:100}}/>
                        </View>

                         <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>   
                            <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10,marginRight:15}}>Send To Telegram</NormalText>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.SendToTelegram ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleTelegram}
                                value={this.state.SendToTelegram}
                            />
                        </View>
                    </Card>

                    <TouchableOpacity>
                        <CustomButton style={{alignSelf:'center',marginBottom:15}}>
                            <NormalText style={{fontSize:14,color:'white',marginBottom:0}}>Send Message</NormalText>
                        </CustomButton>
                    </TouchableOpacity>
                </ScrollView>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustomContainer:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#FAFAFA',
        padding:10
    },
    CustomCard:{
        padding:10,
        width:'100%',
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:'center'
    },
    SelectorContainer:{
        width:'100%',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginVertical:5,
        flexDirection:'row',
    },
    Selector:{
        height:85,
        padding:10,
        borderWidth:1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#f5bb18'
    },
    SelectedSelector:{
        backgroundColor:'#f5bb18'
    },
    CustomPicker:{
        borderRadius:20,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        marginVertical:2,
        height:30
    }
})

const mapStateToProps= state =>{
    return{
        loginState:state.login.login
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetLogin:(response)=>dispatch(setLogin(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SendMessage);