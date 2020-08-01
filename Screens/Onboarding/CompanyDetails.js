import React,{component} from 'react';
import { StyleSheet,TextInput,Text,Button,View,Image,ScrollView,Picker,TouchableOpacity,ActivityIndicator } from 'react-native';
import {RegisterCompanyDetails} from '../../Utils/api'
import {Checkbox} from 'react-native-paper'
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import CustomButton from '../../Components/Button'
import {CommonStyle} from '../../CommonStyle/CommonStyle'



class CompanyDetails extends React.Component{
    constructor()
    {
        super();
        this.state={
            SelectedResearchType:"Fundamental",
            YearsOfExperience:0,
            CompanyName:"",
            Designation:"",
            ShowOnWealthyFox:false,
            IsLoading:false
        }
    }

    onCompanyDetailsSubmit=()=>{
        this.setState({IsLoading:true})
        let CompanyPayload={
            MobileNo:this.props.Contact.includes('+91') ? this.props.Contact.substring(3):this.props.Contact,
            AdminName:"",
            AdminEmailId:"",
            AdminPhoneNo:"",
            CompanyLogo:"",
            YearsOfExperience:this.state.YearsOfExperience,
            Experience:[],
            ResearchType:this.state.SelectedResearchType,
            ShowProfileOnWealthyfox:this.state.ShowOnWealthyFox
            }

            RegisterCompanyDetails(CompanyPayload,this.props.authHeader).then((result)=>{
                console.log(result)
                if(result.IsSuccess)
                {
                    this.props.LoginCall()
                    this.setState({IsLoading:false})
                }
            })
    }

    render()
    {
        return(
            <View style={styles.CompanyContainer}>
                 <Card>
                    <BoldText>Company Details</BoldText>
                    <NormalText>Fields Marked with (*) are Mandatory</NormalText>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={styles.OverideNormalText}>(*) Reseach Type</NormalText>
                        <Picker selectedValue={this.state.SelectedResearchType} onValueChange={(val)=>this.setState({SelectedResearchType:val})} placeholder="Research Types" style={styles.TextInput}>
                            <Picker.Item label="Fundamental" value="Fundamental" />
                            <Picker.Item label="Technofunda" value="Technofunda" />
                        </Picker>

                        <NormalText style={styles.OverideNormalText}>Years Of Experience</NormalText>
                        <TextInput placeholder="Enter Years Of Experience" onChangeText={(e)=>this.setState({YearsOfExperience:parseInt(e)})} keyboardType="number-pad" style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>Company name</NormalText>
                        <TextInput placeholder="Enter Company Name" onChangeText={(e)=>this.setState({CompanyName:e})} style={CommonStyle.TextInputs}></TextInput>

                        <NormalText style={styles.OverideNormalText}>Designation</NormalText>
                        <TextInput placeholder="Enter Designamtion" onChangeText={(e)=>this.setState({Designation:e})} style={CommonStyle.TextInputs}></TextInput>
                    </View>

                    <View style={styles.CheckboxContainer}>
                    <Checkbox
                        status={this.state.ShowOnWealthyFox ? "checked":"unchecked"}
                        onPress={() => this.setState({ShowOnWealthyFox:!this.state.ShowOnWealthyFox})}
                    />
                    <NormalText style={styles.OverideNormalText}>Show Profile on WealthyFox</NormalText>
                    </View>

                    <TouchableOpacity style={{width:'100%',alignItems:'center',marginBottom:10}} onPress={()=>this.onCompanyDetailsSubmit()}>
                        <CustomButton>
                            {!this.state.IsLoading ? 
                            <NormalText style={{color:'white',marginBottom:0}}>SUBMIT DETAILS</NormalText>:
                            <ActivityIndicator size="small" color="#fff" />}
                        </CustomButton>
                    </TouchableOpacity>
                </Card>    
            </View>
        )
    }
}

const styles=StyleSheet.create({
    CompanyContainer:{
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
    CheckboxContainer:{
        flexDirection:'row',
        marginVertical:10
    }
})


export default CompanyDetails;