import React from 'react'
import { View,Text,AsyncStorage,Picker,StyleSheet,TextInput, TouchableOpacity,Switch} from 'react-native';
import { connect }from 'react-redux'
import {login_call, GetAuthHeader,CheckWhereToGo} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import {Checkbox} from 'react-native-paper'
import Container from '../../Components/Container'
import StepIndicator from 'react-native-step-indicator';
import Card from '../../Components/Card.js';
import BoldText from '../../Components/BoldText.js';
import NormalText from '../../Components/NormalText.js';
import RBContainer from '../../Components/RBContainer.js';
import CustomButton from '../../Components/Button.js';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import RadioBtn from '../../Components/RadioBtn'
import {get_user_owners,get_strategy,get_exchanges,upsert_package} from '../../Utils/api'
import FlashMessage from '../../Components/FlashMessage'


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

const AddStep = ["Package Name","Package Details","Package Pricing"];
class AddPackage extends React.Component{
    constructor()
    {
        super();
        this.state={
            AddPackageState:0,
            PackageName:"",
            PackageDescription:"",
            SelectedOwnerId:"",
            ErrorCode:null,
            SegmentType:[
                {
                    "SegmentId": 1,
                    "SegmentName": "Equity"
                },
                {
                    "SegmentId": 2,
                    "SegmentName": "CommodityFutures"
                },
                {
                    "SegmentId": 4,
                    "SegmentName": "CurrencyFutures"
                },
                {
                    "SegmentId": 9,
                    "SegmentName": "EquityOptions"
                },
                {
                    "SegmentId": 10,
                    "SegmentName": "EquityFutures"
                },
                {
                    "SegmentId": 11,
                    "SegmentName": "CommodityOptions"
                },
                {
                    "SegmentId": 12,
                    "SegmentName": "CurrencyOptions"
                }
            ],
            SelectedSegmentId:null,
            isPaid:false,
            PaidList:[{
                PriceType: "Per Call",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per Day",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per 3 Day",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per 7 Day",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per 15 Day",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per Month",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per 3 Month",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per 6 Month",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per 9 Month",
                B2BPrice: 0,
                B2CPrice: 0
              },
              {
                PriceType: "Per Year",
                B2BPrice: 0,
                B2CPrice: 0
              }],
              UserOwners:[],
              SelectedUser:null,
              Strategy:[],
              Exchanges:[],
              SelectedExchanges:[],
              SelectedStrategyId:1,
              ShowFlashMessage:false
        }
    }

    componentDidMount()
    {
        const {AuthHeader} = this.props.loginState
        get_user_owners(AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({UserOwners:result.Data},()=>{
                    // console.log(this.state.UserOwners)
                })
            }
        })

        get_strategy(AuthHeader).then(result => {
            if(result.IsSuccess)
            {
                this.setState({Strategy:result.Data})
            }
        })

        // console.log(this.props.loginState)
    }

    Validation=()=>{
        if(this.state.AddPackageState === 0)
        {
            if(this.state.PackageName.length === 0){
                this.setState({ErrorCode:1})
                return false
            }
            else
            {
                this.setState({ErrorCode:null})
                return true
            }
        }
        else if(this.state.AddPackageState === 1)
        {
           if(this.state.SelectedSegmentId === null)
           {
               this.setState({ErrorCode:2})
               return false
           }
           else if(this.state.SelectedExchanges.length === 0)
           {
               this.setState({ErrorCode:3})
               return false
           }
           return true
        }
    }

    

    onSubmit=()=>{
        if(this.state.AddPackageState !== 2)
        {
            if(this.Validation())
            {
                this.setState({AddPackageState:this.state.AddPackageState + 1})
            }
        }
        else
        {
            const {UserId,AuthHeader}=this.props.loginState
            let payload={
                "ForOwnerId":this.state.SelectedOwnerId === "" ? UserId:this.state.SelectedOwnerId,
                "PackageId": 0,
                "PackageName": this.state.PackageName,
                "PackageDescription": this.state.PackageDescription,
                "PackagePrices": this.state.PaidList,
                "IsDefault": false,
                "IsPublic": false,
                "IsPaid": this.state.isPaid,
                "IsInternal": false,
                "MarketSegmentId": this.state.SelectedSegmentId,
                "ForExchanges": this.state.SelectedExchanges.toString(),
                "TipDurationIds": this.state.SelectedStrategyId,
                "CapitalRequired": 100000,
                "CallsPerMonth": 150,
                "MaxSubscription": null,
                "ShareInWealthyfox": false
            }

            console.log(payload)
            upsert_package(AuthHeader,payload).then(result=>{
                if(result.IsSuccess)
                {
                    this.setState({ShowFlashMessage:true},()=>{
                        setTimeout(()=>{
                            this.setState({ShowFlashMessage:false})
                        },3000)
                    })
                }
            })
        }
    }

    onPriceChange=(index,id,value)=>{
        let TempPaidPrice=this.state.PaidList
        if(id === 1)
        {
            TempPaidPrice[index].B2BPrice=value
        }
        else
        {
            TempPaidPrice[index].B2BPrice=value
        }

        this.setState({PaidList:TempPaidPrice},()=>{
            // console.log(this.state.PaidList)
        })
    }

    FetchExchages=(SegmentId)=>{
        let TempExhanges=[]
        get_exchanges(this.props.loginState.AuthHeader,{segmentId:SegmentId}).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Exchanges:result.Data},()=>{
                    console.log(this.state.Exchanges)
                })
            }
        })
    }

    SelectSegment=(SegmentId)=>{
        this.setState({SelectedSegmentId:SegmentId},()=>{
            this.FetchExchages(this.state.SelectedSegmentId)
        })
    }

    SelectExchange=(Exchange)=>{
        let TempExchanges=this.state.SelectedExchanges
        if(!TempExchanges.includes(Exchange))
        {
            TempExchanges.push(Exchange)
            this.setState({SelectedExchanges:TempExchanges})
            return
        }

        const index = TempExchanges.indexOf(Exchange);
        if (index > -1) {
            TempExchanges.splice(index, 1);
        }

        this.setState({SelectExchange:TempExchanges})
        
    }

    render()
    {

     let ShowSegmentType=this.state.SegmentType.map((result)=>{
        return(
            <TouchableOpacity key={result.SegmentId} style={{width:'100%',marginHorizontal:10,marginVertical:2}} onPress={()=>this.SelectSegment(result.SegmentId)}>
                <RadioBtn Selected={this.state.SelectedSegmentId === result.SegmentId}>
                    <NormalText style={{marginBottom:0}}>{result.SegmentName}</NormalText>
                </RadioBtn>
            </TouchableOpacity>  
        )
     })  

     let ShowOwners=this.state.UserOwners.map(result=>{
         return(
            <Picker.Item key={result.OwnerId} label={result.OwnerName} value={result.OwnerName}/>
         )
     })

     let ShowStrategy=this.state.Strategy.map(result=>{
         return(
            <Picker.Item key={result.Id} label={result.Name} value={result.Id}/>
         )
     })

     let ShowExchanges=this.state.Exchanges.map(result=>{
         return(
            <View key={result.MarketExchangeCode} style={{flexDirection:'row',alignItems:'center',width:'18%',justifyContent:'space-around',marginRight:10}}>
                <Checkbox
                    status={this.state.SelectedExchanges.includes(result.MarketExchangeCode) ? "checked":'unchecked'}
                    onPress={() => this.SelectExchange(result.MarketExchangeCode)}
                />
                <NormalText style={{marginBottom:0,marginLeft:5}}>{result.MarketExchangeCode}</NormalText>   
            </View>
         )
     })

     
     
     let ShowPaidPrice=this.state.PaidList.map((result,index)=>{
        return(
            <View key={index} style={{marginVertical:5,alignItems:'center'}}>
                <NormalText>{result.PriceType}</NormalText>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                    <TextInput keyboardType='numeric' onChangeText={(e)=>this.onPriceChange(index,1,e)} placeholder={"B2B Price"} style={style.PaidTextInputs} />
                    <TextInput keyboardType='numeric' onChangeText={(e)=>this.onPriceChange(index,2,e)} placeholder={"B2C Price"} style={style.PaidTextInputs} />
                </View>
            </View>
        )
     })

        return(
            <Container style={style.AddPackageContainer}>
                <FlashMessage 
                 color={"#16d39a"}
                 Message={"Package Successfully Created !!!"}
                 Icon={"check"}
                 IconSize={30}
                 ShowMessage={this.state.ShowFlashMessage}
                 />

                <ScrollView style={{width:'100%',height:'80%'}}> 
                <View style={style.StepIndicatorContainer}>
                   <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.state.AddPackageState}
                    labels={AddStep}
                    stepCount={3}
                   />
                </View>
                {this.state.AddPackageState === 0 ? 
                <View style={style.AddPackageContent}>
                    <Card style={style.CustomCard}>
                        <NormalText style={style.HeadingText}>Select Owner</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <Picker selectedValue={null} onValueChange={(val)=>this.setState({SelectedOwnerId:val})} placeholder="Research Types" style={style.CustomPicker}>
                                <Picker.Item label="Own" value=""/>
                                {ShowOwners}
                            </Picker>
                        </View>
                    </Card>

                    <Card style={style.CustomCard}>
                        {this.state.ErrorCode === 1 ? 
                            <NormalText style={{...style.HeadingText,color:'red'}}>Package Name Cannot Be Empty</NormalText>  
                            :
                            <NormalText style={style.HeadingText}>Package Name</NormalText>    
                        }
                        
                        <TextInput onChangeText={(e)=>this.setState({PackageName:e})} placeholder={"Enter Package Name"} style={style.CustomTextInputs} />
                    </Card>
                </View>:
                this.state.AddPackageState === 1 ? 
                <View style={style.AddPackageContent}>
                    <Card style={style.CustomCard}>
                        <NormalText style={this.state.ErrorCode === 2 ?  style.HeadingTextError:style.HeadingText}>{this.state.ErrorCode === 2 ? "Need To Select One Segment":"Select Segment Type"} </NormalText>
                        <View style={style.SegmentContainer}>
                            {ShowSegmentType}
                        </View>
                    </Card>
   
                    {this.state.SelectedSegmentId !== null ? 
                        <Card style={style.CustomCard}>
                            <NormalText style={this.state.ErrorCode === 3 ?  style.HeadingTextError:style.HeadingText}>{this.state.ErrorCode === 3 ?  "Need To Select Atleast One Exchange":"Select Exchange"}</NormalText>
                            <View style={{flexDirection:'row',width:'100%'}}>
                               {ShowExchanges}
                            </View>
                        </Card>
                    :null}
                    

                    <Card  style={style.CustomCard}>
                        <NormalText style={style.HeadingText}>Select Default Duration</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={style.CustomPicker}>
                                {ShowStrategy}
                            </Picker>
                        </View>
                    </Card>

                      <Card  style={style.CustomCard}>
                        <NormalText style={style.HeadingText}>Package Description</NormalText>
                        <TextInput multiline={true} numberOfLines={4} onChangeText={(e)=>this.setState({PackageDescription:e})} placeholder={"Enter Pakage Description"} style={style.CustomTextInputs} />
                    </Card>
                </View>:
                <View style={style.AddPackageContent}>
                    <Card style={style.CustomCard}>
                        <NormalText style={style.HeadingText}>Package Pricing</NormalText>
                        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                            <NormalText style={{fontSize:14,marginBottom:0}}>Is it a Package Paid ?</NormalText>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={ true ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>this.setState({isPaid:!this.state.isPaid})}
                                value={this.state.isPaid}
                            />
                        </View>

                        {this.state.isPaid ? 
                            <View style={{widht:'100%',marginTop:25}}>
                               {ShowPaidPrice}
                            </View>
                        :null}
                      
                    </Card>
                </View>
               }
                 </ScrollView>
                <View style={{flex:1,flexDirection:'row',alignSelf:'stretch',alignItems:'center',justifyContent:'center',height:50}}>
                    <TouchableOpacity onPress={()=>this.onSubmit()}>
                        <CustomButton style={{width:150}}>
                            <NormalText style={{marginBottom:0,color:'white',fontSize:15}}>Proceed</NormalText>
                        </CustomButton>
                    </TouchableOpacity>
                </View>
               
            </Container>
        )
    }
}

const style=StyleSheet.create({
    AddPackageContainer:{
        backgroundColor:'#FAFAFA',
        alignItems:'center',
        justifyContent:'flex-start',
        padding:10
    },
    StepIndicatorContainer:{
        width:"95%"
    },
    AddPackageContent:{
        marginTop:25,
        width:'100%',
        alignItems:'center'
    },
    CustomCard:{
        borderRadius:5,
        alignItems:'flex-start',
        padding:10,
        marginVertical:5
    },
    HeadingText:{
        fontSize:16
    },
    HeadingTextError:{
        fontSize:16,
        color:'red'
    },
    CustomPicker:{
        borderRadius:20,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        marginVertical:2,
        height:30
    },
    CustomTextInputs:{
        borderRadius:10,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        height:40,
        textAlign:'center'
    },
    PaidTextInputs:{
        borderRadius:10,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'45%',
        height:40,
        textAlign:'center'
    },
    SegmentContainer:{
        width:'100%',
        alignItems:'flex-start',
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

export default connect(mapStateToProps,mapDispatchToProps)(AddPackage);