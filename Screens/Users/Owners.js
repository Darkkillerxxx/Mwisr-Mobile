import React from 'react';
import { render } from 'react-dom';
import { View, StyleSheet } from 'react-native';
import Container from '../../Components/Container'
import Users from '../../Components/Users'
import { connect }from 'react-redux'

class Owners extends React.Component{
    constructor(){
        super();
    }

    onUserSelected=(UserId,OwnerId)=>{
        this.props.navigation.navigate('UserDetails',{
            UserId:UserId,
            OwnerId:OwnerId,
            UserType:0,
            UserColor:"#fa8072",
        })
    }


    render()
    {
    return(
        <Container style={styles.OwnerContainer}>
            <Users onSelectUser={this.onUserSelected} UserColor="#fa8072" UserType={2} AuthHeader={this.props.loginState.AuthHeader} IsOwner={true} IsCustomer={false}/>
        </Container>
        )
    }
}





const styles=StyleSheet.create({
    OwnerContainer:{
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
        onSetLogin:(response)=>dispatch(setLogin(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Owners);