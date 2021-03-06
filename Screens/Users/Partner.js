import React from 'react'
import { View, StyleSheet } from 'react-native'
import Container from '../../Components/Container'
import { connect }from 'react-redux'
import Users from '../../Components/Users'


class Partner extends React.Component{
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
            UserType:5,
            UserColor:"#f39834"
        })
    }

    render()
    {
        return(
            <Container style={styles.SubContainer}>
                <Users onSelectUser={this.onUserSelected} UserColor="#f39834" UserType={5} AuthHeader={this.props.loginState.AuthHeader} IsOwner={false}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Partner);