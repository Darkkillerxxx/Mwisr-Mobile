import React from 'react'
import {View,StyleSheet,ScrollView,TouchableOpacity,TextInput,FlatList,Picker,Switch} from 'react-native'
import {verbose, get_symbol,get_symbol_details} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import NormalText from '../../Components/NormalText'
import MwisrSelector from '../../Components/MwisrSelector'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import { RadioButton } from 'react-native-paper';
import RBContainer from '../../Components/RBContainer'
import moment from "moment";

class Legs extends React.Component{
    constructor(){
        super()
        this.state={
            Symbol:"",
            ReceivedSymbols:[],
            SymbolDetails:[],
            ReceivedDates:[]
        }
        
    }

    ChangeCallTypes=(value)=>{
        if(value === 1)
        {
            this.props.LegsEdit(this.props.Index,1,2)
        }
        else
        {
            this.props.LegsEdit(this.props.Index,1,1)
        }
    }

    ExpiryDateForAddCall=(date)=>{
        let tempDate=date.split('-')
        let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let month=""
        months.forEach((element,index) => {
          if(element === tempDate[1])
          {
            month=index;
          }
          
        });
        // console.log("373",`20${tempDate[2]}-${month+1 < 10 ? `0${month+1}`:`${month+1}`}-${tempDate[0]}`)
           return `20${tempDate[2]}-${month+1 < 10 ? `0${month+1}`:`${month+1}`}-${tempDate[0]}`
      }

      ExpiryDateToNormal=(dateArray)=>{
        let TempExpiry=[]
        dateArray.forEach(element=>{
          let arr=element.split("-")
          let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
          TempExpiry.push(`${arr[2]}-${months[parseInt(arr[1])-1]}-${arr[0].substring(2)}`)
        })

        return TempExpiry
    }

    GetSymbolDetails=()=>{
        
        let Det_Payload={
            exchanges:this.props.Exchange,
            segmentIds:this.props.MarketSegmentId,
            symbolLike:this.state.Symbol
        }
        get_symbol_details(this.props.AuthHeader,Det_Payload).then(result => {
            if(result.length > 0)
            {
                let TempExpiry=[];
                result.forEach(element=>{
                   TempExpiry.push(this.ExpiryDateForAddCall(element.ExpiryDate))
                 })
                  
                 let sortedArray  = TempExpiry.sort((a,b) => moment(a) - moment(b))
                 TempExpiry=this.ExpiryDateToNormal(sortedArray)
                 this.setState({ReceivedDates:TempExpiry},()=>{
                     this.onExpiryChange(this.state.ReceivedDates[0])
                 })
            }
        })
    }

    onSymbolChange=(e)=>{
        this.setState({Symbol:e},()=>{
            if(this.state.Symbol.length > 2)
            {
                let payload={
                    exchanges:this.props.Exchange,
                    segmentIds:this.props.MarketSegmentId,
                    symbolLike:this.state.Symbol
                }
                get_symbol(this.props.AuthHeader,payload).then(result => {
                    this.setState({ReceivedSymbols:result},()=>{
                        
                        if(this.props.MarketSegmentId !== 1)
                        {
                            this.GetSymbolDetails()
                        }
                    })
                })
            }
        })
        this.props.LegsEdit(this.props.Index,2,e)
    }

    onCMPChange=(value)=>
    {
        this.props.LegsEdit(this.props.Index,3,value)
    }

    onTriggerMinChange=(e)=>{
        this.props.LegsEdit(this.props.Index,4,e)
    }

    onTriggerMaxChange=(e)=>{
        this.props.LegsEdit(this.props.Index,5,e)
    }

    onTarget1Change=(e)=>{
        this.props.LegsEdit(this.props.Index,6,e)
    }

    
    onTarget2Change=(e)=>{
        this.props.LegsEdit(this.props.Index,8,e)
    }

    
    onTarget3Change=(e)=>{
        this.props.LegsEdit(this.props.Index,10,e)
    }

    onStoploss1Change=(e)=>{
        this.props.LegsEdit(this.props.Index,7,e)
    }

    
    onStoploss2Change=(e)=>{
        this.props.LegsEdit(this.props.Index,9,e)
    }

    
    onStoploss3Change=(e)=>{
        this.props.LegsEdit(this.props.Index,11,e)
    }

    onInvestmentAmtChange=(e)=>{
        this.props.LegsEdit(this.props.Index,12,e)
    }

    onTSCountChange=(val)=>{
        if(val >= 1 && val < 4)
        {
            this.props.LegsEdit(this.props.Index,13,val)    
        }
    }

    onExpiryChange=(val)=>{
         this.props.LegsEdit(this.props.Index,14,val)    
    }

    ApplySuggestions=(val)=>{
        this.props.LegsEdit(this.props.Index,2,val)
        this.setState({Symbol:val},()=>{
            this.GetSymbolDetails()    
        })
        this.setState({ReceivedSymbols:[]})
    }

    render()
    {
        let ShowSuggestions=this.state.ReceivedSymbols.map((result,index) => {
            return(
                <TouchableOpacity onPress={()=>this.ApplySuggestions(result.Symbol)}>
                    <NormalText style={{marginBottom:0,fontSize:12,marginVertical:5}}>{result.Symbol}</NormalText>
                </TouchableOpacity>
            )
        })

        let ShowExpiry=this.state.ReceivedDates.map(result => {
            return(
                <Picker.Item key={result} label={result} value={result}/>
            )
        })

        const {CMP,SelectedCMP,TriggerMin,TriggerMax,TargetStoplossCount,Target1,Target2,Target3,Stoploss1,Stoploss2,Stoploss3,InvestmentAmt,MarketSegmentId} = this.props
        return(
            <>
                <Card style={styles.FlexContainer}>

                    <View style={{width:'33%',alignItems:'flex-end'}}>
                        <BoldText style={{marginVertical:0}}>BUY</BoldText>
                    </View>

                    <View style={{width:'33%',alignItems:'center'}}>
                         <Switch
                             trackColor={{ false: "#767577", true: "#81b0ff" }}
                             thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                             ios_backgroundColor="#3e3e3e"
                             onValueChange={()=>this.ChangeCallTypes(this.props.CallType)}
                             value={this.props.CallType === 1 ? false : true}
                             disabled={this.props.IsCMPDisabled ? true:false }
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
                           <TextInput value={this.props.Symbol} onChangeText={this.onSymbolChange}/>
                       </View>
                     {this.state.ReceivedSymbols.length > 0 ?
                        <> 
                            <NormalText style={{alignSelf:'flex-start',marginBottom:5,marginTop:5}}>Suggestions</NormalText>
                           
                                <View style={{width:'100%',height:100,alignItems:'flex-start',marginTop:5}}>
                                    <ScrollView nestedScrollEnabled={true} style={{width:'100%',height:100}}>
                                        {ShowSuggestions}
                                    </ScrollView>   
                                </View>
                        </>:null}
        
                   </View>
                   {MarketSegmentId !== 1 ? 
                   <View style={styles.SelectSymbolContainer}>
                       <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select Expiry Date</NormalText>
                       <View style={styles.TextInputContainer}>
                           <Picker selectedValue={this.props.ExpiryDate} onValueChange={(val)=>this.onExpiryChange(val)}>
                            {ShowExpiry}
                           </Picker>
                       </View>
                   </View>:null}

                   {MarketSegmentId === 9 ||MarketSegmentId === 11 || MarketSegmentId === 12 ?
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
                   </View>:null}
               </Card>

               <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                   <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Select CMP</NormalText>
                   <View style={styles.FlexContainer}>
                       <RadioButton.Group onValueChange={this.onCMPChange}>
                           <RBContainer style={styles.CustomRadioButton}>
                               <RadioButton color="black" uncheckedColor="black" value={3} status={SelectedCMP === 3 ? 'checked':'unchecked'} disabled={CMP === 5 || CMP === 3 ? false : true} />
                               <NormalText style={{marginBottom:0,color:'black'}}>At CMP</NormalText>
                           </RBContainer>
                           <RBContainer style={styles.CustomRadioButton}>
                               <RadioButton color="black" uncheckedColor="black" value={1} status={SelectedCMP === 1 ? 'checked':'unchecked'} disabled={CMP === 5 || CMP === 1 ? false : true}/>
                               <NormalText style={{marginBottom:0,color:'black'}}>Above</NormalText>
                           </RBContainer>
                           <RBContainer style={styles.CustomRadioButton}>
                               <RadioButton color="black" uncheckedColor="black" value={2} status={SelectedCMP === 2 ? 'checked':'unchecked'} disabled={CMP === 5 || CMP === 2 ? false : true}/>
                               <NormalText style={{marginBottom:0,color:'black'}}>Below</NormalText>
                           </RBContainer>
                           <RBContainer style={styles.CustomRadioButton}>
                               <RadioButton color="black" uncheckedColor="black" value={4} status={SelectedCMP === 4 ? 'checked':'unchecked'} disabled={CMP === 5 || CMP === 4 ? false : true}/>
                               <NormalText style={{marginBottom:0,color:'black'}}>Between</NormalText>
                           </RBContainer>
                       </RadioButton.Group>
                   </View>
               </Card>

                {CMP !== 3 ? 
               <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                   <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Trigger</NormalText>
                       <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                           <View style={{width:'45%',alignItems:'flex-start'}}>
                               <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Minimum</NormalText>
                               <View style={styles.TextInputContainer}>
                                   <TextInput onChangeText={this.onTriggerMinChange} style={{backgroundColor:`${SelectedCMP === 1 || SelectedCMP === 4 ? 'white':'#EAEBF0'}`,borderRadius:10}}  keyboardType='numeric' value={TriggerMin} editable={SelectedCMP === 1 || SelectedCMP === 4 ? true:false} />
                               </View>
                          </View>
                           <View style={{width:'45%'}}>
                               <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Maximum</NormalText>
                               <View style={styles.TextInputContainer}>
                                   <TextInput onChangeText={this.onTriggerMaxChange} style={{backgroundColor:`${SelectedCMP === 2 || SelectedCMP === 4 ? 'white':'#EAEBF0'}`,borderRadius:10}} keyboardType='numeric' value={TriggerMax} editable={SelectedCMP === 2 || SelectedCMP === 4 ? true:false}/>
                               </View>
                           </View>
                       </View>
               </Card>:null}

               <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                   <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>{`Target & Stoploss`}</NormalText>
                    <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Target 1</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Target1} keyboardType="numeric" onChangeText={this.onTarget1Change} />
                            </View>
                        </View>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>StopLoss 1</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Stoploss1} keyboardType="numeric" onChangeText={this.onStoploss1Change}/>
                            </View>
                        </View>
                    </View>

                    {TargetStoplossCount === 2 || TargetStoplossCount === 3  ? 
                    <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Target 2</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Target2} keyboardType="numeric" onChangeText={this.onTarget2Change}/>
                            </View>
                        </View>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>StopLoss 2</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Stoploss2} keyboardType="numeric" onChangeText={this.onStoploss2Change}/>
                            </View>
                        </View>
                    </View>:null}

                    {TargetStoplossCount === 3 ?    
                    <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Target 3</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Target3} keyboardType="numeric" onChangeText={this.onTarget3Change}/>
                            </View>
                        </View>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>StopLoss 3</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Stoploss3} keyboardType="numeric" onChangeText={this.onStoploss3Change}/>
                            </View>
                        </View>
                    </View>:null}
               </Card>

                <View style={{width:'100%',flexDirection:'row',justifyContent:'center',marginTop:-17,elevation:5}}>
                        {TargetStoplossCount > 1 ? 
                        <View style={{width:'50%',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>this.onTSCountChange(TargetStoplossCount - 1)} >
                                <View style={styles.CePeSelected}>
                                    <NormalText style={styles.CePeSelectedText}>-</NormalText>
                                </View>
                            </TouchableOpacity>
                        </View>:null}
                        <View style={{width:'50%',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>this.onTSCountChange(TargetStoplossCount + 1)}>
                                <View style={styles.CePeSelected}>
                                    <NormalText style={styles.CePeSelectedText}>+</NormalText>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>

               <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                   <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Investment Amount</NormalText>
                   <View style={styles.TextInputContainer}>
                      <TextInput value={InvestmentAmt} keyboardType="numeric" onChangeText={this.onInvestmentAmtChange}/>
                   </View>
               </Card>

            </>
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

export default Legs