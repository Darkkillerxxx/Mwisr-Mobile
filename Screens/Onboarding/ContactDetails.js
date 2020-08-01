import React,{component} from 'react';
import { StyleSheet,Text,Button,View,Image,TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import {RegisterContactDetails} from '../../Utils/api'
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../../Components/Button'
import {CommonStyle} from '../../CommonStyle/CommonStyle'

class ContactDetails extends React.Component{
    constructor()
    {
        super();
        this.state={
            CompanyName:"",
            SupportEmail:"",
            Address:"",
            SupportContact1:"",
            SupportContact2:"",
            Website:"",
            MainBrokerName:"",
            MainBrokerContact:"",
            MainBrokerEmailId:"",
            MainBrokerWebsite:"",
            ErrorCode:0,
            isLoading:false
        }
    }

    Validation=()=>{
        if(this.state.CompanyName === "")
        {
            this.setState({ErrorCode:1})
            return false
        }
        else if(!this.state.SupportEmail.includes('@') || !this.state.SupportEmail.includes('.') )
        {
            this.setState({ErrorCode:2})
            return false
        }
        else if(this.state.Address === "")
        {
            this.setState({ErrorCode:3})
            return false
        }
        else if(this.state.SupportContact1.length < 10 || this.state.SupportContact1.length > 10)
        {
            this.setState({ErrorCode:4})
            return false
        }
        else{
            this.setState({ErrorCode:0})
            return true
        }
    }

    onContactDetailsSubmit=()=>{
        if(this.Validation())
        {
            this.setState({isLoading:true})
            let ContactDetailsPayload={
                "MobileNo" :this.props.Contact.includes('+91') ? this.props.Contact.substring(3):this.props.Contact,
                "Name" : this.props.Name,
                "CompanyName" : this.state.CompanyName,
                "Address" : this.state.Address,
                "SupportEMailId" : this.state.SupportEmail,
                "SupportContact1" : this.state.SupportContact1,
                "SupportContact2" : this.state.SupportContact2,
                "WebSite" : this.state.Website,
                "MainBrokerName" : this.state.MainBrokerName,
                "MainBrokerPhoneNo" : this.state.MainBrokerContact,
                "MainBrokerEmailId" : this.state.MainBrokerEmailId,
                "MainBrokerWebsite" : this.state.MainBrokerWebsite,
                "UserTypeId" : this.props.UserType
                }

                RegisterContactDetails(ContactDetailsPayload,this.props.authHeader).then(result=>{
                    console.log(result)
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
            
            <Container style={styles.ContactContainer}>
                <Card>
                    <BoldText>Contact Details</BoldText>
                    <NormalText>Fields Marked with (*) are Mandatory</NormalText>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>(*) Company</NormalText>
                        {this.state.ErrorCode === 1 ? <NormalText style={styles.ErrorText}>Company Cannot Be Left Blank</NormalText>:null}
                        <TextInput placeholder="Enter Company Name" onChangeText={(e)=>this.setState({CompanyName:e})} style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>(*) Support Email</NormalText>
                        {this.state.ErrorCode === 2 ? <NormalText style={styles.ErrorText}>Email Should Be Valid</NormalText>:null}
                        <TextInput placeholder="Enter Support Email" onChangeText={(e)=>this.setState({SupportEmail:e})} style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>(*) Address</NormalText>
                        {this.state.ErrorCode === 3 ? <NormalText style={styles.ErrorText}>Address Cannot Be Left Blank</NormalText>:null}
                        <TextInput placeholder="Enter Address" onChangeText={(e)=>this.setState({Address:e})} style={CommonStyle.TextInputs}></TextInput>
                        
                        <NormalText style={styles.OverideNormalText}>(*) Support Contact 1</NormalText>
                        {this.state.ErrorCode === 4 ? <NormalText style={styles.ErrorText}>Support Contact Should Be Valid</NormalText>:null}
                        <TextInput placeholder="Enter Support Contact 1" onChangeText={(e)=>this.setState({SupportContact1:e})} keyboardType='number-pad' style={CommonStyle.TextInputs}></TextInput>
                        
                        <NormalText style={styles.OverideNormalText}>Support Contact 2</NormalText>
                        <TextInput placeholder="Enter Support Contact 2" onChangeText={(e)=>this.setState({SupportContact2:e})} keyboardType='number-pad' style={CommonStyle.TextInputs}></TextInput>
                        
                        <NormalText style={styles.OverideNormalText}>Website</NormalText>
                        <TextInput placeholder="Enter Website" onChangeText={(e)=>this.setState({Website:e})} style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>Main Broker Name</NormalText>
                        <TextInput placeholder="Enter Broker Name" onChangeText={(e)=>this.setState({MainBrokerName:e})} style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>Main Broker Contact</NormalText>
                        <TextInput placeholder="Enter Broker Contact" onChangeText={(e)=>this.setState({MainBrokerContact:e})} keyboardType='number-pad' style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>Main Broker Email ID</NormalText>
                        <TextInput placeholder="Enter Broker Website" onChangeText={(e)=>this.setState({MainBrokerEmailId:e})} style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>Main Broker Website</NormalText>
                        <TextInput placeholder="Enter Broker Website" onChangeText={(e)=>this.setState({MainBrokerWebsite:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <TouchableOpacity style={{width:'100%',alignItems:'center',marginBottom:10}} onPress={()=>this.onContactDetailsSubmit()}>
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
    ContactContainer:{
        flex:1,
        backgroundColor:"#ebecf1",
        justifyContent:'center',
        alignItems:'center',
        paddingTop:40
    },
    OverrideCard:{
        marginTop:"20%"
    },
    TextInputContainer:{
        marginVertical:5,
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
        width:"90%",
        marginVertical:15,
        borderRadius:30,
        overflow:'hidden'
    },
    ErrorText:{
        color:'red',
        marginBottom:0
    }
})

export default ContactDetails;