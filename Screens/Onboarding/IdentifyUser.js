import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import {UpdateUserIdentification,identifyYourself} from '../../Utils/api'
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import CustomButton from '../../Components/Button'

class IdentifyUser extends React.Component{
    constructor()
    {
        super();
        this.state={
            isLoading:false,
            SelectedType:null
        }
    }

    onIdentifyUser=()=>{
        this.setState({isLoading:true})
        if(this.state.SelectedType !== null)
        {
            identifyYourself(this.props.UserTypeId,this.state.SelectedType,this.props.authHeader).then((result)=>{
                if(result.Success)
                {
                    UpdateUserIdentification(this.props.authHeader,this.props.UserId,this.state.SelectedType).then(result=>{
                        if(result.IsSuccess)
                        {
                          this.props.LoginCall()
                          this.setState({isLoading:false})
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

    SelectUser=(type)=>{
        this.setState({SelectedType:type})
    }

    render()
    {
        return(
            <Container style={styles.IdentifyContainer}>
                <Text style={styles.IdentifyText}>Identify Yourself</Text>
                <Text style={styles.IdentifyDesc}>Help Us Know Who You Are For Setting Up Your Profile</Text>
                <View style={styles.UserIconContainer}>
                    
                    <TouchableOpacity onPress={()=>this.SelectUser("B")}>
                        <View style={styles.UserIcon}>
                            <Image style={this.state.SelectedType === "B" ? styles.IconExpanded : styles.Icon} source={require('../../assets/Images/Broker.png')} />
                            <Text style={this.state.SelectedType === "B" ? styles.IconTextExpanded : styles.IconText}>Broker</Text>  
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.SelectUser("I")}>
                        <View style={styles.UserIcon}>
                            <Image style={this.state.SelectedType === "I" ? styles.IconExpanded : styles.Icon} source={require('../../assets/Images/Analyst.png')} />
                            <Text style={this.state.SelectedType === "I" ? styles.IconTextExpanded : styles.IconText}>Analyst</Text>  
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.UserIconContainer}>
                    
                    <TouchableOpacity onPress={()=>this.SelectUser("R")}>
                        <View style={styles.UserIcon}>
                            <Image style={this.state.SelectedType === "R" ? styles.IconExpanded : styles.Icon} source={require('../../assets/Images/Reaserch-House.png')} />
                            <Text style={this.state.SelectedType === "R" ? styles.IconTextExpanded : styles.IconText}>Research House</Text>  
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.SelectUser("S")}>
                        <View style={styles.UserIcon}>
                            <Image style={this.state.SelectedType === "S" ? styles.IconExpanded : styles.Icon} source={require('../../assets/Images/Sub-Broker.png')} />
                            <Text style={this.state.SelectedType === "S" ? styles.IconTextExpanded : styles.IconText}>Sub-Broker</Text>  
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{width:'100%',alignItems:'center',marginBottom:10}} onPress={()=>this.onIdentifyUser()} >
                    <CustomButton>
                        {!this.state.isLoading ? 
                        <NormalText style={{color:'white',marginBottom:0}}>Proceed</NormalText>:
                        <ActivityIndicator size="small" color="#fff" />}
                    </CustomButton>
                </TouchableOpacity>

            </Container>
        )
    }
}

const styles=StyleSheet.create({
    IdentifyContainer:{
        flex:1,
        marginTop:30,
        alignSelf:'stretch',
        backgroundColor:"#ebecf1"
    },
    IdentifyText:{
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    IdentifyDesc:{
        fontFamily:'open-sans',
        fontSize:14,
        width:'80%',
        marginVertical:10
    },
    UserIconContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        marginVertical:10
    },
    UserIcon:{
       alignItems:'center'
    },
    IconText:{
        fontFamily:'open-sans',
        fontSize:14,
        marginVertical:10
    },
    IconTextExpanded:{
        fontFamily:'open-sans',
        fontSize:16,
        marginVertical:10
    },
    Icon:{
        height:80,
        width:80,
        opacity:0.5
    },
    IconExpanded:{
        height:100,
        width:100
    }
})


export default IdentifyUser;