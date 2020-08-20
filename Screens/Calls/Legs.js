import React from 'react'
import {View,StyleSheet,ScrollView,TouchableOpacity,TextInput,FlatList,Picker,Switch} from 'react-native'
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

class Legs extends React.Component{
    constructor(){
        super()
        
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

    onSymbolChange=(e)=>{
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

    render()
    {
        const {CMP,SelectedCMP,TriggerMin,TriggerMax,TargetStoplossCount,Target1,Target2,Target3,Stoploss1,Stoploss2,Stoploss3,InvestmentAmt} = this.props
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

                {CMP !== 1 ? 
               <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                   <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Trigger</NormalText>
                       <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                           <View style={{width:'45%',alignItems:'flex-start'}}>
                               <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Minimum</NormalText>
                               <View style={styles.TextInputContainer}>
                                   <TextInput onChangeText={this.onTriggerMinChange} keyboardType='numeric' value={TriggerMin} editable={SelectedCMP === 1 || SelectedCMP === 4 ? true:false} />
                               </View>
                          </View>
                           <View style={{width:'45%'}}>
                               <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Maximum</NormalText>
                               <View style={styles.TextInputContainer}>
                                   <TextInput onChangeText={this.onTriggerMaxChange} keyboardType='numeric' value={TriggerMax} editable={SelectedCMP === 2 || SelectedCMP === 4 ? true:false}/>
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
                                <TextInput value={Target1} onChangeText={this.onTarget1Change} />
                            </View>
                        </View>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>StopLoss 1</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Stoploss1} onChangeText={this.onStoploss1Change}/>
                            </View>
                        </View>
                    </View>

                    {TargetStoplossCount === 2 ? 
                    <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Target 2</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Target2} onChangeText={this.onTarget2Change}/>
                            </View>
                        </View>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>StopLoss 2</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Stoploss2} onChangeText={this.onStoploss2Change}/>
                            </View>
                        </View>
                    </View>:null}

                    {TargetStoplossCount === 3 ?    
                    <View style={{...styles.FlexContainer,...{justifyContent:'space-evenly',padding:0,marginVertical:10}}}>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Target 3</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Target3} onChangeText={this.onTarget3Change}/>
                            </View>
                        </View>
                        <View style={{width:'45%'}}>
                            <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>StopLoss 3</NormalText>
                            <View style={styles.TextInputContainer}>
                                <TextInput value={Stoploss3} onChangeText={this.onStoploss3Change}/>
                            </View>
                        </View>
                    </View>:null}
               </Card>

               <Card style={{...styles.CustomCard,...{alignItems:'flex-start'}}}>
                   <NormalText style={{marginBottom:0,fontSize:14,color:'black'}}>Investment Amount</NormalText>
                   <View style={styles.TextInputContainer}>
                      <TextInput value={InvestmentAmt} onChangeText={this.onInvestmentAmtChange}/>
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