import React from 'react'
import { View,StyleSheet, ScrollView,Picker, TextInput,TouchableOpacity,Switch } from 'react-native'
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import NormalText from '../../Components/NormalText';
import { RadioButton } from 'react-native-paper';
import MwisrSelector from '../../Components/MwisrSelector'
import {get_user_owners} from '../../Utils/api'
import {NavigationEvents} from 'react-navigation'
import { connect }from 'react-redux'
import CustomButton from '../../Components/Button';
import DatePicker from 'react-native-datepicker'
import {Checkbox} from 'react-native-paper'

class AddUser extends React.Component{
    constructor()
    {
        super();
        this.state={
            Owners:[],
            SelectedOwner:null,
            SelectedUserType:2,
            FirstName:'',
            LastName:'',
            Contact:'',
            Contact1:'',
            Contact2:'',
            isTrial:false,
            Investment:null,
            Date:'23-01-2020',
            SelectedSegments:[],
            SelectedAreas:[],
            SelectedDuration:[]
        }
    }

    onSelectorChange=(id)=>{
        this.setState({SelectedUserType:id})
    }

    onInitialize=()=>{
        const {AuthHeader,IsOwner,UserId}=this.props.loginState
        get_user_owners(AuthHeader).then(result =>{
            if(result.IsSuccess)
            {
                this.setState({Owners:result.Data},()=>{
                    if(IsOwner)
                    {
                        this.setState({SelectedOwner:UserId})
                    }
                    else
                    {
                        this.setState({SelectedOwner:result.Data[0].OwnerId})
                    }
            
                })
            }
        })
    }

    SelectUnselectSegments=(Seg)=>{
        let temp=this.state.SelectedSegments;
        if(!temp.includes(Seg))
        {
            temp.push(Seg)
            this.setState({SelectedSegments:temp})
        }
        else
        {
            let index=temp.indexOf(Seg)
            if(index >= 0)
            {
                temp.splice(index,1)
                this.setState({SelectedSegments:temp})
            }
        }
    }

    SelectUnselectDurations=(Dur)=>{
        let temp=this.state.SelectedDuration;
        if(!temp.includes(Dur))
        {
            temp.push(Dur)
            this.setState({SelectedDuration:temp})
        }
        else
        {
            let index=temp.indexOf(Dur)
            if(index >= 0)
            {
                temp.splice(index,1)
                this.setState({SelectedDuration:temp})
            }
        }
    }

    SelectUnselectInterest=(Intrested)=>{
        let temp=this.state.SelectedAreas;
        if(!temp.includes(Intrested))
        {
            temp.push(Intrested)
            this.setState({SelectedAreas:temp})
        }
        else
        {
            let index=temp.indexOf(Intrested)
            if(index >= 0)
            {
                temp.splice(index,1)
                this.setState({SelectedAreas:temp})
            }
        }
    }



    render() {
        let ShowOwners=this.state.Owners.map(Owners=>{
            return(
                <Picker.Item key={Owners.OwnerId} label={Owners.OwnerName} value={Owners.OwnerId} />
            )    
        })

        const {IsOwner,UserId}=this.props.loginState
        return (
            <Container>
                <NavigationEvents onDidFocus={()=> this.onInitialize()}/>
                <ScrollView style={{width:'100%',padding:10}}>
                    <Card style={styles.AddUserCard}>
                        <NormalText style={{marginBottom:0,color:'black'}}>Select User Type</NormalText>
                        <View style={styles.UserTypesContainer}>
                           <MwisrSelector value={2} onSelect={this.onSelectorChange} Selected={this.state.SelectedUserType === 2 ? true:false} Text="Sub-Broker" />
                           <MwisrSelector value={6} onSelect={this.onSelectorChange} Selected={this.state.SelectedUserType === 6 ? true:false} Text="Analyst" />
                           <MwisrSelector value={5} onSelect={this.onSelectorChange} Selected={this.state.SelectedUserType === 5 ? true:false} Text="Partner" />
                           <MwisrSelector value={7} onSelect={this.onSelectorChange} Selected={this.state.SelectedUserType === 7 ? true:false} Text="Customer" />
                        </View>

                        <NormalText style={{marginVertical:10,color:'black'}}>Select Owner</NormalText>
                        <View style={styles.CustomPicker}>
                            <Picker selectedValue={this.state.SelectedOwner} onValueChange={(val)=>this.setState({SelectedOwner: val})}>
                                {IsOwner ? 
                                    <Picker.Item key={UserId} label="Own" value={UserId} />:null}
                                    {ShowOwners}
                            </Picker>
                        </View>

                        <NormalText style={{marginVertical:15,color:'black'}}>(*) First Name</NormalText>
                        <View style={styles.CustomTextInputs}>
                            <TextInput placeholder='First Name' onChangeText={(e)=>this.setState({FirstName:e})}  />
                        </View>

                        
                        <NormalText style={{marginVertical:15,color:'black'}}>(*) Last Name</NormalText>
                        <View style={styles.CustomTextInputs}>
                            <TextInput placeholder='Last Name'  onChangeText={(e) => this.setState({LastName:e})}/>
                        </View>

                        {this.state.SelectedUserType !== 7 ? 
                        <View style={{width:'100%'}}>
                            <NormalText style={{marginVertical:15,color:'black'}}>(*) Contact No</NormalText>
                            <View style={styles.CustomTextInputs}>
                                <TextInput placeholder='Contact No.' keyboardType='phone-pad' onChangeText={(e) => this.setState({Contact:e})}  />
                            </View>
                        </View>:
                        <View style={{width:'100%'}}>
                                <NormalText style={{marginVertical:15,color:'black'}}>(*) Contact No. 1</NormalText>
                                <View style={styles.CustomTextInputs}>
                                    <TextInput placeholder='Contact No 1' keyboardType='phone-pad' onChangeText={(e) => this.setState({Contact1:e})}  />
                                </View>

                                <NormalText style={{marginVertical:15,color:'black'}}>Contact No. 2</NormalText>
                                <View style={styles.CustomTextInputs}>
                                    <TextInput placeholder='Contact No 2' keyboardType='phone-pad' onChangeText={(e) => this.setState({Contact2:e})}  />
                                </View>

                                <NormalText style={{marginVertical:15,color:'black'}}>Is Customer on Trial ? </NormalText>
                                <View style={{alignItems:'flex-start',justifyContent:'center'}}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.isTrial ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={()=>this.setState({isTrial:!this.state.isTrial})}
                                    value={this.state.isTrial}
                                />

                                    <NormalText style={{marginVertical:15,color:'black'}}>(*) Investment Amount</NormalText>
                                    <View style={styles.CustomTextInputs}>
                                        <TextInput placeholder='Investment Amount' keyboardType='phone-pad' onChangeText={(e) => this.setState({Investment:e})}  />
                                    </View>

                                    {this.state.isTrial ? 
                                        <View style={{width:'100%'}}>
                                             <NormalText style={{marginVertical:15,color:'black'}}>(*) Effective Till Date</NormalText> 
                                             <DatePicker
                                                style={{width: '90%'}}
                                                date={this.state.Date}
                                                mode="date"
                                                placeholder="select date"
                                                format="DD-MM-YYYY"
                                                minDate="01-05-2016"
                                                maxDate="01-05-2025"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 4,
                                                    marginLeft: 0,
                                                    width:20,
                                                    height:20,
                                                    marginTop:5
                                                },
                                                dateInput: {
                                                    height: 35,
                                                    width: '100%',
                                                    marginRight: -30,
                                                    borderColor:'#CBCFD6',
                                                    borderRadius:5
                                                }
                                                }}
                                                onDateChange={(date) => this.onChangeDate(date,this.props.Package.PackageId)}
                                            />
                                        </View>:null}
                                        
                                        <NormalText style={{marginVertical:15,color:'black'}}>(*) Segments</NormalText>
                                        <View style={{width:'100%',flexDirection:'row'}}>        
                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedSegments.includes("EQ") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectSegments("EQ")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Equity</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedSegments.includes("FU") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectSegments("FU")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Futures</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedSegments.includes("CO") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectSegments("CO")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Commodity</NormalText>  
                                            </View>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row'}}>        
                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedSegments.includes("OP") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectSegments("OP")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Options</NormalText>  
                                            </View>
                                        </View>

                                        <NormalText style={{marginVertical:15,color:'black'}}>(*) Intrested Areas</NormalText>
                                        <View style={{width:'100%',flexDirection:'row'}}>        
                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedAreas.includes("MutualFunds") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectInterest("MutualFunds")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Mutual Funds</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedAreas.includes("Insurance") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectInterest("Insurance")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Insurance</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedAreas.includes("CreditCard") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectInterest("CreditCard")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Credit Card</NormalText>  
                                            </View>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row'}}>        
                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedAreas.includes("Loans") ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectInterest("Loans")}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Loans</NormalText>  
                                            </View>
                                        </View>

                                        <NormalText style={{marginVertical:15,color:'black'}}>(*) Durations</NormalText>
                                        <View style={{width:'100%',flexDirection:'row'}}>        
                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(1) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(1)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Intraday</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(2) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(2)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>BTST</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(3) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(3)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>STBT</NormalText>  
                                            </View>
                                        </View>

                                        <View style={{width:'100%',flexDirection:'row'}}>        
                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(4) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(4)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Momentum</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(5) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(5)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Positional</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(6) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(6)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Weekly</NormalText>  
                                            </View>
                                        </View>

                                        
                                        <View style={{width:'100%',flexDirection:'row'}}>        
                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(7) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(7)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Short Term</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(8) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(8)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Menium Term</NormalText>  
                                            </View>

                                            <View style={styles.CheckboxContainer}>
                                                <Checkbox 
                                                    status={this.state.SelectedDuration.includes(9) ? "checked":"unchecked"}
                                                    onPress={() => this.SelectUnselectDurations(9)}/>
                                                <NormalText style={{marginBottom:0,color:'black'}}>Long Term</NormalText>  
                                            </View>
                                        </View>


                                </View>
                        </View>}
                    </Card>

                    <TouchableOpacity style={{paddingBottom:10}}>
                        <CustomButton style={{alignSelf:'center'}}>
                            <NormalText style={{marginBottom:0,color:'white'}}>Add User</NormalText>
                        </CustomButton> 
                    </TouchableOpacity>
                        
                </ScrollView>
            </Container>
        )
    }
}


const styles=StyleSheet.create({
    AddUserContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    AddUserCard:{
        padding:10,
        alignItems:'flex-start',
        alignSelf:'center',
        margin:10,
        width:'95%',
        borderRadius:5
    },
    UserTypesContainer:{
        width:'100%',
        flexDirection:'row',
        alignSelf:'center',
        marginVertical:10,
        justifyContent:'space-evenly'
    },
    CustomPicker:{
        borderWidth:1,
        borderColor:'#CBCFD6',
        borderRadius:5,
        height:35,
        width:'100%',
        justifyContent:'center'
    },
    CustomTextInputs:{
        borderWidth:1,
        height:40,
        width:'100%',
        borderRadius:5,
        borderColor:'#CBCFD6',
        justifyContent:'center'
    },
    CheckboxContainer:{
        width:'33%',
        flexDirection:'row',
        alignItems:'center',
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

export default connect(mapStateToProps,mapDispatchToProps)(AddUser);