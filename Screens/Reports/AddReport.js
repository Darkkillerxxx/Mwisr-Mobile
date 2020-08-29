import React from 'react'
import {View,StyleSheet,TouchableOpacity,TextInput, ScrollView} from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import Card from '../../Components/Card'
import CustomButton from '../../Components/Button'
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker'

class AddReports extends React.Component{
    constructor(){
        super()
        this.state={
            Authors:[
                {
                    AuthorId: 0,
                    AuthorName: "",
                    EMailId: ""
                }
            ],
            Keywords:[],
            KeywordText:"",
            ReportsCreationDate:"",
            ReportEndDate:""
        }
    }

    onCreatedDateChange=(Date)=>{
        this.setState({ReportsCreationDate:Date},()=>{
            console.log(this.state.ReportsCreationDate)
        })
    }

    onEndDateChange=(Date)=>{
        this.setState({ReportEndDate:Date},()=>{
            console.log(this.state.ReportsCreationDate)
        })
    }


    
    AddKeywords=(Keyword,IsAdd)=>{
        let tempKey=this.state.Keywords
        if(Keyword !== "")
        {
            if(IsAdd)
            {
                tempKey.push(Keyword)
                console.log(tempKey)
            }
            else
            {
                let index = tempKey.indexOf(Keyword)
                tempKey.splice(index,1)
            }
        }
        this.setState({Keywords: tempKey})
    }


    AddAuthors=()=>{
        let Authors={
            AuthorId: 0,
            AuthorName: "",
            EMailId: ""
        }
        
        let temp=this.state.Authors

        temp.push(Authors)
        this.setState({Authors:temp})
    }

    RemoveAuthors=()=>{
        let temp=this.state.Authors
        temp.pop()
        this.setState({Authors:temp})

    }

    onAuthorsNameChange=(e,index)=>{
        let temp=this.state.Authors
        temp[index].AuthorName=e
        this.setState({Authors:temp})
    }

    onAuthorEmailCahnge=(e,index)=>{
        let temp=this.state.Authors
        temp[index].EMailId=e
        this.setState({Authors:temp})
    }

    render(){

     let ShowAuthors=this.state.Authors.map((result,index)=>(
         
                <View style={styles.AuthorContainer}>
                     <View style={styles.AuthorInputs}>
                         <NormalText style={styles.SelectorName}>Author Name</NormalText>
                         <View style={styles.TextInputContainer}>
                             <TextInput onChangeText={(e)=>this.onAuthorsNameChange(e,index)} style={{height:35}} />
                         </View>       
                     </View>
                     <View style={styles.AuthorInputs}>
                         <NormalText style={styles.SelectorName}>Author Email</NormalText> 
                         <View style={styles.TextInputContainer}>
                             <TextInput onChangeText={(e)=>this.onAuthorsEmailChange(e,index)} style={{height:35}} />
                         </View>       
                     </View>
               
             </View>
        ))

        let ShowKeywords=this.state.Keywords.map((result)=>(
            <View style={styles.Keywords}>
                <NormalText style={{marginBottom:0,color:'white',fontSize:12}}>{result}</NormalText>
                <TouchableOpacity onPress={()=>this.AddKeywords(result,false)}>
                    <FontAwesome name="close" size={12} color="white" />
                </TouchableOpacity>                            
            </View>
        ))

        return(
            <Container style={styles.CustomContainer} >
                <ScrollView style={{width:'100%'}}>
                    
                    <View style={{width:'100%',marginTop:10}}>
                        <View style={styles.Selector} />
                            <View style={styles.SelectorNameContainer}>
                                <NormalText style={styles.SelectorName}>Add Keywords</NormalText>
                            </View>
                    </View>
                

                    <Card style={styles.CustomCard}>
                        <View style={styles.KeywordContainer}>
                            <View style={{width:'80%'}}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Add Keywords</NormalText>
                                <View style={styles.KeywordTextInput}>
                                    <TextInput onChangeText={(e)=> this.setState({KeywordText:e},()=>console.log(this.state.KeywordText))} style={{height:35}}/>
                                </View>
                            </View>
                            <View style={styles.KeywordButtonContainer}>
                                <TouchableOpacity onPress={()=>this.AddKeywords(this.state.KeywordText,true)}>
                                    <CustomButton style={{width:55}}>
                                        <NormalText style={{marginBottom:0,color:'white'}}>ADD</NormalText>
                                    </CustomButton>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.KeywordsContainer}>
                            {ShowKeywords}
                        </View>
                        <View style={{...styles.KeywordsContainer,...{justifyContent:'space-between'}}}>
                            <View style={styles.DatesContainer}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Report Start Date</NormalText>
                                <View style={styles.DatePickerContainer}>
                                    <DatePicker
                                        style={{width: 50}}
                                        date={this.state.ReportsCreationDate}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-05-2016"
                                        maxDate="01-05-2025"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        hideText={true}
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
                                                width: 250,
                                                height:35,
                                                borderRadius:5
                                            }
                                            }}
                                        onDateChange={(date) => this.onCreatedDateChange(date)}
                                    />
                                    <NormalText style={{marginBottom:0,fontSize:14}}>{this.state.ReportsCreationDate}</NormalText>   
                                </View>
                            </View>
                            <View style={styles.DatesContainer}>
                            <NormalText style={{marginBottom:10,fontSize:14}}>Report Start Date</NormalText>
                            <View style={styles.DatePickerContainer}>
                                    <DatePicker
                                        style={{width: 50}}
                                        date={this.state.ReportEndDate}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-05-2016"
                                        maxDate="01-05-2025"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        hideText={true}
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
                                                width: 250,
                                                height:35,
                                                borderRadius:5
                                            }
                                            }}
                                        onDateChange={(date) => this.onEndDateChange(date)}
                                    />
                                    <NormalText style={{marginBottom:0,fontSize:14}}>{this.state.ReportEndDate}</NormalText>   
                                </View>
                            </View>
                        </View>
                    </Card>

{/* ----------------------------------------------------Authors------------------------------------------- */}
                    
                    <View style={{width:'100%',marginTop:10}}>
                        <View style={styles.Selector} />

                    
                        <View style={styles.SelectorNameContainer}>
                            <NormalText style={styles.SelectorName}>Add Author</NormalText>
                        </View>
                    </View>
                

                    <Card style={styles.CustomCard}>
                        {ShowAuthors}
                        <View style={styles.CustomButtonContainer}>
                        {this.state.Authors.length > 1 ? 
                        <TouchableOpacity onPress={()=>this.RemoveAuthors()}>
                            <CustomButton style={{width:120}}>
                                <NormalText style={{...styles.SelectorName,...{color:'white',fontSize:12}}}>Remove Authors</NormalText>
                            </CustomButton>
                        </TouchableOpacity>
                        :null}
                        <TouchableOpacity onPress={()=>this.AddAuthors()}>
                            <CustomButton style={{width:120}}>
                                <NormalText style={{...styles.SelectorName,...{color:'white',fontSize:12}}}>Add More Authors</NormalText>
                            </CustomButton>
                        </TouchableOpacity>
                        </View>
                    </Card>
                </ScrollView>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustomContainer:{
        justifyContent: 'flex-start',
        backgroundColor:'#E9EAEF',
        padding:10
    },

    Selector:{
        width:'100%',
        borderTopWidth:1,
        borderColor:'grey'
    },
    SelectorNameContainer:{
        width:100,
        alignItems:'center',
        backgroundColor:'#E9EAEF',
        marginTop:-10,
        alignSelf:'center'
    },
    SelectorName:{
        marginBottom:0,
        fontSize:14
    },
    CustomCard:{
        width:'100%',
        marginVertical:10,
        padding:10,
        borderRadius:5
    },
    AuthorContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    AuthorInputs:{
       width:'48%',
       alignItems:'flex-start'
    },
    TextInputContainer:{
        width:'90%',
        height:35,
        borderWidth:1,
        borderColor:'#CBCFD6',
        borderRadius:5,
        marginVertical:5
    },
    CustomButtonContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    KeywordContainer:{
        width:'100%',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between'
    },
    KeywordTextInput:{
        width:'100%',
        height:35,
        borderWidth:1,
        borderColor:'#CBCFD6',
        borderRadius:5
    },
    KeywordButtonContainer:{
        width:'20%',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    KeywordsContainer:{
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:10
    },
    Keywords:{
        width:'30%',
        height:35,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f5bb18',
        borderRadius:5,
        justifyContent:'space-evenly'
    },
    DatesContainer:{
        width:'45%',
        overflow:'hidden'

    },
    DatePickerContainer:{
        width:'100%',
        borderWidth:1,
        borderColor:"#CBCFD6",
        borderRadius:5,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'flex-start'
    }
    
})


export default AddReports