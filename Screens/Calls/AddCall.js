import React from 'react'
import { View,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import { connect }from 'react-redux'
import {login_call, GetAuthHeader,CheckWhereToGo} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import MwisrSelector from '../../Components/MwisrSelector'
import CollapsibleCard from '../../Components/CollapsibleCard'
import { FontAwesome } from '@expo/vector-icons';

class AddCall extends React.Component{
    constructor()
    {
        super();
        this.state={
            IsQuickAddCall:true
        }
    }


    changeAddCallType=(value)=>{
        this.setState({IsQuickAddCall:value})
        //Reset Whole State after Changing Add Call Type
    }

    componentDidMount()
    {

    }

    render()
    {
        return(
            <Container style={styles.CustomContainer}>
                <ScrollView>
                    <View style={styles.IsQuickAddCallContainer}>
                        <MwisrSelector onSelect={this.changeAddCallType} Selected={this.state.IsQuickAddCall ? true: false} Text={'Quick Add Call'} value={true}/>
                        <MwisrSelector onSelect={this.changeAddCallType} Selected={this.state.IsQuickAddCall ? false: true} Text={'Advanced Add Call'} value={false}/>
                    </View>

                    <CollapsibleCard Heading="Select Package" style={{width:'100%',borderRadius:5}}>
                        <View style={styles.SelectPackageContainer}>
                            <View style={styles.SideArrowContainer}>
                                <TouchableOpacity>
                                    <View style={styles.ArrowContainer}>
                                        <FontAwesome name="chevron-left" size={10} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.PackageContainer}>
                                <View style={styles.UnSelectedPackage}>
                                    <FontAwesome name="dropbox" size={20} color="#F0B22A" />
                                    <NormalText style={{marginBottom:5,marginTop:5,textAlign:'center',color:"#F0B22A"}}>EQ-FUT</NormalText>
                                    <NormalText style={{marginBottom:5,textAlign:'center',color:"#F0B22A"}}>CommodityFutures</NormalText>
                                </View>
                                <View style={styles.SelectedPackage}>
                                    <FontAwesome name="dropbox" size={20} color="white" />
                                    <NormalText style={{marginBottom:5,marginTop:5,textAlign:'center',color:'white'}}>EQ-FUT</NormalText>
                                    <NormalText style={{marginBottom:5,textAlign:'center',color:'white'}}>CommodityFutures</NormalText>
                                </View>
                                <View style={styles.UnSelectedPackage}>
                                    <FontAwesome name="dropbox" size={20} color="#F0B22A" />
                                    <NormalText style={{marginBottom:5,marginTop:5,textAlign:'center',color:"#F0B22A"}}>EQ-FUT</NormalText>
                                    <NormalText style={{marginBottom:5,textAlign:'center',color:"#F0B22A"}}>CommodityFutures</NormalText>
                                </View>
                            </View>
                            <View style={styles.SideArrowContainer}>
                            <TouchableOpacity>
                                    <View style={styles.ArrowContainer}>
                                        <FontAwesome name="chevron-right" size={10} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CollapsibleCard>
                </ScrollView>
                
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustomContainer:{
        alignItems:'center',
        justifyContent:'flex-start',
        padding:10,
        backgroundColor:'#FAFAFA'
    },
    IsQuickAddCallContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginBottom:10
    },
    SelectPackageContainer:{
        flexDirection:'row',
        padding:5,
        justifyContent:'center',
        marginTop:10
    },
    PackageContainer:{
        width:'80%',
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    UnSelectedPackage:{
        width:'28%',
        height:75,
        alignItems:'center',
        borderWidth:1,
        borderRadius:5,
        padding:5,
        borderColor:'#F0B22A',
        marginHorizontal:5
    },
    SelectedPackage:{
        width:'33%',
        height:85,
        alignItems:'center',
        borderWidth:1,
        borderRadius:5,
        padding:5,
        borderColor:'#F0B22A',
        backgroundColor:'#F0B22A',
        marginHorizontal:5
    },
    SideArrowContainer:{
        width:'10%',
        justifyContent:'center',
        alignItems:'center'
    },
    ArrowContainer:{
        borderRadius:100,
        width:25,
        height:25,
        borderWidth:1,
        backgroundColor:'black',
        opacity:0.5,
        alignItems:'center',
        justifyContent:'center'
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

export default connect(mapStateToProps,mapDispatchToProps)(AddCall);