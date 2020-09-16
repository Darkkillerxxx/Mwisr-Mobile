import React from 'react'
import {View,TouchableOpacity,StyleSheet} from 'react-native'
import Container from '../../Components/Container'
import Users from '../../Components/Users'
import { connect }from 'react-redux'


class Customer extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    onUserSelected=(UserId,OwnerId,IsActive,Name,Contact,Calls,ROI,Profit,Accuracy)=>{
        console.log(UserId,OwnerId,IsActive)
        this.props.navigation.navigate('UserDetails',{
            UserId:UserId,
            OwnerId:OwnerId,
            UserType:7,
            UserColor:"#2dcee3",
            IsActive:IsActive,
            CustomerDetails:[
                {
                    CustomerName:Name,
                    CustomerContact:Contact,
                    TotalCalls:Calls,
                    TotalROI:ROI,
                    TotalProfit:Profit,
                    Accuracy:Accuracy
                }
            ]
        })
    }


    render()
    {
        return(
            <Container style={styles.CustContainer}>
                <Users onSelectUser={this.onUserSelected} UserColor="#2dcee3" UserType={7} AuthHeader={this.props.loginState.AuthHeader} IsOwner={false}/>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustContainer:{
        alignItems:'flex-start',
        justifyContent:'flex-start'
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

export default connect(mapStateToProps,mapDispatchToProps)(Customer);