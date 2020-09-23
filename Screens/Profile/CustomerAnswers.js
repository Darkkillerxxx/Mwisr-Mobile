import React from 'react'
import { View,StyleSheet } from 'react-native'
import Card from '../../Components/Card'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import {get_customer_answers} from '../../Utils/api'

class CustomerAnswers extends React.Component{
    constructor()
    {
        super()
        this.state={
            CustomerAnswers:[]
        }
    }

    componentDidMount() {
        get_customer_answers(this.props.AuthHeader,{forCustomerId:this.props.UserId}).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({CustomerAnswers:result.Data})
            }
        })      
    }

    render() {
        let ShowCustomerAnswers=this.state.CustomerAnswers.map(result=>{
            return(
                <>
                    <BoldText style={{fontSize:14}}>{result.Question}</BoldText>
                    <NormalText style={{fontSize:14}}>{result.Answer}</NormalText>
                </>
            )
        })
        return (
            <Card style={styles.CustomCard}>
                <View style={{alignItems:'flex-start',width:'100%'}}>
                    <BoldText style={{fontSize:16}}>{`Question Answered By You`}</BoldText>
                </View>

                <View style={styles.QuestionAnswersContainer}>
                   {ShowCustomerAnswers}
                </View>
            </Card>
        )
    }
}

const styles=StyleSheet.create({
    CustomCard:{
        width: '100%',
        padding:10,
        marginTop:10,
        elevation:5
    },
    QuestionAnswersContainer:{
        width: '100%',
        alignItems:'flex-start'
    }
})

export default CustomerAnswers;