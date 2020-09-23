import React from 'react';
import { View,StyleSheet,Image,TouchableOpacity, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Container from '../../Components/Container';
import { FontAwesome } from '@expo/vector-icons';
import NormalText from '../../Components/NormalText'
import { connect }from 'react-redux'
import CollapsibleCard from '../../Components/CollapsibleCard'
import {get_contact_details,get_registration_details,get_company_details,upsert_contact_details,upsert_registration_detail,verbose} from '../../Utils/api'
import CustomerAnswers from './CustomerAnswers'
import CustomButton from '../../Components/Button'


class Profile extends React.Component {
    constructor()
    {
        super()
        this.state={
            ProfileContents:[],
            RegistrationContents:[]
        }
    }


    componentDidMount()
    {

        if(this.props.loginState.UserTypeId !== 7)
        {
            get_contact_details(this.props.loginState.AuthHeader).then(result=>{
                if(result.IsSuccess)
                {
                    let temp=[]
                    temp.push(result.Data)
                    this.setState({ProfileContents:temp});
                }
            })
    
            get_registration_details(this.props.loginState.AuthHeader).then(result=>{
                if(result.IsSuccess)
                {
                    let registrationTemp=[]
                    registrationTemp.push(result.Data)
                    this.setState({RegistrationContents:registrationTemp},()=>{
                        console.log(this.state.RegistrationContents)
                    });
                }
            })
        }
    }

    UpsertContactDetails()
    {
        let ContactPayload={
            MobileNo: this.state.ProfileContents[0].MobileNo,
            Name: this.state.ProfileContents[0].Name,
            CompanyName: this.state.ProfileContents[0].CompanyName,
            SupportEMailId: this.state.ProfileContents[0].SupportEMailId,
            SupportContact1: this.state.ProfileContents[0].SupportContact1,
            SupportContact2: this.state.ProfileContents[0].SupportContact2,
            WebSite: this.state.ProfileContents[0].WebSite,
            MainBrokerName: this.state.ProfileContents[0].MainBrokerName,
            MainBrokerPhoneNo: this.state.ProfileContents[0].MainBrokerPhoneNo,
            MainBrokerEmailId: this.state.ProfileContents[0].MainBrokerEmailId,
            MainBrokerWebsite: this.state.ProfileContents[0].MainBrokerWebsite
          }

          upsert_contact_details(this.props.loginState.AuthHeader,ContactPayload).then(result=>{
              if(result.IsSuccess)
              {
                verbose(true,"Values Updated","Contact Details Have Been Successfully Updated")
              }
              else
              {
                verbose(false,"Error Updating Values",result.DisplayMsg)
              }
          })
    }

    UpdateRegistrationDetails=()=>
    {
        let payload={
            MobileNo: this.state.RegistrationContents[0].MobileNo,
            NSEMemberId: this.state.RegistrationContents[0].NSEMemberId,
            BSEMemberId:  this.state.RegistrationContents[0].BSEMemberId,
            MCXMemberId:  this.state.RegistrationContents[0].MCXMemberId,
            NCDEXMemberId: this.state.RegistrationContents[0].NCDEXMemberId,
            CDSLNo:  this.state.RegistrationContents[0].CDSLNo,
            NSDLNo:  this.state.RegistrationContents[0].NSDLNo,
            MSEINo:  this.state.RegistrationContents[0].MSEINo,
            SEBIRegistrationNo:  this.state.RegistrationContents[0].SEBIRegistrationNo,
            ResearchAnalystNo:  this.state.RegistrationContents[0].ResearchAnalystNo,
            InvestmentAdvisorNo:  this.state.RegistrationContents[0].InvestmentAdvisorNo,
            ARNNo:  this.state.RegistrationContents[0].ARNNo,
            IRDACorporateAgentNo:  this.state.RegistrationContents[0].IRDACorporateAgentNo,
            AssetManagementCompanyNo:  this.state.RegistrationContents[0].AssetManagementCompanyNo,
            PMSNo:  this.state.RegistrationContents[0].PMSNo,
            CINNo:  this.state.RegistrationContents[0].CINNo
          }

          upsert_registration_detail(this.props.loginState.AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
              verbose(true,"Values Updated","Registration Details Have Been Successfully Updated")
            }
            else
            {
              verbose(false,"Error Updating Values",result.DisplayMsg)
            }
          })
    }

    EditRegistrationInfo=(id,value)=>{
        let RD=this.state.RegistrationContents[0]
        switch(id)
        {
            case 0:
                RD.NSEMemberId=value
                break;
            
            case 1:
                RD.BSEMemberId=value
                break;

            case 2:
                RD.MCXMemberId=value
                break;

            case 3:
                RD.NCDEXMemberId=value
                break;

            case 4:
                RD.CDSLNo=value
                break;

            case 5:
                RD.NSDLNo=value
                break;

            case 6:
                RD.MSEINo=value
                break;

            case 7:
                RD.SEBIRegistrationNo=value
                break;

            case 8:
                RD.ResearchAnalystNo=value
                break;

             case 9:
                RD.InvestmentAdvisorNo=value
                break;

            case 10:
                RD.ARNNo=value
                break;
            
            case 11:
                RD.IRDACorporateAgentNo=value
                break;

             case 12:
                RD.CINNo=value
                break;

            case 13:
                RD.PMSNo=value
                break;

            default:
                break;
        }
        // console.log(CD)
        this.setState({ProfileContents:[RD]})
    }

    EditContactDetails=(id,value)=>{
        let CD=this.state.ProfileContents[0]
        switch(id)
        {
            case 0:
                CD.Name=value
                break;
            
            case 1:
                CD.CompanyName=value
                break;

            case 2:
                CD.Address=value
                break;

            case 3:
                CD.WebSite=value
                break;

            case 4:
                CD.MobileNo=value
                break;

            case 5:
                CD.SupportContact1=value
                break;

            case 6:
                CD.SupportContact2=value
                break;

            case 7:
                CD.MainBrokerName=value
                break;

            case 8:
                CD.MainBrokerPhoneNo=value
                break;

            case 9:
                CD.MainBrokerEmailId=value
                break;
            
            case 10:
                CD.MainBrokerWebsite=value
                break;

            default:
                break;
        }
        // console.log(CD)
        this.setState({ProfileContents:[CD]})
    }

    render() {
        return (
            <Container style={styles.CustomContainer}>
                <ScrollView style={{width:'100%',height:'100%'}}>
                    <View style={styles.ProfileHeader}>
                        <Image source={require('../Profile/profileBackground.jpg')} resizeMode='cover' style={{width:'100%',height:200,borderRadius:5}}/>
                        <View style={styles.ProfileContent}>
                            <View style={styles.ProfilePicture}>
                                <Image source={require('../../assets/Images/Analyst.png')} resizeMode='contain' style={{borderRadius:5,width:90,height:90,left:0,top:3}}/>
                                    <View style={styles.EditButton}>
                                        <TouchableOpacity>
                                            <FontAwesome name="pencil" size={16} color="white" />
                                        </TouchableOpacity>
                                    </View>
                            </View>
                            <NormalText style={{color:'white',top:15,fontSize:14,marginBottom:0}}>{this.props.loginState.UserName}</NormalText>
                            <NormalText style={{color:'white',top:15,fontSize:14}}>{this.props.loginState.EMailId}</NormalText>
                        </View>
                    </View>

                    {this.props.loginState.UserTypeId !== 7 ? 
                    <View style={styles.UserDetails}>
                        {this.state.ProfileContents.length > 0 ?
                        <CollapsibleCard style={styles.CustomCollapsibleCard} Heading='Profile Inormation'>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(0,e)} value={this.state.ProfileContents[0].Name} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Company's Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(1,e)} value={this.state.ProfileContents[0].CompanyName} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:'100%'}}>
                                <View style={{width:'100%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Address</NormalText>
                                    <View style={styles.AddressTextBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(2,e)} value={this.state.ProfileContents[0].Address} numberOfLines={5} style={{height:70}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Website</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(3,e)} value={this.state.ProfileContents[0].WebSite} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Mobile No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(4,e)} value={this.state.ProfileContents[0].MobileNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Support Contact 1</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(5,e)} value={this.state.ProfileContents[0].SupportContact1} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Support Contact 2</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(6,e)} value={this.state.ProfileContents[0].SupportContact2} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(7,e)} value={this.state.ProfileContents[0].MainBrokerName} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Contact</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(8,e)} value={this.state.ProfileContents[0].MainBrokerPhoneNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Email</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(9,e)} value={this.state.ProfileContents[0].MainBrokerEmailId} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Website</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditContactDetails(10,e)} value={this.state.ProfileContents[0].MainBrokerWebsite} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.ButtonContainer}>
                                <TouchableOpacity onPress={()=>this.UpsertContactDetails()}>
                                    <CustomButton style={{width:100,borderRadius:5}}>
                                        <NormalText style={{marginBottom:0,color:'white'}}>Update</NormalText>
                                    </CustomButton>
                                </TouchableOpacity>
                            </View>
                        </CollapsibleCard>:null}

                        <CollapsibleCard style={styles.CustomCollapsibleCard} Heading='Company Info'>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Company's Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Website</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Mobile No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                        </CollapsibleCard>

                        
                        {this.state.RegistrationContents.length > 0 ? 
                        <CollapsibleCard style={styles.CustomCollapsibleCard} Heading='Registration Info'>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>NSE Member ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(0,e)} value={this.state.RegistrationContents[0].NSEMemberId} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>BSE Memeber ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(1,e)} value={this.state.RegistrationContents[0].BSEMemberId} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>MCX Member ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(2,e)} value={this.state.RegistrationContents[0].MCXMemberId} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>NCDEX Memeber ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(3,e)} value={this.state.RegistrationContents[0].NCDEXMemberId} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>CSDL No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(4,e)} value={this.state.RegistrationContents[0].CDSLNo} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>NSDL No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(5,e)} value={this.state.RegistrationContents[0].NSDLNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>MSEI NO.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(6,e)} value={this.state.RegistrationContents[0].MSEINo} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>SEBI Registration No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(7,e)} value={this.state.RegistrationContents[0].SEBIRegistrationNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Research Analyst No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(8,e)} value={this.state.RegistrationContents[0].ResearchAnalystNo} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Investment Advisor No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(9,e)} value={this.state.RegistrationContents[0].InvestmentAdvisorNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>ARN No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(10,e)} value={this.state.RegistrationContents[0].ARNNo} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>IRDA No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(11,e)} value={this.state.RegistrationContents[0].IRDACorporateAgentNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>CIN No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(12,e)} value={this.state.RegistrationContents[0].CINNo} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>PMS No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput onChangeText={(e)=>this.EditRegistrationInfo(13,e)} value={this.state.RegistrationContents[0].PMSNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.ButtonContainer}>
                                <TouchableOpacity onPress={()=>this.UpdateRegistrationDetails()}>
                                    <CustomButton style={{width:100,borderRadius:5}}>
                                        <NormalText style={{marginBottom:0,color:'white'}}>Update</NormalText>
                                    </CustomButton>
                                </TouchableOpacity>
                            </View>
                        </CollapsibleCard>:null}
                    </View>:
                    <CustomerAnswers UserName={this.props.loginState.UserName} UserId={this.props.loginState.UserId} AuthHeader={this.props.loginState.AuthHeader}/>}
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    CustomContainer:{
        padding:10,
        backgroundColor:"#FAFAFA"
    },
    ProfileHeader:{
        width:'100%',
        height:200,
        elevation:4,
        backgroundColor:'white',
        borderRadius:10
    },
    ProfileContent: {
        position:"absolute",
        width:'100%',
        height:200,
        alignItems:"center",
        justifyContent:"center"
    },
    ProfilePicture:{
        width:90,
        height:90,
        borderWidth:3,
        borderRadius:100,
        borderColor:'white',
        elevation:3,
        alignItems:"center",
        justifyContent:"center"
    },
    EditButton:{
        position:'absolute',
        width:30,
        height:30,
        backgroundColor:'#16d39a',
        borderRadius:100,
        top:67,
        elevation:5,
        alignItems:"center",
        justifyContent:"center"
    },
    UserDetails:{
        alignItems:"center",
        justifyContent:"center",
        marginVertical:5
    },
    CustomCollapsibleCard:{
        width:'100%',
        borderRadius:5,
        paddingHorizontal:10,
        marginVertical:5
    },
    CardInner:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:5
    },
    TextInputBox:{
        borderWidth:1,
        borderColor:'#ced4da',
        height:35,
        borderRadius:5
    },
    AddressTextBox:{
        borderWidth:1,
        borderColor:'#ced4da',
        height:70,
        borderRadius:5
    },
    ButtonContainer:{
        width:'100%',
        height:50,
        marginVertical:5,
        alignItems:'flex-end',
        justifyContent:'center'
    }
})

const mapStateToProps= state =>{
    return{
        loginState:state.login.login,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
   
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);