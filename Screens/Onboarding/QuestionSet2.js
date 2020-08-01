import React,{Component} from 'react';
import { StyleSheet,View,TextInput,Button } from 'react-native';
import {upsertCustomerAnswers} from '../../Utils/api'
import { RadioButton } from 'react-native-paper';
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import InputContainer from '../../Components/InputContainer'
import RBContainer from '../../Components/RBContainer'

class QuestionSet2 extends React.Component{
    constructor()
    {
        super();
        this.state={
            QuestionAnswers:[{
                optionId:1,
                optionSubId:1,
                optionValue:0,
                questionId:4
              },
              {
                optionId:1,
                optionSubId:1,
                optionValue:null,
                questionId:5
              },
              {
                optionId:1,
                optionSubId:1,
                optionValue:null,
                questionId:6
              }
            ],
            ErrorCode:0,
            isLoading:false
            }
        }
    

    onRiskiestInvestmentChange=(value)=>{
        let temp=this.state.QuestionAnswers;
        temp[1].optionId=value;
        this.setState({QuestionAnswers:temp},()=>{
          console.log(this.state.QuestionAnswers)
        })
      }
      
      onInvestmentChange=(e)=>{
        let temp=this.state.QuestionAnswers;
        temp[0].optionValue=e;
        this.setState({QuestionAnswers:temp},()=>{
          console.log(this.state.QuestionAnswers)
        })
      }
      
      onKnowledgeChange=(value)=>{
        let temp=this.state.QuestionAnswers;
        temp[2].optionId=value;
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

      onSubmitQuestionSet2=()=>{
        if(this.validation())
        {
          this.setState({isLoading:true})
          this.state.QuestionAnswers.forEach((element,index) => {
            let payload={
              userId:this.props.userId,
              optionId:element.optionId,
              optionSubId:element.optionSubId,
              optionValue:element.optionValue,
              questionId:element.questionId
            }
            upsertCustomerAnswers(this.props.authHeader,payload).then((result)=>{
              if(result.IsSuccess)
              {
                if(index === 2)
                {
                  this.props.LoginCall()
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
                    <BoldText>Question Set 2</BoldText>
                    <NormalText>Fields Marked With (*) Are Mandatory</NormalText>

                    <InputContainer>
                        <NormalText style={style.OverideNormalText2}>(*) How much would you like to invest ?</NormalText>
                        <TextInput placeholder="Enter Investment Amount" onChangeText={this.onInvestmentChange} style={style.TextInput}></TextInput>

                        <NormalText style={style.OverideNormalText2}>(*) Please Select the Riskiest Investment that You have Owned,or have Owned in the Past</NormalText>
                        <RadioButton.Group
                             onValueChange={this.onRiskiestInvestmentChange}>
                            <RBContainer >
                                <RadioButton value={1} status={this.state.QuestionAnswers[1].optionId === 1 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Saving Account</NormalText>
                            </RBContainer>

                            <RBContainer >
                                <RadioButton value={2} status={this.state.QuestionAnswers[1].optionId === 2 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>FDs,Real Estate</NormalText>
                            </RBContainer>
                           
                            <RBContainer >
                                <RadioButton value={3} status={this.state.QuestionAnswers[1].optionId === 3 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Stock,Bonds</NormalText>
                            </RBContainer>

                            <RBContainer >
                                <RadioButton value={4} status={this.state.QuestionAnswers[1].optionId === 4 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Future,Options</NormalText>
                            </RBContainer>
                         </RadioButton.Group>

                         <NormalText style={style.OverideNormalText2}>(*) How Would You Describe Your Knowledge about Investments and Financial Markets</NormalText>
                         <RadioButton.Group
                             onValueChange={this.onKnowledgeChange}>
                            <RBContainer >
                                <RadioButton value={1} status={this.state.QuestionAnswers[2].optionId === 1 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>None</NormalText>
                            </RBContainer>

                            <RBContainer >
                                <RadioButton value={2} status={this.state.QuestionAnswers[2].optionId === 2 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Limited</NormalText>
                            </RBContainer>
                           
                            <RBContainer >
                                <RadioButton value={3} status={this.state.QuestionAnswers[2].optionId === 3 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Good</NormalText>
                            </RBContainer>

                            <RBContainer >
                                <RadioButton value={4} status={this.state.QuestionAnswers[2].optionId === 4 ? "checked":"unchecked"}/>
                                <NormalText style={style.OverideNormalText}>Extensive</NormalText>
                            </RBContainer>
                         </RadioButton.Group>
                         
                         <View style={style.ButtonContainer}>
                            <Button title="Proceed" onPress={()=>this.onSubmitQuestionSet2()} color="#f5bb18" />
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
    TextInput:{
        borderRadius:20,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:2
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
    ButtonContainer:{
        width:"90%",
        marginVertical:15,
        borderRadius:30,
        overflow:'hidden'
    }
})

export default QuestionSet2;