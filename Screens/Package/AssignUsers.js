import React from 'react'
import {View,StyleSheet,Picker,TouchableOpacity,Image} from 'react-native'
import NormalText from '../../Components/NormalText'
import {NavigationEvents} from 'react-navigation'
import {assigned_users,unassigned_users} from '../../Utils/api'
import Card from '../../Components/Card'
import {Checkbox} from 'react-native-paper'

class AssignUsers extends React.Component{
    constructor(){
        super()
        this.state={
            ShowAssigned:false,
            SelectedUserType:null,
            AssignedUsers:[],
            UnAssignedUsers:[]
        }
    }

    onInit=()=>{
        const {forOwnerId,packageId,Auth} = this.props.navigation.state.params
        
        let payload={ 
            forPackageId:packageId,
            forOwnerId:forOwnerId
        } 

        assigned_users(Auth,payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({AssignedUsers:result.Data},()=>{
                    // console.log(this.state.AssignedUsers)

                    unassigned_users(Auth,payload).then(result=>{
                        if(result.IsSuccess)
                        {
                            this.setState({UnAssignedUsers:result.Data},()=>{
                                // console.log(this.state.UnAssignedUsers)
                            })
                        }
                    })
                })
            }
        })

    }

    render(){
        return(
            <View style={styles.AssignContainer}>
                <NavigationEvents onDidFocus={()=> this.onInit()}/>
                <View style={styles.SelectorCollector}>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:14}}>Select User Type</NormalText>
                    <View style={styles.PickerContainer}>
                        <Picker selectedValue={null} >
                            <Picker.Item value={null} label="All"/>
                            <Picker.Item value={2} label="Sub-Broker"/>
                            <Picker.Item value={6} label="Analyst"/>
                            <Picker.Item value={5} label="Partner"/>
                            <Picker.Item value={7} label="Customer"/>
                        </Picker>
                    </View>

                    <View style={styles.TypeSelectorContainer}>
                        <View style={styles.TypeSelector}>
                            <View style={this.state.ShowAssigned ?  styles.TypesSideSelected:styles.TypeSides}>
                                <TouchableOpacity onPress={()=>this.setState({ShowAssigned:!this.state.ShowAssigned})}>
                                    <NormalText style={{marginBottom:0,color:'black',fontSize:14,color:`${this.state.ShowAssigned ? "white":"#f5bb18"}`}}>Assigned</NormalText>
                                </TouchableOpacity>
                            </View>
                            <View style={this.state.ShowAssigned ?  styles.TypeSides : styles.TypesSideSelected}>
                                <TouchableOpacity onPress={()=>this.setState({ShowAssigned:!this.state.ShowAssigned})}>
                                    <NormalText style={{marginBottom:0,color:'black',fontSize:14,color:`${this.state.ShowAssigned ? "#f5bb18":"white"}`}}>Un-Assigned</NormalText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.UsersContainer}>
                    <View style={styles.Users} >
                        <Card style={styles.UserCard}>
                            <View style={styles.UserLeft}>
                                <Image source={require('../../assets/Images/Analyst.png')} style={{width:65,height:65}}/>
                            </View>
                            <View style={styles.UserRight}>
                                <NormalText style={{marginBottom:0,fontSize:14}}>John Doe</NormalText>
                                <NormalText style={{marginBottom:0,fontSize:14}}>Sub-Broker</NormalText>
                            </View>
                        </Card>
                        <View style={styles.UserCardRight}>
                        <Checkbox 
                                status={"checked"}
                                onPress={() => this.SelectUnSelectPackage(itemData.item.PackageId,itemData.item)}/>  
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    AssignContainer:{
        height:'100%',
        width:'100%',
        justifyContent: 'flex-start',
        backgroundColor: '#EBECF1',
        padding:10
    },
    SelectorCollector:{
        width:'100%'
    },
    PickerContainer:{
        width:'100%',
        height:50,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey'
    },
    TypeSelectorContainer:{
        width:'100%',
        marginVertical:10,
        alignItems:'center'
    },
    TypeSelector:{
        width:250,
        borderWidth:1,
        borderColor:'#f5bb18',
        height:35,
        borderRadius:5,
        flexDirection:'row'
    },
    TypeSides:{
        width:'50%',
        alignItems:'center',
        justifyContent:'center'
    },
    TypesSideSelected:{
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#f5bb18"
    },
    UsersContainer:{
        flex:1,
        width:'100%'
    },
    Users:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'100%'
    },
    UserCard:{
        width:'85%',
        flexDirection:'row',
        borderLeftWidth:5,
        borderColor:'#f5bb18',
        height:75
    },
    UserCardRight:{
        width:'15%',
        height:75,
        alignItems:'center',
        justifyContent:'center'
    },
    UserLeft:{
        width:'30%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    UserRight:{
        width:'70%'
    }
})

export default AssignUsers