import React from 'react'
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity,Button,ActivityIndicator,Keyboard,AsyncStorage } from 'react-native';
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import { connect }from 'react-redux'
import {login_call, GetAuthHeader,CheckWhereToGo} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import * as Animatable from 'react-native-animatable';
import CustomButton from '../../Components/Button'
import {CommonStyle} from '../../CommonStyle/CommonStyle'
import { NavigationActions } from 'react-navigation';

const ZoomIn = {
    from: {
      width:'90%'
    },
    to: {
        width:'15%'
    },
  };

class Login extends React.Component{
  constructor()
  {
      super();
      this.state={
          Email:"",
          Password:"",
          Phone:"",
          ErrCode:0,
          isLoading:false,
          ShowIndicator:false,
          ShowAnimation:false
      }
  }


  SwitchToRegister=()=>{
    this.props.navigation.navigate('Register')
  }

  Validation=()=>{
    if(this.state.Email === "")
    {
        this.setState({ErrCode:1})
        this.setState({isLoading:false})
        return false;
    }
    else if(this.state.Password === "")
    {
        this.setState({ErrCode:2})
        this.setState({isLoading:false})
        return false;
    }
    else
    {
        return true;
    }
  }

  Login=()=>{
    Keyboard.dismiss()
    this.setState({isLoading:true})
    if(this.Validation())
    {
        let payload={
            EMailId:this.state.Email,
            Password:this.state.Password,
            Phone:""
        }
        login_call(payload).then(result=>{
            if(result.IsSuccess && result.Data.UserId !== 0)
            {
                let authHeader;
                let login_payload2={
                  "EMailId":this.state.Email,
                  "Password":this.state.Password,
                  "Phone":result.Data["MobileNo"]
                }

                login_call(login_payload2).then(result => {
                    if(result.IsSuccess)
                    {
                        authHeader=GetAuthHeader(
                            this.state.Email,
                            this.state.Password,
                            result.Data.MobileNo,
                            result.Data.AccessToken
                        )

                        let ReduxLoginPayload=result.Data
                        ReduxLoginPayload.AuthHeader=authHeader
                        ReduxLoginPayload.Password=this.state.Password
                        this.props.onSetLogin(ReduxLoginPayload)
                        console.log("81",this.props.loginState)
                        this.setState({isLoading:false})
                        AsyncStorage.setItem('User',JSON.stringify(ReduxLoginPayload)).then(()=>{
                            console.log("Storage Created")
                        }).catch(err=>{
                            console.log("Async Login Error",err)
                        })
                        this.props.navigation.navigate('ProDB',{},NavigationActions.navigate({routeName:result.Data.WhereToGo}))
                        // this.props.navigation.navigate(CheckWhereToGo(result.Data.WhereToGo))
                    }
                })
            }
            else
            {
                this.setState({isLoading:false})
                this.SwitchToRegister();
            }
        })
    }
}


    componentDidMount(){
       AsyncStorage.getItem('User').then( User =>{
           console.log("User Payload",User)
           if(User !== null)
           {
                let LoginReduxSate=JSON.parse(User)
                this.props.onSetLogin(LoginReduxSate)
                this.props.navigation.navigate('ProDB',{},NavigationActions.navigate({routeName:'Home'}))
           }
       })
    }


    render()
    {
        return(
          <Container>
                <Card>
                    <Image style={style.Logo} source={require('../../assets/Images/logo.png')}/>
                    <BoldText style={style.LoginText}>Login</BoldText>
                    <NormalText style={style.LoginTextDesc}>Welcome Back,You Missed on Good Tips This Is What Happens!</NormalText>

                    {this.state.ErrCode === 1 ? <NormalText style={style.ErrorText}>Email Cannot Be Left Empty</NormalText>:null}
                    <TextInput placeholder="Enter Email or Mobile.No" onChangeText={(e)=>this.setState({Email:e})} style={CommonStyle.TextInputs}/>
                    {this.state.ErrCode === 2 ? <NormalText style={style.ErrorText}>Password Cannot Be Left Empty</NormalText>:null}
                    <TextInput placeholder="Enter Password" onChangeText={(e)=>this.setState({Password:e})} secureTextEntry={true} style={CommonStyle.TextInputs}/>

                    <TouchableOpacity style={style.ButtonContainer} onPress={()=>this.Login()} >
                        <CustomButton>
                            {!this.state.isLoading ? 
                            <NormalText style={{color:'white',marginBottom:0}}>LOGIN</NormalText>:
                            <ActivityIndicator size="small" color="#fff" />}
                        </CustomButton>
                    </TouchableOpacity>
                    

                    <NormalText style={style.FPText}>Dont Have an Account? </NormalText>
                    <TouchableOpacity onPress={()=>this.SwitchToRegister()}>
                        <Text style={style.SignUpText}>Sign up</Text>
                    </TouchableOpacity>
                </Card>
      </Container>
        )
    }
}

const style=StyleSheet.create({
  ButtonContainer:{
    width:"100%",
    alignItems:'center'
  },
  Logo:{
      height:40,
      width:40,
      marginTop:20,
      marginBottom:10
  },
  LoginText:{
      marginVertical:10,
      fontFamily:'open-sans-bold',
      fontSize:18
  },
  LoginTextDesc:{
      width:'70%',
      marginBottom:10,
      fontFamily:'open-sans',
      fontSize:12,
      textAlign:'center'
  },
  FPText:{
      opacity:0.5,
      marginTop:15,
      fontFamily:'open-sans',
      fontSize:12
  },
  SignUpText:{
      fontFamily:'open-sans-bold',
      fontSize:12,
      color:'#f5bb18',
      marginBottom:10
  },
  ErrorText:{
      color:'red',
      marginBottom:0
  }
})

const mapStateToProps= state =>{
    return{
        loginState:state.login.login,
        ErrMsg:state.login.ErrorMsg
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetLogin:(response)=>dispatch(setLogin(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);