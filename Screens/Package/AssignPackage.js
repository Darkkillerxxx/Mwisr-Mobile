import React from 'react'
import {View, StyleSheet} from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'

class AssignPackage extends React.Component{
    constructor()
    {
        super()
        this.state={
            UserType:[
                {
                    Id:2,
                    Name:"Sub-Broker"
                },
                {
                    Id:6,
                    Name:"Analyst"
                },
                {
                    Id:5,
                    Name:"Partners"
                },
                {
                    Id:7,
                    Name:"Customers"
                }
            ]
        }
    }
    
    render()
    {
        return(
           <Container style={styles.AssignContainer}>
               <View style={{flex:1,width:'100%'}}>
                    <NormalText style={{fontSize:14}}>Choose User Type : </NormalText>
               </View>
               <View style={{height:50,width:'100%'}}>

               </View>
           </Container>
        )
    }
}

const styles=StyleSheet.create({
    AssignContainer:{
        padding:10,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    }
})

 

export default AssignPackage