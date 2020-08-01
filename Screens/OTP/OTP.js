import React from 'react'
import { StyleSheet, Text, View,Image,TextInput, Button,TouchableWithoutFeedback,findNodeHandle,ActivityIndicator,TouchableOpacity } from 'react-native';
import { connect }from 'react-redux'
import {login_call, GetAuthHeader,CheckWhereToGo,send_OTP,verify_OTP} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import {CommonStyle} from '../../CommonStyle/CommonStyle'
import CustomButton from '../../Components/Button'

class OTP extends React.Component{
    constructor()
    {
        super();
        this.state={
            OTP:"",
            ErrCode:0,
            IsLoading:false
        }
    }

    componentDidMount()
    {
        console.log("REDUX",this.props.loginState.Password)
        send_OTP(this.props.loginState.UserId,this.props.loginState.AuthHeader).then(result=>{
            console.log(result)
            if(result.IsSuccess)
            {
                console.log("OTP Sent")
            }
        })
    }

    Validation=()=>{
        if(this.state.OTP.length < 4 || this.state.OTP.length > 4 )
        {
            this.setState({ErrCode:1})
            return false;
        }
        else
        {
            return true;
        }
    }

    
    onSubmitOTP=()=>{
        if(this.Validation())
        {
            this.setState({isLoading:true})
            verify_OTP(this.state.OTP,this.props.loginState.AuthHeader).then(result=>{
                console.log(result)
                if(result.IsSuccess)
                {
                    let payload={
                        EMailId:this.props.loginState.EMailId,
                        Password:this.props.loginState.Password,
                        Phone:this.props.loginState.MobileNo
                    }

                    login_call(payload).then(result=>{
                        if(result.IsSuccess)
                        {
                            let authHeader=GetAuthHeader(
                                this.props.loginState.EMailId,
                                this.props.loginState.Password,
                                this.props.loginState.MobileNo,
                                result.Data.AccessToken
                            )

                            let ReduxLoginPayload=result.Data
                            console.log("While Submitting OTP",ReduxLoginPayload)
                            ReduxLoginPayload.AuthHeader=authHeader
                            ReduxLoginPayload.Password=this.props.loginState.Password
                            this.props.onSetLogin(ReduxLoginPayload)
                            this.setState({isLoading:false})
                            this.props.navigation.navigate(CheckWhereToGo(result.Data.WhereToGo))
                        }
                    })
                }
            })
        }
        else
        {
            this.setState({isLoading:false})
        }
    }

    render()
    {
        return(
            <Container>
                <Card>
                    <Image style={style.OTPLogo} source={require('../../assets/Images/otp.png')}/>
                    <BoldText style={style.OTPText}>Enter OTP</BoldText>
                    <NormalText style={style.OTPTextDesc}>We have Sent You a 4 digit OTP Number</NormalText>
                    {this.state.ErrCode === 1 ? <NormalText style={style.ErrorText}>Please Enter a Valid OTP</NormalText>:null}           
                    <View style={style.OtpInputContainer}>
                        <TextInput placeholder="Enter OTP" onChangeText={(e)=>this.setState({OTP:e})} maxLength={4} keyboardType="number-pad" style={CommonStyle.TextInputs}/>
                    </View>

                    
                    <TouchableOpacity style={{width:'100%',alignItems:'center',marginBottom:10}} onPress={()=>this.onSubmitOTP()}>
                        <CustomButton>
                            {!this.state.isLoading ? 
                            <NormalText style={{color:'white',marginBottom:0}}>SUBMIT OTP</NormalText>:
                            <ActivityIndicator size="small" color="#fff" />}
                        </CustomButton>
                    </TouchableOpacity>
                </Card>
            </Container>
        )
    }
}

const style=StyleSheet.create({
    OTPContainer:{
        flex:1,
        backgroundColor:"#ebecf1",
        justifyContent:'center',
        alignItems:'center'
    },
    OTPLogo:{
        height:80,
        width:'80%',
        marginTop:20,
        marginBottom:10,
    },
    OTPBox:{
        backgroundColor:'white',
        width:300,
        maxWidth:'85%',
        borderColor:'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        justifyContent:'center',
        alignItems:'center',
    },
    OTPText:{
        marginVertical:10,
        fontFamily:'open-sans-bold',
        fontSize:18,
        textAlign:'center'
    },
    OTPTextDesc:{
        width:'75%',
        marginBottom:10,
        fontFamily:'open-sans',
        fontSize:12
    },
    OtpInputContainer:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    OTPInput:{
        borderRadius:20,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'80%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:7,
        textAlign:'center'
    },
    OTPButtonContainer:{
        width:"80%",
        marginVertical:15,
        borderRadius:30,
        overflow:'hidden'
    },
    ErrorText:{
        color:'red',
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
        onSetLogin:(response)=>dispatch(setLogin(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OTP);