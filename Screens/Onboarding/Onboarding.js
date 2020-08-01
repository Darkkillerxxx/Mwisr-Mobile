import React,{component} from 'react'
import {View,StyleSheet,AsyncStorage} from 'react-native'
import StepIndicator from 'react-native-step-indicator';
import ContactDetails from './ContactDetails'
import { ScrollView, Switch } from 'react-native-gesture-handler'
import {login_call, GetAuthHeader,CheckWhereToGo} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import { connect }from 'react-redux'
import IdentifyUser from './IdentifyUser'
import Registration from './Registration'
import CompanyDetails from './CompanyDetails'
import QuestionSet1 from './QuestionSet1'
import QuestionSet2 from './QuestionSet2'
import QuestionSet3 from './QuestionSet3'
import Credit from './Credit'


const Indie = ["Identify Yourself","Contact Details","Registration Details","Company Details","Choose Credit"];
const label2 = ["Contact Details","Registration Details","Company Details"];
const Partner = ["Identify Yourself","Contact Details","Registration Details","Company Details"];
const Questions=["Question Set 1",'Question Set 2',"Question Set 3"]

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }
  
class OnBoarding extends React.Component{
    constructor()
    {
        super();
        this.state={
            OnboardingState:"",
            Labels:[],
            UserType:null,
            SuperOwnerId:null,
            UserId:null,
            StepPosition:0
        }
    }

    componentDidMount()
    {
        console.log("REDUX",this.props.loginState)
        this.setState({OnboardingState:this.props.loginState.WhereToGo},()=>{
            console.log(this.state.OnboardingState)
            this.setState({UserType:this.props.loginState.UserTypeId},()=>{
                this.setState({Labels:this.getLabelsAndStepCount(this.state.UserType)})
                console.log("UserType",this.state.UserType)
                this.setState({SuperOwnerId:this.props.loginState.SuperOwnerId})
                this.setState({UserId:this.props.loginState.UserId})
            })
        })
    }

    CommonLoginCall=()=>{
        let payload={
            EMailId:this.props.loginState.EMailId,
            Password:this.props.loginState.Password,
            Phone:this.props.loginState.MobileNo
          }
          
            login_call(payload).then(result=>{
              if(result.IsSuccess)
              {
                let authHeader = GetAuthHeader(this.props.loginState.EMailId,this.props.loginState.Password,this.props.loginState.MobileNo,result.Data.AccessToken);
                let ReduxLoginPayload=result.Data
                ReduxLoginPayload.AuthHeader=authHeader
                ReduxLoginPayload.Password=this.props.loginState.Password
                this.props.onSetLogin(ReduxLoginPayload)
                if(result.Data.WhereToGo !== "DB")
                {
                    this.setState({OnboardingState:result.Data.WhereToGo})
                }
                else if(result.Data.WhereToGo === "DB")
                {
                    this.props.navigation.navigate(CheckWhereToGo(result.Data.WhereToGo))
                    // AsyncStorage.setItem('User',this.props.ReduxLoginPayload).then(()=>{
                    //     console.log("Hello Asyc")
                    //     AsyncStorage.getItem('User').then( User =>{
                    //         console.log("User Payload Onboarding",User)
                    //     })
                       
                    // }).catch(err=>{
                    //     console.log("Async Error :",err)
                    // }) 
                }
                
              }
            })
    }

    

    getStepPosition=(OBState)=>{
        console.log("106",OBState)
        switch(OBState)
        {
            case "IU":
                return this.state.Labels.indexOf("Identify Yourself")
                break;
            case "CO":
                return this.state.Labels.indexOf("Company Details")
                break;
            case "CD":
                return this.state.Labels.indexOf("Contact Details")
                break;
            case "RD":
                return this.state.Labels.indexOf("Registration Details")
                break;
            case "CC":
                return this.state.Labels.indexOf("Choose Credit")
                break;
            default:
                break;
        }
    }

    getLabelsAndStepCount=()=>{
        switch(this.state.UserType)
        {
            case 0:
                return Indie
                break;
            case 5 :
                return Partner
                break;
            case 7 :
                return Questions
                break
            case 8:
                return Indie
                break;
            default:
                return label2
                break
        }
    }


    render()
    {
        return(
            <ScrollView style={styles.SV}>
                <View style={styles.Container}>
                    {this.state.Labels.length > 0 ? 
                         <StepIndicator
                         customStyles={customStyles}
                         currentPosition={this.getStepPosition(this.state.OnboardingState)}
                         labels={this.state.Labels}
                         stepCount={this.state.Labels.length}
                     />:null
                    }
                   
                    {console.log("In Render",this.state.OnboardingState)}
                    {this.state.OnboardingState === "IU" ? <IdentifyUser UserTypeId={this.props.loginState.UserTypeId} authHeader={this.props.loginState.AuthHeader} UserId={this.props.loginState.UserId} LoginCall={this.CommonLoginCall}/>:
                    this.state.OnboardingState === "CD" ?  <ContactDetails authHeader={this.props.loginState.AuthHeader} Contact={this.props.loginState.MobileNo} Name={this.props.loginState.UserName} UserType={this.props.loginState.UserTypeId} LoginCall={this.CommonLoginCall} />:
                    this.state.OnboardingState === "RD" ? <Registration authHeader={this.props.loginState.AuthHeader} Contact={this.props.loginState.MobileNo} LoginCall={this.CommonLoginCall}/>:
                    this.state.OnboardingState === "CO" ? <CompanyDetails  authHeader={this.props.loginState.AuthHeader} Contact={this.props.loginState.MobileNo} LoginCall={this.CommonLoginCall}/> :
                    this.state.OnboardingState === "CC" ? <Credit authHeader={this.props.loginState.AuthHeader} LoginCall={this.CommonLoginCall} UserId={this.props.loginState.UserId}/>:
                    this.state.OnboardingState === "Q1" ? <QuestionSet1 authHeader={this.props.loginState.AuthHeader} LoginCall={this.CommonLoginCall} userId={this.props.loginState.UserId} />:
                    this.state.OnboardingState === "Q2" ? <QuestionSet2 authHeader={this.props.loginState.AuthHeader} LoginCall={this.CommonLoginCall} userId={this.props.loginState.UserId}/>:
                    this.state.OnboardingState === "Q3" ? <QuestionSet3 authHeader={this.props.loginState.AuthHeader} LoginCall={this.CommonLoginCall} userId={this.props.loginState.UserId}/>:null}
                   
                </View>
            </ScrollView>
            
            
        )
    }
}

const styles=StyleSheet.create({
    Container:{
           flex:1,
           paddingTop:35,
           backgroundColor:"#ebecf1",
           justifyContent:'flex-start',
           paddingBottom:50
        },
    SV:{
        flex:1,
        paddingTop:35,
        backgroundColor:"#ebecf1"
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

export default connect(mapStateToProps,mapDispatchToProps)(OnBoarding);