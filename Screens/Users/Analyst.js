import React from 'react'
import { View, StyleSheet } from 'react-native'
import Container from '../../Components/Container'
import { connect }from 'react-redux'
import Users from '../../Components/Users'


class Analyst extends React.Component{
    constructor()
    {
        super()
        this.state={

        }
    }

    
    onUserSelected=(UserId,OwnerId)=>{
        this.props.navigation.navigate('UserDetails',{
            UserId:UserId,
            OwnerId:OwnerId,
            UserType:6,
            UserColor:"#1890ff"
        })
    }

    render()
    {
        return(
            <Container style={styles.SubContainer}>
                <Users onSelectUser={this.onUserSelected} UserColor="#1890ff" UserType={6} AuthHeader={this.props.loginState.AuthHeader} IsOwner={false}/>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    SubContainer:{
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

export default connect(mapStateToProps,mapDispatchToProps)(Analyst);