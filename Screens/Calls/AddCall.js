import React from 'react'
import { View,StyleSheet,ScrollView,TouchableOpacity,TextInput,FlatList,Picker,Switch} from 'react-native';
import { connect }from 'react-redux'
import {get_package_addCall,get_similar_package,get_strategy_duration,verbose,add_call,get_strategies,get_strategy_details} from '../../Utils/api.js'
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
import Legs from './Legs'
import {NavigationEvents} from 'react-navigation'

class AddCall extends React.Component{
    constructor()
    {
        super();
        this.state={
            IsQuickAddCall:true,
            SelectPackagePart:1,
            PackageSearchText:"",
            SelectedBasePackageId:null,
            SelectedMarketSegmentId:null,
            SelectedOwnerId:null,
            Packages:[],
            SelectedPackages:[],
            SelectedPackageIndex:null,
            SimilarPackages:[],
            StrategyDetails:[],
            SelectedLegs:0,
            Durations:[],
            SelectedDuration:null,
            Exchanges:[],
            Strategy:[],
            SelectedStrategy:null,
            SelectedExchange:null
        }
        console.disableYellowBox = true;
    }


    changeAddCallType=(value)=>{
        this.setState({IsQuickAddCall:value},()=>{
            this.ResetPackages()
            this.getStrategyDuration()
        })
        //Reset Whole State after Changing Add Call Type
    }

    onAddCallInit=()=>
    {
        this.setState({ 
            IsQuickAddCall:true,
            SelectPackagePart:1,
            PackageSearchText:"",
            SelectedBasePackageId:null,
            SelectedMarketSegmentId:null,
            SelectedOwnerId:null,
            Packages:[],
            SelectedPackages:[],
            SelectedPackageIndex:null,
            SimilarPackages:[],
            StrategyDetails:[],
            SelectedLegs:0,
            Durations:[],
            SelectedDuration:null,
            Exchanges:[],
            Strategy:[],
            SelectedStrategy:null,
            SelectedExchange:null
        },()=>{
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
    
            this.getStrategyDuration()
    
            if(this.state.IsQuickAddCall)
            {
                this.AddStrategyQuickAddCall()
            }
        })
        
    }

    getStrategyDuration=()=>{
        get_strategy_duration(this.props.loginState.AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Durations:result.Data})
            }
            else
            {
                verbose(false,"Error Fetching Durations",result.DisplayMsg)
            }
        })
    }

    AddStrategyQuickAddCall=()=>{
        let temp=this.state.StrategyDetails;

        let QuickStrategy={
            Index:0,
            CMP:5,
            SelectedCMP:1,
            CallType:1,
            IsCMPDisabled:false,
            Symbol:"",
            ExpiryDate:null,
            TriggerMin:"",
            TriggerMax:"",
            Target1:"",
            Target2:"",
            Target3:"",
            Stoploss1:"",
            Stoploss2:"",
            Stoploss3:"",
            InvestmentAmt:"",
            PackageTypeId:null,
            TargetStoplossCount:1
        }
       
        temp.push(QuickStrategy)

        this.setState({StrategyDetails:temp})
    }

    getSimilarPackage=()=>
    {
        let payload={
            forMarketExchangeCodes:this.state.Packages[this.state.SelectedPackageIndex].ForExchanges,
            forMarketSegmentId:this.state.Packages[this.state.SelectedPackageIndex].MarketSegmentId
        }

        get_similar_package(this.props.loginState.AuthHeader,payload).then(result =>{
            // console.log("Similar Package",result)
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

    onPackageSelected=(Id,index,duration,Exchanges,MarketSegmentId,OwnerId)=>{
        if(this.state.SelectedBasePackageId === null)
        {
                let temp=[];
                temp.push(Id)
                this.setState({SelectedOwnerId:OwnerId})
                this.setState({SelectedMarketSegmentId:MarketSegmentId});
                this.setState({Exchanges:Exchanges.split(',')},()=>{
                    this.setState({SelectedExchange:this.state.Exchanges[0]})
                    this.setState({SelectedDuration:duration})
                    this.setState({SelectedPackageIndex:index},()=>{
                        this.setState({SelectedBasePackageId:Id},()=>{
                            this.setState({SelectedPackages:temp},()=>{
                                this.getSimilarPackage()

                                if(!this.state.IsQuickAddCall)
                                {
                                    let Strategy_Payload={
                                        marketExchangeCode:this.state.Exchanges[0],
                                        marketSegmentId:MarketSegmentId
                                    }
                                  
                                    get_strategies(this.props.loginState.AuthHeader,Strategy_Payload).then(result=>{
                        
                                        if(result.IsSuccess)
                                        {
                                            this.setState({Strategy:result.Data},()=>{
                                                if(this.state.Strategy.length > 0)
                                                {
                                                    this.GetStrategyDetails(1,Id,OwnerId)
                                                }
                                                else
                                                {
                                                    this.AddStrategyQuickAddCall()
                                                }
                                            })
                                        }
                                        else
                                        {
                                            verbose(false,"Strategy Not Fetched",result.DisplayMsg)
                                        }
                                    })
                                }
                            })
                        })
                    })
                });    
        }
    }

    GetStrategyDetails=(Id,PackageId,OwnerId)=>{
        let Strategy_Details_Payload={
            strategyId:Id,
            forPackageId:PackageId,
            forOwnerId:OwnerId,
            forPackageCreatedBy:OwnerId,
            marketExchangeCodeIfPlainStrategy:""
        };
        
        console.log("SD Payload",Strategy_Details_Payload)
        get_strategy_details(this.props.loginState.AuthHeader,Strategy_Details_Payload).then(result => {
            if(result.IsSuccess)
            {
                let Strategy=[]
                
                result.Data.forEach((result,index)=>{
                    let SD={
                        Index:index,
                        CMP:result.CMP === "Any" ? 5:result.CMP === "Above" ? 1 :result.CMP === "Below" ? 2:result.CMP === "Between" ? 4:3,
                        SelectedCMP:result.CMP === "Any" ? null:result.CMP === "Above" ? 1 :result.CMP === "Below" ? 2:result.CMP === "Between" ? 4:3,
                        CallType:result.CallType === 3 ? 1 :result.CallType,
                        IsCMPDisabled:result.CallType === 3 ? false : true,
                        Symbol:"",
                        ExpiryDate:null,
                        TriggerMin:"",
                        TriggerMax:"",
                        Target1:"",
                        Target2:"",
                        Target3:"",
                        Stoploss1:"",
                        Stoploss2:"",
                        Stoploss3:"",
                        InvestmentAmt:"",
                        PackageTypeId:null,
                        TargetStoplossCount:1
                    }
                    Strategy.push(SD)
                })
                this.setState({StrategyDetails:Strategy},()=>{
                    console.log('SD Result',this.state.StrategyDetails)
                })
            }
            else
            {
                verbose(false,"Details Not Fetched",result.DisplayMsg)
            }
        })
    }

    ChangePackageSearchText=(e)=>{
        this.setState({PackageSearchText:e})
    }

    onSimilarPackageSelected=(id)=>{
        
        let temp=this.state.SelectedPackages
        if(temp.includes(id))
        {
            let indx=temp.indexOf(id)
            temp.splice(indx,1)
        }
        else
        {
            temp.push(id)
            
        }
        this.setState({SelectedPackages:temp})
       
    }

    EditLegs=(index,Type,val)=>{
        let Temp=this.state.StrategyDetails
        switch(Type)
        {
            case 1:
                Temp[index].CallType = val
                break;

            case 2:
                Temp[index].Symbol = val
                break;

            case 3:
                Temp[index].SelectedCMP = val
                break;

            case 4:
                Temp[index].TriggerMin = val
                break;

            case 5:
                Temp[index].TriggerMax = val
                break;

            case 6:
                Temp[index].Target1 = val
                break;
            
            case 7:
                 Temp[index].Stoploss1 = val
                 break;
    
            case 8:
                Temp[index].Target2 = val
                break;
    
            case 9:
                Temp[index].Stoploss2 = val
                break;
    
            case 10:
                Temp[index].Target3 = val
                break;
    
            case 11:
                Temp[index].Stoploss3 = val
                break;
            
            case 12:
                Temp[index].InvestmentAmt = val
                break;

            case 13:
                Temp[index].TargetStoplossCount = val
                break;

            case 14:{
                Temp[index].ExpiryDate = val
                break;
            }
            
            default:
                break;
        }

        this.setState({StrategyDetails:Temp})
    }

    ResetPackages=()=>{
        this.setState({SelectedPackages:1})
        this.setState({PackageSearchText:""})
        this.setState({SelectedBasePackageId:null})
        this.setState({SelectedMarketSegmentId:null})
        this.setState({SelectedOwnerId:null})
        this.setState({SelectedPackages:[]})
        this.setState({SelectedPackageIndex:[]})
        this.setState({SimilarPackages:[]})
        this.setState({SelectedLegs:0})
        this.setState({SelectedDuration:null})
        this.setState({Durations:[]})
        this.setState({Exchanges:[]})
        this.setState({SelectedExchange:null})
        this.setState({StrategyDetails:[]},()=>{
            if(this.state.IsQuickAddCall)
            {
                this.AddStrategyQuickAddCall()
            }
        })
    }

    AddCall=()=>{
        const {SelectedMarketSegmentId,SelectedDuration}=this.state
        let payload=[]
        
        this.state.SelectedPackages.forEach( (result,index) => {
          let Legs=[];
          this.state.StrategyDetails.forEach((result,index)=>{
                Legs.push(
                    {
                        "MasterScripCode": null,
                        "TipActiveDate": null,
                        "TipEndDate": null,
                        "Leg":index ,
                        "MarketExchangeCode": this.state.SelectedExchange,
                        "MarketSegmentId": this.state.SelectedMarketSegmentId,
                        "Symbol": result.Symbol,
                        "Derivative": SelectedMarketSegmentId === 1 ? "EQ":SelectedMarketSegmentId === 2 ||SelectedMarketSegmentId === 10 || SelectedMarketSegmentId === 4 ? "FUT":"CE",
                        "ExpiryDate": this.state.SelectedMarketSegmentId !== 1 ? result.ExpiryDate:null,
                        "StrikePrice": null,// later
                        "TipId": 0,
                        "ReportId": null,
                        "Desc": "",
                        "Target1": result.Target1,
                        "StopLoss1": result.Stoploss1,
                        "Target2": result.TargetStoplossCount > 1 && result.TargetStoplossCount <= 3 ? result.Target2:null  ,
                        "Target3": result.TargetStoplossCount > 3 ? result.Target3:null,
                        "StopLoss2": result.TargetStoplossCount > 1 && result.TargetStoplossCount <= 3 ? result.StopLoss2:null,
                        "StopLoss3": result.TargetStoplossCount > 3 ? result.Stoploss3:null,
                        "CallType": result.CallType,
                        "TipTypeDurationId":SelectedDuration ,
                        "TipTypeDurationOther": 0,
                        "TriggerMinValue":  result.SelectedCMP === 1 || result.SelectedCMP === 4  ? result.TriggerMin:0,
                        "TriggerMaxValue":  result.SelectedCMP === 2 || result.SelectedCMP === 4  ? result.TriggerMax:999999999,
                        "BookProfitTarget1": null,
                        "BookProfitTarget2": null,
                        "BookProfitTarget3": null,
                        "BookProfitTargetAmt1": null,
                        "BookProfitTargetAmt2": null,
                        "BookProfitTargetAmt3": null,
                        "ExitValue": null,
                        "IsStopCallRequest": null,
                        "IsDayEndStopLossRequested": null,
                        "IsActive": null,
                        "InvestmentSizeEq": SelectedMarketSegmentId === 1 ? result.InvestmentAmt : null ,
                        "InvestmentSizeLot": SelectedMarketSegmentId !== 1 ? result.InvestmentAmt : null,
                        "IsLot": 0,
                        "StartegyId": 1,//
                        "CmpId": result.SelectedCMP,
                        "TargetNetProfit": 0,
                        "TargetNetLoss": 0
                    }
                )
          })
          console.log("Legs Payload",Legs)
            payload.push(
                {
                    "IsEdit": false,
                    "ParentTipId": 0,
                    "PackageId": result,
                    "ForOwnerId": this.state.SelectedOwnerId,//
                    "CallPrefix": "",
                    "CallReports": null,
                    "Legs": Legs
                }
        
           )
           
        })
        add_call(this.props.loginState.AuthHeader,payload).then(result=>{
            console.log("Add call Result",result)
            if(result.IsSuccess)
            {
                verbose(true,"Call Added","Call Added Successfully")
                this.props.navigation.navigate('Home')
            }
            else
            {
                verbose(false,"Error",result.DisplayMsg)
            }
        })
        
    }
           

   

    render()
    {
        let ShowExchanges=this.state.Exchanges.map(result => {
            return(
                <Picker.Item key={result} value={result} label={result} />
            )
        })

        let ShowStrategy=this.state.Strategy.map(result => {
            return(
                <Picker.Item key={result.Id} value={result.Id} label={result.Name} />
            )
        })

        let ShowStrategyDurations=this.state.Durations.map(result => {
            return(
                <Picker.Item key={result.Id} label={result.Name} value={result.Id} />
            )
        })

        let ShowLegs=this.state.StrategyDetails.map((result,index)=>{
            return(
                <TouchableOpacity onPress={()=>this.setState({SelectedLegs:index})} style={{width:'23%'}}>
                    <Card style={{width:'100%',height:50,borderLeftWidth:5,borderColor:`${this.state.SelectedLegs === index ? "#16d39a":"grey"}`,JustifyContent:'center',alignItems:'center',elevation:5,borderRadius:5}}>
                        <NormalText style={{marginBottom:0,fontSize:14}}>LEG {index + 1}</NormalText>
                    </Card>
                </TouchableOpacity>
            )
        })
        
        let ShowPackages=this.state.Packages.map((result,index) => {
            return(
                result.PackageName.includes(this.state.PackageSearchText) ?
                <TouchableOpacity style={{width:'100%'}} onPress={()=>this.onPackageSelected(result.PackageId,index,result.TipDurationId,result.ForExchanges,result.MarketSegmentId,result.SuperOwner)}>
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

        let ShowSimilarPackages=this.state.SimilarPackages.map((result,index)=>{
         return(
            result.PackageName.includes(this.state.PackageSearchText) ?
            <TouchableOpacity style={{width:'100%'}} onPress={()=>this.onSimilarPackageSelected(result.PackageId)}>
                <View style={{flexDirection:'row',width:'100%',padding:5}}>
                <NormalText style={{width:'85%',color:`${this.state.SelectedPackages.includes(result.PackageId) ? 'grey':'black'}`,marginBottom:0,fontSize:14}}>{result.PackageName}</NormalText>
                    <View style={{width:'15%',alignItems:'center'}}>
                        {this.state.SelectedPackages.includes(result.PackageId) ? 
                        <FontAwesome name="check" size={15} color="grey" />:null}
                    </View>
                </View>
            </TouchableOpacity>
            :null
            )
        })

        return(
            <Container style={styles.CustomContainer}>
                <NavigationEvents onDidFocus={()=> this.onAddCallInit()}/>
                {!this.state.IsQuickAddCall && this.state.StrategyDetails.length > 1 ? 
                <View style={{width:'100%',height:65,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                    {ShowLegs}
                </View>:null}

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
                                               {
                                                this.state.SimilarPackages.length === 0 ?
                                                ShowPackages:ShowSimilarPackages
                                               }
                                            </ScrollView>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly'}}>
                                            <TouchableOpacity onPress={()=>this.ResetPackages()} style={{width:'40%'}}>
                                                <CustomButton style={{width:'100%'}}>
                                                    <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Reset</NormalText>
                                                </CustomButton>
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity style={{width:'40%'}}>
                                                <CustomButton style={{width:'100%'}}>
                                                    <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Submit</NormalText>
                                                </CustomButton>
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>
                                    }    
                            </Card>

                            <View style={styles.LegsContainer}>
                                {this.state.Exchanges.length > 1 ?
                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Exchanges</NormalText>
                                    <View style={styles.TextInputContainer}>
                                        <Picker selectedValue={this.state.SelectedExchange} onValueChange={(val)=>this.setState({SelectedExchange:val},()=> console.log(this.state.SelectedExchange))}>
                                            {ShowExchanges}           
                                        </Picker>
                                    </View>
                                </Card>  :null}

                                {this.state.Strategy.length > 1 ?
                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Strategy</NormalText>
                                    <View style={styles.TextInputContainer}>
                                        <Picker selectedValue={this.state.SelectedStrategy} onValueChange={(val)=>this.setState({SelectedStrategy:val},()=>this.GetStrategyDetails(val,this.state.SelectedPackages[0],this.state.SelectedOwnerId))}>
                                            {ShowStrategy}           
                                        </Picker>
                                    </View>
                                </Card>  :null}
                                
                                <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                                    <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Duration</NormalText>
                                    <View style={styles.TextInputContainer}>
                                        <Picker selectedValue={this.state.SelectedDuration} onValueChange={(val)=>this.setState({SelectedDuration:val})}>
                                            {ShowStrategyDurations}
                                        </Picker>
                                    </View>
                                </Card>   
                                {this.state.StrategyDetails.length > 0  ?
                                    
                                    <Legs 
                                        AuthHeader={this.props.loginState.AuthHeader}
                                        Index={this.state.SelectedLegs} 
                                        CallType={this.state.StrategyDetails[this.state.SelectedLegs].CallType}
                                        Symbol={this.state.StrategyDetails[this.state.SelectedLegs].Symbol}
                                        LegsEdit={this.EditLegs} 
                                        CMP={this.state.StrategyDetails[this.state.SelectedLegs].CMP}
                                        SelectedCMP={this.state.StrategyDetails[this.state.SelectedLegs].SelectedCMP}
                                        TriggerMin={this.state.StrategyDetails[this.state.SelectedLegs].TriggerMin}
                                        TriggerMax={this.state.StrategyDetails[this.state.SelectedLegs].TriggerMax}
                                        TargetStoplossCount={this.state.StrategyDetails[this.state.SelectedLegs].TargetStoplossCount}
                                        Target1={this.state.StrategyDetails[this.state.SelectedLegs].Target1}
                                        Target2={this.state.StrategyDetails[this.state.SelectedLegs].Target2}
                                        Target3={this.state.StrategyDetails[this.state.SelectedLegs].Target3}
                                        Stoploss1={this.state.StrategyDetails[this.state.SelectedLegs].Stoploss1}
                                        Stoploss2={this.state.StrategyDetails[this.state.SelectedLegs].Stoploss2}
                                        Stoploss3={this.state.StrategyDetails[this.state.SelectedLegs].Stoploss3}
                                        InvestmentAmt={this.state.StrategyDetails[this.state.SelectedLegs].InvestmentAmt}
                                        MarketSegmentId={this.state.SelectedMarketSegmentId}
                                        Exchange={this.state.SelectedExchange}
                                        ExpiryDate={this.state.StrategyDetails[this.state.SelectedLegs].ExpiryDate}
                                        IsCMPDisabled={this.state.StrategyDetails[this.state.SelectedLegs].IsCMPDisabled} />  
                                :null}
                            </View>
                            <View style={styles.CustomButtonContainer}>
                                <TouchableOpacity onPress={()=>this.AddCall()}>
                                    <CustomButton style={{width:200}}>
                                        <NormalText style={{marginBottom:0,alignItems:"center",justifyContent:"center",color:'white',fontSize:14}}>Add Call</NormalText>
                                    </CustomButton>
                                </TouchableOpacity>
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
    },
    CustomButtonContainer:{
        width:'100%',
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