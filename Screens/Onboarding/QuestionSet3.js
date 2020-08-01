import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button,TouchableWithoutFeedback,findNodeHandle } from 'react-native';
import {upsertCustomerAnswers} from '../../Utils/api'
import { RadioButton } from 'react-native-paper';
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import InputContainer from '../../Components/InputContainer'
import RBContainer from '../../Components/RBContainer'


class QuestionSet3 extends React.Component{
    constructor()
    {
        super();
        this.state={
            QuestionAnswers:[{
                optionId:1,
                optionSubId:1,
                optionValue:null,
                questionId:7
              },
              {
                optionId:1,
                optionSubId:1,
                optionValue:null,
                questionId:8
              },
              {
                optionId:1,
                optionSubId:1,
                optionValue:null,
                questionId:9
              }
            ],
            ErrorCode:0,
            isLoading:false
        }
    }

    onMoneyBackChange=(value)=>{
        let temp=this.state.QuestionAnswers;
        temp[0].optionId=value;
        this.setState({QuestionAnswers:temp},()=>{
          console.log(this.state.QuestionAnswers)
        })
      }
      
      onAttitudeChange=(value)=>{
        let temp=this.state.QuestionAnswers;
        temp[1].optionId=value;
        this.setState({QuestionAnswers:temp},()=>{
          console.log(this.state.QuestionAnswers)
        })
      }
      
      onPortfolioChange=(value)=>{
        let temp=this.state.QuestionAnswers;
        temp[2].optionId=value;
        this.setState({QuestionAnswers:temp},()=>{
          console.log(this.state.QuestionAnswers)
        })
      }

      onSubmitQuestionSet3=()=>{
        this.setState({isLoading:true})
          this.state.QuestionAnswers.forEach((element,index) => {
            let payload={
              userId:this.props.userId,
              optionId:element.optionId,
              optionSubId:element.optionSubId,
              optionValue:element.optionValue,
              questionId:element.questionId
            }
            // console.log(payload)
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

    render()
    {
        return(
                <Container style={style.OverideContainer}>
                     <Card>
                        <BoldText>Question Set 3</BoldText>
                        <NormalText>Fields Marked With (*) Are Mandatory</NormalText>

                        <InputContainer>
                            <NormalText style={style.OverideNormalText2}>(*) When Do You Want Your Money Back ?</NormalText>
                            <RadioButton.Group
                                onValueChange={this.onMoneyBackChange}>
                                <RBContainer >
                                    <RadioButton value={1} status={this.state.QuestionAnswers[0].optionId === 1 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Short Term(Within a Year)</NormalText>
                                </RBContainer>

                                <RBContainer >
                                    <RadioButton value={2} status={this.state.QuestionAnswers[0].optionId === 2 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Medium Term (Between 1-3 Years)</NormalText>
                                </RBContainer>
                            
                                <RBContainer >
                                    <RadioButton value={3} status={this.state.QuestionAnswers[0].optionId === 3 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Long Term(After 3 Years)</NormalText>
                                </RBContainer>

                            </RadioButton.Group>

                            <NormalText style={style.OverideNormalText2}>(*) Which of these below statements describes your attitude towards the performance of your investment over next three months?</NormalText>
                            <RadioButton.Group
                                onValueChange={this.onAttitudeChange}>
                                <RBContainer >
                                    <RadioButton value={1} status={this.state.QuestionAnswers[1].optionId === 1 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Would have hard time accepting my declines</NormalText>
                                </RBContainer>

                                <RBContainer >
                                    <RadioButton value={2} status={this.state.QuestionAnswers[1].optionId === 2 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Can only tolerate short term fluctuations.</NormalText>
                                </RBContainer>
                            
                                <RBContainer >
                                    <RadioButton value={3} status={this.state.QuestionAnswers[1].optionId === 3 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>If my investment declined over 20%,then i would be concerned.</NormalText>
                                </RBContainer>
                            
                                <RBContainer >
                                    <RadioButton value={4} status={this.state.QuestionAnswers[1].optionId === 4 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>I would not worry about market fluctuations.</NormalText>
                                </RBContainer>

                            </RadioButton.Group>

                            
                            <NormalText style={style.OverideNormalText2}>(*) Which are the following Portfolio You are likely to Invest in?</NormalText>
                            <RadioButton.Group
                                onValueChange={this.onPortfolioChange}>
                                <RBContainer >
                                    <RadioButton value={1} status={this.state.QuestionAnswers[2].optionId === 1 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Portfolio A : With a Gauranted return of 7.5 p.a,with no probability of loss.</NormalText>
                                </RBContainer>

                                <RBContainer >
                                    <RadioButton value={2} status={this.state.QuestionAnswers[2].optionId === 2 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Portfolio B:With a likely return of 15% with aprobability of 5% loss.</NormalText>
                                </RBContainer>
                            

                                <RBContainer >
                                    <RadioButton value={3} status={this.state.QuestionAnswers[2].optionId === 3 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Portfolio C:With a likely return of 25% with probability of 12% loss.</NormalText>
                                </RBContainer>
                            
                                <RBContainer >
                                    <RadioButton value={4} status={this.state.QuestionAnswers[2].optionId === 4 ? "checked":"unchecked"}/>
                                    <NormalText style={style.OverideNormalText}>Portfolio D:With a likely return of 50% with a propbablity of 25% loss.</NormalText>
                                </RBContainer>

                            </RadioButton.Group>
    
                            <View style={style.ButtonContainer}>
                                <Button title="Proceed" onPress={()=>this.onSubmitQuestionSet3()} color="#f5bb18" />
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
        marginTop:7,
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

export default QuestionSet3;