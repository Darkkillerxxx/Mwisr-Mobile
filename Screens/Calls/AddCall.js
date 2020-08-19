import React from 'react'
import { View,StyleSheet,ScrollView,TouchableOpacity,TextInput,FlatList,Picker,Switch} from 'react-native';
import { connect }from 'react-redux'
import {get_package_addCall,get_similar_package,verbose} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import MwisrSelector from '../../Components/MwisrSelector'
import CollapsibleCard from '../../Components/CollapsibleCard'
import { FontAwesome } from '@expo/vector-icons';
import Card from '../../Components/Card'
import CustomButton from '../../Components/Button'
import BoldText from '../../Components/BoldText'
import { RadioButton } from 'react-native-paper';
import RBContainer from '../../Components/RBContainer'

class AddCall extends React.Component{
    constructor()
    {
        super();
        this.state={
            IsQuickAddCall:true,
            SelectPackagePart:1,
            PackageSearchText:"",
            SelectedBasePackageId:null,
            Packages:[],
            SelectedPackages:[],
            SelectedPackageIndex:null,
            SimilarPackages:[],
            StrategyDetails:[]
        }
        console.disableYellowBox = true;
    }


    changeAddCallType=(value)=>{
        this.setState({IsQuickAddCall:value})
        //Reset Whole State after Changing Add Call Type
    }

    componentDidMount()
    {
        get_package_addCall(this.props.loginState.AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Packages:result.Data})
            }
            else
            {
                verbose(false,"Error Fetching Packages",result.DisplayMsg)
            }
        })

        if(this.state.IsQuickAddCall)
        {
            this.AddStrategyQuickAddCall()
        }
    }

    AddStrategyQuickAddCall=()=>{
        let temp=this.state.StrategyDetails;

        let QuickStrategy={
            index:0,
            CMPType:null,
            CallType:null,
            Symbol:"",
            Target1:null,
            Target2:null,
            Target3:null,
            Stoploss1:null,
            Stoploss2:null,
            Stoploss3:null,
            InvestmentAmt:null,
            InvestmentLot:null,
            PackageTypeId:null
        }
    }

    getSimilarPackage=()=>
    {
        let payload={
            forMarketExchangeCodes:this.state.Packages[this.state.SelectedPackageIndex].ForExchanges,
            forMarketSegmentId:this.state.Packages[this.state.SelectedPackageIndex].MarketSegmentId
        }

        get_similar_package(this.props.loginState.AuthHeader,payload).then(result =>{
            console.log("Similar Package",result)
            if(result.IsSuccess)
            {
                this.setState({SimilarPackages:result.Data})    
            }
            else
            {
                verbose(false,"Error Fetching Similar Packages",result.DisplayMsg)
            }
        })
    }

    onPackageSelected=(Id)=>{
        if(this.state.SelectedBasePackageId === null)
        {
            if(this.state.IsQuickAddCall)
            {
                let temp=[];
                temp.push(Id)
                this.setState({SelectedBasePackageId:Id})
                this.setState({SelectedPackages:temp})
            }
        }
    }

    ChangePackageSearchText=(e)=>{
        this.setState({PackageSearchText:e})
    }

   

    render()
    {
        let ShowPackages=this.state.Packages.map((result,index) => {
            return(
                result.PackageName.includes(this.state.PackageSearchText) ?
                <TouchableOpacity style={{width:'100%'}} onPress={()=>this.onPackageSelected(result.PackageId)}>
                <View style={{flexDirection:'row',width:'100%',padding:5}}>
                <NormalText style={{width:'85%',color:`${this.state.SelectedPackages.includes(result.PackageId) ? 'grey':'black'}`,marginBottom:0,fontSize:14}}>{result.PackageName}</NormalText>
                    <View style={{width:'15%',alignItems:'center'}}>
                        {this.state.SelectedPackages.includes(result.PackageId) ? 
                        <FontAwesome name="check" size={15} color="grey" />:null}
                    </View>
                </View>
                </TouchableOpacity>:null
            )
        })
        return(
            <Container style={styles.CustomContainer}>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.IsQuickAddCallContainer}>
                        <MwisrSelector onSelect={this.changeAddCallType} Selected={this.state.IsQuickAddCall ? true: false} Text={'Quick Add Call'} value={true}/>
                        <MwisrSelector onSelect={this.changeAddCallType} Selected={this.state.IsQuickAddCall ? false: true} Text={'Advanced Add Call'} value={false}/>
                    </View>
                    
                    {this.state.Packages.length > 0 ? 
                    <View style={styles.AddContainer}>
                      
                            <Card style={styles.CustomCard}>
                                {this.state.SelectPackagePart === 1 ? 
                                  <TouchableOpacity style={{width:'100%'}} onPress={()=> this.setState({SelectPackagePart:2})}>
                                    <View style={styles.SelectPackageContainer}>
                                        <View style={{width:'15%'}}>
                                            <FontAwesome name="search" size={20} color="black" />
                                        </View>   
                                        <View style={{width:'75%',alignItems:'flex-start'}}>
                                            <NormalText style={{fontSize:14,marginBottom:0}}>Select A Package ...</NormalText>            
                                        </View>
                                        <View style={{width:'10%',alignItems:'center'}}>
                                            <FontAwesome name="caret-down" size={20} color="black" />    
                                        </View>
                                    </View>
                                    </TouchableOpacity>:
                                    <View style={{width:'100%'}}>
                                        <View style={styles.SelectPackageContainer}>
                                            <View style={{width:'15%',justifyContent:'center',borderBottomWidth:1}}>
                                                <FontAwesome name="search" size={20} color="black" />
                                            </View>   
                                            <View style={{width:'85%',alignItems:'flex-start'}}>
                                                <TextInput placeholder="Search for Package ..." onChangeText={this.ChangePackageSearchText} style={{borderBottomWidth:1,borderBottomColor:'grey',height:45,width:'100%'}} />            
                                            </View>
                                        </View>
                                        <View style={{width:'100%',padding:10,maxHeight:150,marginTop:0}}>
                                            <ScrollView nestedScrollEnabled={true} style={{width:'100%'}}>
                                               {ShowPackages}
                                            </ScrollView>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly'}}>
                                            <TouchableOpacity style={{width:'40%'}}>
                                                <CustomButton style={{width:'100%'}}>
                                                    <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Reset</NormalText>
                                                </CustomButton>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{width:'40%'}}>
                                                <CustomButton style={{width:'100%'}}>
                                                    <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Submit</NormalText>
                                                </CustomButton>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    }    
                            </Card>

                            <View style={styles.LegsContainer}>
                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Duration</NormalText>
                                    <View style={styles.TextInputContainer}>
                                        <Picker selectedValue={""} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}>
                                            
                                        </Picker>
                                    </View>
                                </Card>

                                <Card style={styles.FlexContainer}>
                                    <View style={{width:'33%',alignItems:'flex-end'}}>
                                        <BoldText style={{marginVertical:0}}>BUY</BoldText>
                                    </View>
                                    <View style={{width:'33%',alignItems:'center'}}>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={()=>{}}
                                            value={true}
                                        />
                                    </View>
                                    <View style={{width:'33%'}}>
                                        <BoldText style={{marginVertical:0}}>SELL</BoldText>
                                    </View>
                                </Card>

                                <Card style={styles.CustomCard}>
                                    <View style={styles.SelectSymbolContainer}>
                                        <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Symbol</NormalText>
                                        <View style={styles.TextInputContainer}>
                                            <TextInput />
                                        </View>
                                    </View>
                                    <View style={styles.SelectSymbolContainer}>
                                        <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Expiry Date</NormalText>
                                        <View style={styles.TextInputContainer}>
                                            <Picker selectedValue={""} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}>
                                            
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{...styles.FlexContainer,...{padding:0,borderRadius:0,marginVertical:10}}}>
                                        <View style={{width:'50%',alignItems:'flex-start'}}>
                                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Option Type</NormalText>
                                            <View style={styles.FlexContainer}>
                                                <View style={{width:'33%',alignItems:'center'}}>
                                                    <TouchableOpacity>
                                                        <View style={styles.CePeSelected}>
                                                            <NormalText style={styles.CePeSelectedText}>CE</NormalText>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{width:'33%',alignItems:'center'}}>
                                                    <TouchableOpacity>
                                                        <View style={styles.CePeUnSelected}>
                                                            <NormalText style={styles.CePeUnSelectedText}>PE</NormalText>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{width:'50%',alignItems:'flex-start'}}>
                                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Strike Price</NormalText>
                                            <View style={styles.TextInputContainer}>
                                                <Picker selectedValue={""} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}>
                                                
                                                </Picker>
                                            </View>
                                        </View>
                                    </View>
                                </Card>

                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select CMP</NormalText>
                                    <View style={styles.FlexContainer}>
                                        <RadioButton.Group onValueChange={()=>{}}>
                                            <RBContainer style={styles.CustomRadioButton}>
                                                <RadioButton color="black" uncheckedColor="black" value={1} status={'checked'}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>At CMP</NormalText>
                                            </RBContainer>
                                            <RBContainer style={styles.CustomRadioButton}>
                                                <RadioButton color="black" uncheckedColor="black" value={2} status={'unchecked'}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Above</NormalText>
                                            </RBContainer>
                                            <RBContainer style={styles.CustomRadioButton}>
                                                <RadioButton color="black" uncheckedColor="black" value={3} status={'unchecked'}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Below</NormalText>
                                            </RBContainer>
                                            <RBContainer style={styles.CustomRadioButton}>
                                                <RadioButton color="black" uncheckedColor="black" value={3} status={'unchecked'}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Between</NormalText>
                                            </RBContainer>
                                        </RadioButton.Group>
                                    </View>
                                </Card>

                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Trigger</NormalText>
                                        <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                                            <View style={{width:'45%',alignItems:'flex-start'}}>
                                                <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Minimum</NormalText>
                                                <View style={styles.TextInputContainer}>
                                                    <TextInput />
                                                </View>
                                           </View>
                                            <View style={{width:'45%'}}>
                                                <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Maximum</NormalText>
                                                <View style={styles.TextInputContainer}>
                                                    <TextInput />
                                                </View>
                                            </View>
                                        </View>
                                </Card>

                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>{`Target & Stoploss`}</NormalText>
                                        <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                                            <View style={{width:'45%'}}>
                                                <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Target 1</NormalText>
                                                <View style={styles.TextInputContainer}>
                                                    <TextInput />
                                                </View>
                                           </View>
                                            <View style={{width:'45%'}}>
                                                <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>StopLoss 1</NormalText>
                                                <View style={styles.TextInputContainer}>
                                                    <TextInput />
                                                </View>
                                            </View>
                                        </View>
                                </Card>

                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Investment Amount</NormalText>
                                    <View style={styles.TextInputContainer}>
                                       <TextInput />
                                    </View>
                                </Card>

                            </View>
                    </View>
                    :null}

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
        backgroundColor:'#EAEBF0'
    },
    IsQuickAddCallContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginBottom:10,
        height:50
    },
    AddContainer:{
        flex:1,
        width:'100%',
        alignItems:'center',
    },
    CustomCard:{
        width:'100%',
        alignItems:'center',
        padding:10,
        marginVertical:5,
        borderRadius:5
    },
    SelectPackageContainer:{
        flexDirection:'row'
    },
    TextInputContainer:{
        borderRadius:10,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        marginTop:10,
        height:40,
        justifyContent:'center',
    },
    LegsContainer:{
        width:'100%'
    },
    FlexContainer:{
        width:'100%',
        flexDirection:'row',
        padding:10,
        marginVertical:5,
        borderRadius:5
    },
    SelectSymbolContainer:{
        width:'100%',
        marginVertical:5
    },
    CePeSelected:{  
        backgroundColor:'#07142C',
        borderRadius:100,
        height:35,
        width:35,
        alignItems:'center',
        justifyContent:'center'
    },
    CePeSelectedText:{  
        color:'white',
        marginBottom:0,
        fontSize:14
    },
    CePeUnSelected:{
        borderColor:'#07142C',
        borderWidth:1,
        borderRadius:100,
        height:35,
        width:35,
        alignItems:'center',
        justifyContent:'center'
    },
    CePeUnSelectedText:{
        color:'#07142C',
        marginBottom:0,
        fontSize:14
    },
    CustomRadioButton:{
        width:'25%',
        alignItems:'center',
        justifyContent:'flex-start'
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