import React from 'react';
import { View,StyleSheet,Image,TouchableOpacity, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Container from '../../Components/Container';
import { FontAwesome } from '@expo/vector-icons';
import NormalText from '../../Components/NormalText'
import { connect }from 'react-redux'
import CollapsibleCard from '../../Components/CollapsibleCard'
import {get_contact_details,get_registration_details,get_company_details} from '../../Utils/api'

class Profile extends React.Component {
    constructor()
    {
        super()
        this.state={
            ProfileContents:[]
        }
    }


    componentDidMount()
    {
        get_contact_details(this.props.loginState.AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                let temp=[]
                temp.push(result.Data)
                this.setState({ProfileContents:temp});
            }
        })
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

                    <View style={styles.UserDetails}>
                        {this.state.ProfileContents.length > 0 ?
                        <CollapsibleCard style={styles.CustomCollapsibleCard} Heading='Profile Inormation'>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].Name} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Company's Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].CompanyName} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:'100%'}}>
                                <View style={{width:'100%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Address</NormalText>
                                    <View style={styles.AddressTextBox}>
                                        <TextInput value={this.state.ProfileContents[0].Address} numberOfLines={5} style={{height:70}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Website</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].Website} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Mobile No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].MobileNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Support Contact 1</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].SupportContact1} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Support Contact 2</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].SupportContact2} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Name</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].MainBrokerName} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Contact</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].MainBrokerPhoneNo} style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Email</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].MainBrokerEmailId} style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Main Broker Website</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput value={this.state.ProfileContents[0].Website} style={{height:35}}/>
                                    </View>
                                </View>
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

                        
                        <CollapsibleCard style={styles.CustomCollapsibleCard} Heading='Registration Info'>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>NSE Member ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>BSE Memeber ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>MCX Member ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>NCDEX Memeber ID</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>CSDL No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>NSDL No.</NormalText>
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

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>MSEI NO.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>SEBI Registration No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Research Analyst No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>Investment Advisor No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>ARN No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>IRDA No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.CardInner}>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>CIN No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                                <View style={{width:'45%'}}>
                                    <NormalText style={{fontSize:12,marginBottom:5}}>PMS No.</NormalText>
                                    <View style={styles.TextInputBox}>
                                        <TextInput style={{height:35}}/>
                                    </View>
                                </View>
                            </View>
                        </CollapsibleCard>
                    </View>
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