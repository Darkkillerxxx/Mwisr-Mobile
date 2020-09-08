import React from 'react';
import { View,StyleSheet,TextInput,TouchableOpacity, Image} from 'react-native';
import Container from '../../Components/Container'
import StepIndicator from 'react-native-step-indicator';
import Card from '../../Components/Card';
import NormalText from '../../Components/NormalText';
import CustomButton from '../../Components/Button'

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#28262B',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#28262B',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#28262B',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#28262B',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#F0B22A',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#F0B22A',
    stepIndicatorLabelFinishedColor: '#28262B',
    stepIndicatorLabelUnFinishedColor: '#fafafa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#28262B'
  }

  const AddStep = ["Information","OTP","Done"];
class ConfigTele extends React.Component {
    constructor() {
        super()
        this.state={
            Step:0,
            FirstName:"",
            LastName:"",
            Contact:"",
            APIID:"",
            Hash:"",
            OTP:"",
            ErrCode:null
        }
    }

    onProceed=()=>{
        if(this.validation())
        {
            this.setState({Step:this.state.Step + 1})
        }
    }

    validation=()=>{
        if(this.state.Step === 0)
        {
            if(this.state.FirstName === "")
            {
                return false
            }
            else if(this.state.LastName === "")
            {
                return false
            }
            else if(this.state.Contact.length !== 10)
            {
                return false
            }
            else if(this.state.APIID === "")
            {
                return false
            }
            else if(this.state.Hash === "")
            {
                return false
            }
            return true
        }
        else
        {
            if(this.state.OTP === "")
            {
                return false
            }
            return true
        }
    }

    render()
    {
        return(
            <Container style={styles.TeleContainer}>
                <View style={styles.StepIndicatorContainer}>
                   <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.state.Step}
                    labels={AddStep}
                    stepCount={3}
                   />
                </View>

                <Card style={styles.CustomCard}>
                    {this.state.Step === 0 ? 
                    <>
                    <View style={styles.TextInputContainer}>
                        <NormalText style={{marginBottom:5,fontSize:14}}>First Name</NormalText>
                        <TextInput onChangeText={(e)=>this.setState({FirstName:e})} style={styles.CustomTextInputs} />
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={{marginBottom:5,fontSize:14}}>Last Name</NormalText>
                        <TextInput onChangeText={(e)=>this.setState({LastName:e})} style={styles.CustomTextInputs} />
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={{marginBottom:5,fontSize:14}}>Mobile No.</NormalText>
                        <TextInput onChangeText={(e)=>this.setState({Contact:e})} keyboardType='number-pad' style={styles.CustomTextInputs} />
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={{marginBottom:5,fontSize:14}}>API ID</NormalText>
                        <TextInput onChangeText={(e)=>this.setState({APIID:e})} style={styles.CustomTextInputs} />
                    </View>

                    <View style={styles.TextInputContainer}>
                        <NormalText style={{marginBottom:5,fontSize:14}}>API Hash</NormalText>
                        <TextInput onChangeText={(e)=>this.setState({Hash:e})} style={styles.CustomTextInputs}/>
                    </View>
                    </>:
                    this.state.Step === 1 ?
                    <View style={{width:'100%',height:100,alignItems:'center',justifyContent:'center'}}>
                         <View style={{...styles.TextInputContainer,...{width:'80%',alignItems:'center'}}}>
                            <NormalText style={{marginBottom:5,fontSize:14}}>Enter OTP</NormalText>
                            <TextInput onChangeText={(e)=>this.setState({OTP:e})} style={{...styles.CustomTextInputs,...{textAlign:'center'}}} keyboardType="numeric" />
                        </View>
                    </View>:
                    <View style={{width:'100%',height:250,alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                        <Image source={require('../../assets/Images/telegram.png')} style={{width:150,height:150}}/>
                        <NormalText style={{marginBottom:5,fontSize:14,textAlign:'center'}}>Your Telegram Account Is Successfully Linked With Mwisr</NormalText>
                    </View>
                    }
                </Card>

                {this.state.Step <= 1 ?  
                <TouchableOpacity onPress={()=>this.onProceed()}>
                    <CustomButton style={{width:150,borderRadius:5}}>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:15}}>Proceed</NormalText>
                    </CustomButton>
                </TouchableOpacity>:<TouchableOpacity onPress={()=>this.onProceed()}>
                    <CustomButton style={{width:150,borderRadius:5}}>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:15}}>Unregister Telegram</NormalText>
                    </CustomButton>
                </TouchableOpacity>}
                
            </Container>
        )
    }
}


const styles=StyleSheet.create({
    TeleContainer:{
        justifyContent: 'flex-start',
        backgroundColor:"#EAEBF0",
        padding:5
    }, 
    StepIndicatorContainer:{
        width:"95%"
    },
    CustomCard:{
        width:'95%',
        marginVertical:10,
        borderRadius:5,
        padding:10,
        minHeight:100
    },
    TextInputContainer:{
        width:'100%',
        alignItems:"flex-start",
        marginVertical:5
    },
    CustomTextInputs:{
        borderRadius:5,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        height:40
    }
})



export default ConfigTele