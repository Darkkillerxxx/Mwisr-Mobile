import React from 'react'
import {View,StyleSheet,Picker,TouchableOpacity,Image,ActivityIndicator,FlatList} from 'react-native'
import NormalText from '../../Components/NormalText'
import {NavigationEvents} from 'react-navigation'
import {assigned_users,unassigned_users,assign_Package,verbose} from '../../Utils/api'
import Card from '../../Components/Card'
import {Checkbox} from 'react-native-paper'
import CustomButton from '../../Components/Button'


class AssignUsers extends React.Component{
    constructor(){
        super()
        this.state={
            isLoading:false,
            ButtonLoader:false,
            ShowAssigned:true,
            SelectedUserType:null,
            AssignedUsers:[],
            UnAssignedUsers:[],
            SelectedUsers:[],
            SelectedAssignedUsers:[],
            SelectedUnAssignedUsers:[]
        }
    }


    AddRemoveAssignedUsers=(UserId)=>{
        let temp=this.state.SelectedAssignedUsers
        if(!this.state.SelectedAssignedUsers.includes(UserId))
        {
            temp.push(UserId)
        }
        else
        {
            let index=temp.indexOf(UserId)
            temp.splice(index,1)
        }

        this.setState({SeletedAssignedUsers:temp})
    }

    AddRemoveUnAssignedUsers=(UserId)=>{
        let temp=this.state.SelectedUsers
        if(!this.state.SelectedUsers.includes(UserId))
        {
            temp.push(UserId)
        }
        else
        {
            let index=temp.indexOf(UserId)
            temp.splice(index,1)
        }

        this.setState({SelectedUnAssignedUsers:temp})
    }

    getUserColor=(UserType)=>{
        switch(UserType)
        {
            case 2:
                return "#33C4C6"
                break;

            case 5:
                return "#6c5682"
                break
            
            case 6:
                return "orange"
                break
            
            case 7:
                return "#35D0E4"
                break;

            default:
                break
        }
    }

    getAssignedUnAssignedUsers=()=>{
        const {forOwnerId,packageId,Auth} = this.props.navigation.state.params
        this.setState({isLoading:true})
        let payload={ 
            forPackageId:packageId,
            forOwnerId:forOwnerId
        } 

        assigned_users(Auth,payload).then(result=>{
            // console.log("AssignedUsers result",result)
            if(result.IsSuccess)
            {
                this.setState({AssignedUsers:result.Data},()=>{
                    // console.log("AssignedUsers",this.state.AssignedUsers)

                    unassigned_users(Auth,payload).then(result=>{
                        if(result.IsSuccess)
                        {
                            this.setState({UnAssignedUsers:result.Data},()=>{
                                console.log(this.state.UnAssignedUsers)
                                this.setState({isLoading:false})
                            })
                        }
                    })
                })
            }
        })
    }

    onInit=()=>{
        this.getAssignedUnAssignedUsers()
    }

    changeType=()=>{
        this.setState({SelectedUser:[]})
        this.setState({ShowAssigned:!this.state.ShowAssigned})
    }

    AssignUnAssignUser=(IsAssign)=>{
        if(IsAssign)
        {
            this.setState({ButtonLoader:true})
            const {forOwnerId,packageId,Auth} = this.props.navigation.state.params
            let tempSelectedUsers=this.state.SelectedUsers
            let Date=[]
            let PackageIds=[]
            let OwnerIds=[]

            tempSelectedUsers.forEach(res=>{
                Date.push('23-10-2021')
                PackageIds.push(packageId)
                OwnerIds.push(forOwnerId)
            })

            let payload={
                ForOwnerIds:OwnerIds.toString(),
                PackageIds:PackageIds.toString(),
                AssignedToUserIds:tempSelectedUsers.toString(),
                Durations:Date.toString()
            }

            assign_Package(Auth,payload).then(result=>{
                if(result.IsSuccess)
                {
                    this.setState({SelectedUsers:[]})
                    this.getAssignedUnAssignedUsers()
                    verbose(true,"Users Assigned","Users Have Been Successfully Assigned To This Package")
                    this.setState({ButtonLoader:false})
                }
                else
                {
                    verbose(true,"Users Assigment Failure",result.DisplayMsg)
                    this.setState({ButtonLoader:false})
                }
            })
        }
        else
        {

        }
    }

    ShowUsers=(itemData)=>(
        this.state.SelectedUserType === null || this.state.SelectedUserType === itemData.item.UserTypeId ?
        <View style={styles.Users} >
            <Card style={{...styles.UserCard,...{borderColor:this.getUserColor(itemData.item.UserTypeId)}}}>
                <View style={styles.UserLeft}>
                    <Image source={require('../../assets/Images/Analyst.png')} style={{width:65,height:65}}/>
                </View>
                <View style={styles.UserRight}>
                    <NormalText style={{marginBottom:0,fontSize:14}}>{itemData.item.UserName}</NormalText>
                    <NormalText style={{marginBottom:0,fontSize:14}}>{itemData.item.Usertype}</NormalText>
                </View>
            </Card>
            <View style={styles.UserCardRight}>
            <Checkbox 
                    status={this.state.SelectedUsers.includes(itemData.item.UserId) ? "checked":"unchecked"}
                    onPress={() => this.AddRemoveUnAssignedUsers(itemData.item.UserId)}/>  
            </View>
        </View>:null
    )

    render(){
        return(
            <View style={styles.AssignContainer}>
                <NavigationEvents onDidFocus={()=> this.onInit()}/>
                <View style={styles.SelectorCollector}>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:14}}>Select User Type</NormalText>
                    <View style={styles.PickerContainer}>
                        <Picker selectedValue={this.state.SelectedUserType} onValueChange={(val)=>this.setState({SelectedUserType:val})}>
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
                                <TouchableOpacity onPress={()=>this.changeType()}>
                                    <NormalText style={{marginBottom:0,color:'black',fontSize:14,color:`${this.state.ShowAssigned ? "white":"#f5bb18"}`}}>Assigned</NormalText>
                                </TouchableOpacity>
                            </View>
                            <View style={this.state.ShowAssigned ?  styles.TypeSides : styles.TypesSideSelected}>
                                <TouchableOpacity onPress={()=>this.changeType()}>
                                    <NormalText style={{marginBottom:0,color:'black',fontSize:14,color:`${this.state.ShowAssigned ? "#f5bb18":"white"}`}}>Un-Assigned</NormalText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{...styles.UsersContainer,...{justifyContent: this.state.isLoading ? 'center':'flex-start'}}}>
                    {this.state.isLoading ?
                        <ActivityIndicator size="large" color="#f5bb18" />
                        :
                       
                        <FlatList 
                        keyExtractor={(item, index) =>index.toString()}
                        data={this.state.ShowAssigned ? this.state.AssignedUsers:this.state.UnAssignedUsers}
                        renderItem={this.ShowUsers}
                        />
                        }
                </View>

                <View style={styles.AssignButtonContainer}>
                    <TouchableOpacity onPress={()=>this.AssignUnAssignUser(true)}>
                        <CustomButton style={{width:150,height:35,borderRadius:5}}>
                            {this.state.ButtonLoader ? 
                            <ActivityIndicator size="small" color="white" />
                            :<NormalText style={{color:'white',marginBottom:0,fontSize:14}}>{this.state.ShowAssigned ? "Un-Assign Users":"Assign Users"}</NormalText>}
                        </CustomButton>
                    </TouchableOpacity>
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
        backgroundColor: '#FAFAFA',
        padding:10
    },
    SelectorCollector:{
        width:'100%'
    },
    PickerContainer:{
        width:'100%',
        height:35,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        justifyContent:'center'
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
        width:'100%',
        alignItems:'center'
    },
    Users:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'100%',
        marginVertical:5
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
    },
    AssignButtonContainer:{
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default AssignUsers