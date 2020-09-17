import React from 'react';
import { View,StyleSheet,TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NormalText from './NormalText'
import { connect }from 'react-redux'

class CustomButtonNavigator extends React.Component{
    constructor()
    {
        super()
        this.state={
            SelectedTab:1,
            NormalTabs:[
                {
                    Name:"Home",
                    Icon:"home",
                    Key:"Home"
                },
                {
                    Name:"Add Call",
                    Icon:"phone",
                    Key:"AddCall"
                },
                {
                    Name:"Add Package",
                    Icon:"dropbox",
                    Key:"AddPackage"
                },
                {
                    Name:"Add Reports",
                    Icon:"sticky-note",
                    Key:"AddReports"
                }
            ],
            CustomerTabs:[
                {
                    Name:"Home",
                    Icon:"home",
                    Key:"Home"
                },
                {
                    Name:"View Calls",
                    Icon:"phone",
                    Key:"ViewCalls"
                },
                {
                    Name:"View Package",
                    Icon:"dropbox",
                    Key:"ViewPackage"
                },
                {
                    Name:"View Reports",
                    Icon:"sticky-note",
                    Key:"ViewReports"
                }
            ]
        }
    }

    onTabsSelected=(Key)=>{
        this.props.navigation.navigate(Key)
    }

    render()
    {
        const ShowNormalTabs=this.state.NormalTabs.map((result,index)=>{
            return(
                <TouchableOpacity key={index} onPress={()=>this.onTabsSelected(result.Key)} style={{width:'25%'}}>
                    <View style={styles.NormalTabsContainer}>
                        <FontAwesome name={result.Icon} size={22} color="grey" />
                        <NormalText style={{marginBottom:0,marginVertical:3}}>{result.Name}</NormalText>
                    </View>
                </TouchableOpacity>
            )
        })

        const ShowCustomerTabs=this.state.CustomerTabs.map((result,index)=>{
            return(
                <TouchableOpacity key={index} onPress={()=>this.onTabsSelected(result.Key)} style={{width:'25%'}}>
                    <View style={styles.NormalTabsContainer}>
                        <FontAwesome name={result.Icon} size={22} color="grey" />
                        <NormalText style={{marginBottom:0,marginVertical:3}}>{result.Name}</NormalText>
                    </View>
                </TouchableOpacity>
            )
        })

        return (
            <View style={styles.CustomBottomNavigator}>
                {
                this.props.loginState.UserTypeId === 7 ?
                ShowCustomerTabs:ShowNormalTabs}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CustomBottomNavigator:{
        height:50,
        width:'100%',
        flexDirection:'row',
        backgroundColor:'white'
    },
    NormalTabsContainer:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
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

export default connect(mapStateToProps,mapDispatchToProps)(CustomButtonNavigator);