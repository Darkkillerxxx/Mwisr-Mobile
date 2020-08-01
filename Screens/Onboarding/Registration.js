import React,{component} from 'react';
import { StyleSheet,TextInput,Button,View,ScrollView,TouchableOpacity,ActivityIndicator } from 'react-native';
import {RegisterRegitrationDetails} from '../../Utils/api'
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import InputContainer from '../../Components/InputContainer'
import RBContainer from '../../Components/RBContainer'
import CustomButton from '../../Components/Button'
import {CommonStyle} from '../../CommonStyle/CommonStyle'

class Registration extends React.Component{
    constructor()
    {
        super();
        this.state={
            NSEMemberId:"",
            BSEMemberId:"",
            MCXMemeberId:"",
            NCDEXMemberId:"",
            CSDLNo:"",
            NSDLNo:"",
            MSEINo:"",
            SEBINo:"",
            ResearchAnalystNo:"",
            ARNNo:"",
            IRDANo:"",
            AssetManegmentNo:"",
            PMSNo:"",
            CINNo:"",
            InvestmentAdvisoryNo:"",
            isLoading:false,
            ErrorCode:0
        }
    }

    Validation()
    {
        if(this.state.SEBINo === "")
        {
            this.setState({ErrorCode:1})
            return false
        }
        else if(  this.state.CINNo === "")
        {
            this.setState({ErrorCode:2})
            return false
        }
        else
        {
            this.setState({ErrorCode:0})
            return true;
        }   
    }

    onRegistrationDetailsSubmit=()=>{
        if(this.Validation())
        {
            this.setState({isLoading:true})
            let RegistrationPayload={
                MobileNo :this.props.Contact.includes('+91') ? this.props.Contact.substring(3):this.props.Contact,
                NSEMemberId : this.state.NSEMemberId,
                BSEMemberId : this.state.BSEMemberId,
                MCXMemberId : this.state.MCXMemberId,
                NCDEXMemberId : this.state.NCDEXMemberId,
                CDSLNo : this.state.CSDLNo,
                NSDLNo : this.state.NSDLNo,
                MSEINo  :this.state.MSEINo,
                SEBIRegistrationNo : this.state.SEBINo,
                ResearchAnalystNo :  this.state.ResearchAnalystNo,
                InvestmentAdvisorNo : this.state.InvestmentAdvisoryNo,
                ARNNo  : this.state.ARNNo,
                IRDACorporateAgentNo : this.state.IRDANo,
                AssetManagementCompanyNo:this.state.AssetManegmentNo,
                PMSNo : this.state.PMSNo,
                CINNo  : this.state.CINNo
                }
            
                RegisterRegitrationDetails(RegistrationPayload,this.props.authHeader).then(result=>{
                    console.log("78",result)
                    if(result.IsSuccess)
                    {
                        this.props.LoginCall()
                        this.setState({isLoading:false})
                    }
                })
        }
    }

    render()
    {
        return(
      
            <Container style={styles.RegistrationContainer}>
                <Card>
                    <BoldText>Registration Details</BoldText>
                    <NormalText>Fields Marked with (*) are Mandatory</NormalText>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>NSE Member Id</NormalText>
                        <TextInput placeholder="Enter NSE Member ID" onChangeText={(e)=>this.setState({NSEMemberId:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>BSE Member Id</NormalText>
                        <TextInput placeholder="Enter BSE Member ID" onChangeText={(e)=>this.setState({BSEMemberId:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>
                    
                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>NCDEX Member Id</NormalText>
                        <TextInput placeholder="Enter NCDEX Member ID" onChangeText={(e)=>this.setState({NCDEXMemberId:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>MCX Member Id</NormalText>
                        <TextInput placeholder="Enter NCDEX Member ID" onChangeText={(e)=>this.setState({MCXMemberId:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>
                    
                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>CSDL No.</NormalText>
                        <TextInput placeholder="Enter CSDL No." onChangeText={(e)=>this.setState({CSDLNo:e})}  style={CommonStyle.TextInputs}></TextInput>
                    </View>
                    
                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>NSDL NO.</NormalText>
                        <TextInput placeholder="Enter NSDL No." onChangeText={(e)=>this.setState({NSDLNo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>MSEI No.</NormalText>
                       
                        <TextInput placeholder="Enter MSEI No." onChangeText={(e)=>this.setState({MSEINo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>(*)SEBI Registration No.</NormalText>
                        {this.state.ErrorCode === 1 ? <NormalText style={styles.ErrorText}>SEBI No.Cannot Be Left Blank</NormalText>:null}
                        <TextInput placeholder="Enter SEBI No." onChangeText={(e)=>this.setState({SEBINo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>Research Analyst No.</NormalText>
                        <TextInput placeholder="Enter Research Analyst No." onChangeText={(e)=>this.setState({ResearchAnalystNo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>ARN No.</NormalText>
                        <TextInput placeholder="Enter ARN No." onChangeText={(e)=>this.setState({ARNNo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>Investment Advisory No.</NormalText>
                        <TextInput placeholder="Enter Investment Advisory No." onChangeText={(e)=>this.setState({InvestmentAdvisoryNo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>IRDAC Corporate Agency No.</NormalText>
                        <TextInput placeholder="Enter IRDAC Corporate Agency No." onChangeText={(e)=>this.setState({IRDANo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>PMS No.</NormalText>
                        <TextInput placeholder="Enter PMS No." onChangeText={(e)=>this.setState({PMSNo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>(*) CIN No.</NormalText>
                        {this.state.ErrorCode === 2 ? <NormalText style={styles.ErrorText}>CIN No. Cannot Be Left Blank</NormalText>:null}
                        <TextInput placeholder="Enter PMS No." onChangeText={(e)=>this.setState({CINNo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>Asset Management Company Number</NormalText>
                        <TextInput placeholder="Enter Asset Management Company Number" onChangeText={(e)=>this.setState({AssetManegmentNo:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <TouchableOpacity style={{width:'100%',alignItems:'center',marginBottom:10}} onPress={()=>this.onRegistrationDetailsSubmit()}>
                        <CustomButton>
                            {!this.state.isLoading ? 
                            <NormalText style={{color:'white',marginBottom:0}}>SUBMIT DETAILS</NormalText>:
                            <ActivityIndicator size="small" color="#fff" />}
                        </CustomButton>
                </TouchableOpacity>
                </Card>

                

            </Container>
      
        )
    }
}


const styles=StyleSheet.create({
    RegistrationContainer:{
        flex:1,
        backgroundColor:"#ebecf1",
        justifyContent:'center',
        alignItems:'center',
        paddingTop:40
    },
    TextInputContainer:{
        marginVertical:0,
        width:'100%',
        paddingLeft:'12%',
        alignItems:'flex-start'
    },
    TextInput:{
        borderRadius:20,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:2
    },
    OverideNormalText:{
        marginBottom:5,
        marginTop:10,
        opacity:0.6
    },
    ButtonContainer:{
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

export default Registration;
