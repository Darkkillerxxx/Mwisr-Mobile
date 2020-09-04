import React from 'react';
import { connect }from 'react-redux'
import {View,StyleSheet,ScrollView,TextInput} from 'react-native'
import Container from '../../Components/Container';
import CollapsibleCard from '../../Components/CollapsibleCard';
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import { FontAwesome } from '@expo/vector-icons';
import {get_credit_details} from '../../Utils/api'
import CustomButton from '../../Components/Button';

<FontAwesome name="pie-chart" size={24} color="black" />
class AddOns extends React.Component {
    constructor(){
        super()
        this.state={
            UserDetails:[]
        }
    }

    componentDidMount(){
        get_credit_details(this.props.loginState.AuthHeader).then(result =>{
            if(result.IsSuccess)
            {
                this.setState({UserDetails:result.Data},()=>{
                    console.log(this.state.UserDetails)
                })
            }
        })
    }

    getIcons=(UnitId)=>{
        switch(UnitId)
        {
            case 1:
                return "pie-chart"
                break;
            
            case 2:
                return "briefcase"
                break;

            case 3:
                return "shopping-cart"
                break;

            case 4:
                return "dropbox"
                break;
            
            case 5:
                return "phone"
                break;
                
            case 6:
                return "file-o"
                break;
                
            case 7:
                return "paper-plane"
                break;
            
            default:
                break;
        }
    }

        render()
        {
            let ShowCreditUsage=this.state.UserDetails.map((result,index)=>(
                
                <>
                <View style={styles.CreditUsageHeading}>
                    <>
                    <FontAwesome name={this.getIcons(result.UnitId)} size={18} color="black" />
                    <BoldText style={{marginLeft:10}}>{result.UnitName}</BoldText>
                    </>
                </View>
                <View style={styles.CreditUsageDataContainer}>
                    <View style={styles.CreditUsageDataContainer}>
                        <View style={styles.CreditUsageData}>
                            <NormalText style={{marginBottom:5,color:'black',fontSize:14}}>Remaining Credits</NormalText>
                            <NormalText style={{marginBottom:5,color:'black'}}>Unlimited</NormalText>
                        </View>
                    </View>
                    <View style={styles.CreditUsageDataContainer}>
                        <View style={styles.CreditUsageData}>
                            <NormalText style={{marginBottom:5,color:'black',fontSize:14}}>Used Credits</NormalText>
                            <NormalText style={{marginBottom:5,color:'black'}}>239</NormalText>
                        </View>
                    </View>
                </View>
                </>
            ))

            return(
                <Container style={styles.CustomCreditContainer}>
                    <ScrollView>
                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading="Credit Usage">
                        {ShowCreditUsage}
                    </CollapsibleCard>

                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading="Add Credits">
                        <View style={{width: '100%',padding:10}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Enter Analyst</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput keyboardType="numeric" />
                            </View>

                            <NormalText style={{marginBottom:0,fontSize:14,color:'black',marginTop:10}}>Enter Customer</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput keyboardType="numeric" />
                            </View>
                            
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black',marginTop:10}}>Enter Broker</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput keyboardType="numeric" />
                            </View>

                            <NormalText style={{marginBottom:0,fontSize:14,color:'black',marginTop:10}}>Enter Employee</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput keyboardType="numeric" />
                            </View>

                            <NormalText style={{marginBottom:0,fontSize:14,color:'black',marginTop:10}}>Enter Package</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput keyboardType="numeric" />
                            </View>

                            <NormalText style={{marginBottom:0,fontSize:14,color:'black',marginTop:10}}>Enter Calls</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput keyboardType="numeric" />
                            </View>

                            <NormalText style={{marginBottom:0,fontSize:14,color:'black',marginTop:10}}>Enter Reports</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput keyboardType="numeric" />
                            </View>

                            <View style={{width:'100%',justifyContent:'center',alignItems:'flex-end',marginVertical:10}}>
                                <CustomButton style={{width:150}}>
                                    <NormalText style={{marginBottom:0,fontSize:12,color:'white'}}>Proceed To Payment</NormalText>
                                </CustomButton>
                            </View>
                            
                        </View>
                       
                    </CollapsibleCard>
                    </ScrollView>
                </Container>
            )
        }
    
}


const styles=StyleSheet.create({
    CustomCreditContainer:{
        justifyContent:'flex-start',
        padding:10,
        backgroundColor:'#EAEBF0'
    },
    CustomCollapsibleCard:{
        width:'100%',
        borderRadius:5,
        elevation:5,
        backgroundColor:'white',
        marginVertical:5
    },
    CreditUsageHeading:{
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'center'
    },
    CreditUsageDataContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        paddingHorizontal:10
    },
    CreditUsageData:{
        width:'50%',
        alignItems:'center'
    },
    TextInputContainer:{
        borderRadius:5,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        marginTop:10,
        height:40,
        justifyContent:'center',
    }
})
const mapStateToProps= state =>{
    return{
        loginState:state.login.login
    }
}

const mapDispatchToProps = dispatch =>{
    return{
 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOns);