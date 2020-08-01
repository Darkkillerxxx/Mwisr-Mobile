import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button,TouchableWithoutFeedback,findNodeHandle,Slider } from 'react-native';
import {upsertCustomerAnswers} from '../../Utils/api'
import { RadioButton } from 'react-native-paper';
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import InputContainer from '../../Components/InputContainer'
import RBContainer from '../../Components/RBContainer'

class QuestionSet1 extends React.Component{
    constructor()
    {
        super();
        this.state={
            SliderValue:0,
            QuestionAnswers:[{
            optionId:1,
            optionSubId:1,
            optionValue:0,
            questionId:1
            },
            {
            optionId:1,
            optionSubId:1,
            optionValue:null,
            questionId:2
            },
            {
            optionId:1,
            optionSubId:1,
            optionValue:null,
            questionId:3
            }
        ],
        ErrorCode:0,
        isLoading:false
        }
    }

    onAgeChange=(e)=>{
        let temp=this.state.QuestionAnswers;
        temp[0].optionValue=e;
        this.setState({QuestionAnswers:temp})
    }

    onExpenseChange=(value)=>{
        this.setState({SliderValue:parseInt(value)},()=>{
          console.log(this.state.SliderValue)
        })
        let temp=this.state.QuestionAnswers;
        temp[2].optionValue=parseInt(value);
        this.setState({QuestionAnswers:temp})
    }

    onInvestAnswerChange=(optionId)=>{
        let temp=this.state.QuestionAnswers;
        temp[1].optionId=optionId;
        this.setState({QuestionAnswers:temp},()=>{
          console.log(this.state.QuestionAnswers)
        })
      }

      validation=()=>{
        if(this.state.QuestionAnswers[0].optionValue === 0 || this.state.QuestionAnswers[0].optionValue === "" )
        {
          this.setState({ErrorCode:1})
          return false
        }
        else if(this.state.QuestionAnswers[1].optionValue === 0)
        {
          this.setState({ErrorCode:2})
          return false
        }
        else
        {
          this.setState({ErrorCode:0})
          return true
        }
      }

      onSubmitQuestionSet1=()=>{
        this.setState({isLoading:true})
        if(this.validation())
        {
          this.state.QuestionAnswers.forEach((element,index) => {
            let payload={
              userId:this.props.userId,
              optionId:element.optionId,
              optionSubId:element.optionSubId,
              optionValue:element.optionValue,
              questionId:element.questionId
            }

            console.log(payload)

            upsertCustomerAnswers(this.props.authHeader,payload).then((result)=>{
              if(result.IsSuccess)
              {
                if(index === 2)
                {
                  this.props.LoginCall();
                  this.setState({isLoading:false})
                }
              }
              else
              {
                
              }
            })
          });
        }
      }

    render()
    {
        return(
            <Container style={style.OverideContainer}>
            
                <Card>
                    <BoldText>Question Set 1</BoldText>
                    <NormalText>Fields Marked With (*) Are Mandatory</NormalText>

                    <InputContainer>
                      
                        <NormalText style={style.OverideNormalText2}>(*) Customer Age</NormalText>
                        <TextInput placeholder="Enter Age" onChangeText={this.onAgeChange} style={style.TextInput}></TextInput>

                        <NormalText style={style.OverideNormalText2}>(*) Select Percentage for Monthly Income Expenses</NormalText>
                        <Slider style={style.SliderStyle} onValueChange={this.onExpenseChange} maximumValue={100} minimumValue={0}/>

                        
                        <NormalText style={style.OverideNormalText2}>(*) How Much Would You Like To Invest ?</NormalText>
                        <RadioButton.Group
                             onValueChange={this.onInvestAnswerChange}>
                            <RBContainer >
                                <RadioButton value={1} status={this.state.QuestionAnswers[1].optionId === 1 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Conservative(Steady Returns With Low Ups and Downs)</NormalText>
                            </RBContainer>

                            <RBContainer >
                                <RadioButton value={2} status={this.state.QuestionAnswers[1].optionId === 2 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Balanced(Good Returns with Minor Ups and Downs)</NormalText>
                            </RBContainer>
                           
                            <RBContainer >
                                <RadioButton value={3} status={this.state.QuestionAnswers[1].optionId === 3 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Aggerssive(High Returns With Expected Ups and Downs)</NormalText>
                            </RBContainer>

                         </RadioButton.Group>

                         <View style={style.ButtonContainer}>
                            <Button title="Proceed" onPress={()=>this.onSubmitQuestionSet1()} color="#f5bb18" />
                        </View>
                        
                    </InputContainer>
                   
                </Card>
            </Container>
        )
    }
}

const style=StyleSheet.create({
    OverideContainer:{
      marginTop:35
    },
    OverideNormalText:{
        marginBottom:5,
        marginTop:5,
        opacity:0.6
    },
    OverideNormalText2:{
        marginBottom:5,
        marginTop:25,
        opacity:0.6
    },
    TextInput:{
        borderRadius:20,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:2
    },
    SliderStyle:{
        width:'90%',
        marginVertical:10
    },
    ButtonContainer:{
        width:"90%",
        marginVertical:15,
        borderRadius:30,
        overflow:'hidden'
    }
})

export default QuestionSet1;