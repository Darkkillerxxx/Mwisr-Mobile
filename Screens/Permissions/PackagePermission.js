import React from 'react'
import { View, StyleSheet,Picker, ScrollView, FlatList,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import CollapsibleCard from '../../Components/CollapsibleCard'
// import RadioButton from '../../Components/RadioBtn'
import {Checkbox} from 'react-native-paper'
import CustomButton from '../../Components/Button'
import {NavigationEvents} from 'react-navigation';
import {get_packages,upsert_package_permisssion,get_assigned_users,verbose,get_package_permissions} from '../../Utils/api'
import {connect} from 'react-redux'
import { RadioButton } from 'react-native-paper';
import RBContainer from '../../Components/RBContainer'


class PackagePermission extends React.Component{
    constructor()
    {
        super()
        this.state={
            NotificationArray:[{
                PermissionSetId:"9",
                Value:"New Call"
              },
              {
                PermissionSetId:"10",
                Value:"Edit Call"
              },
              {
                PermissionSetId:"11",
                Value:"Call Activision"
              },
              {
                PermissionSetId:"12",
                Value:"Call Target 1"
              },
              {
                PermissionSetId:"13",
                Value:"Call Target 2"
              },
              {
                PermissionSetId:"14",
                Value:"Call Target 3"
              },
              {
                PermissionSetId:"15",
                Value:"Call StopLoss"
              },
              {
                PermissionSetId:"16",
                Value:"Call Exit"
              },
              {
                PermissionSetId:"17",
                Value:"Stop Call"
              },
              {
                PermissionSetId:"18",
                Value:"Call Expired"
              },
              {
                PermissionSetId:"19",
                Value:"Strategy Net Profit"
              },
              {
                PermissionSetId:"21",
                Value:"Can Set Permission"
              },
              {
                PermissionSetId:"45",
                Value:"Book Profit 1"
              },
              {
                PermissionSetId:"46",
                Value:"Book Profit 2"
              },
              {
                PermissionSetId:"47",
                Value:"Book Profit 3"
              },
              {
                PermissionSetId:"21",
                Value:"Strategy Net Loss"
              }],
              SelectedNotification:["9","10","11","12","13","14","15","16","17","18","19","20","21","45","46","47"],
              AllNotifications:["9","10","11","12","13","14","15","16","17","18","19","20","21","45","46","47"],
              CallPackagePermissionSetId:["2","42"],
              CallPermissionStatus:1,
              PackagePermissionStatus:1,
              ShowOwnerContactDetails:true,
              SelectedPackage:null,
              AssignedPackages:[],
              ButtonLoader:false,
              AssignedUsers:[],
              SelectedAssignedUserId:null,
              ReceivedPermissionSet:[],
              IsLoading:false
        }
        console.disableYellowBox = true
    }

    ShowNotifications=(itemData)=>{
        return(
            <View style={styles.CheckboxContainer}>
                <Checkbox 
                    status={this.state.SelectedNotification.includes(itemData.item.PermissionSetId) ? "checked":"unchecked"}
                    onPress={() => this.SelectUnselectNotifications(itemData.item.PermissionSetId)}/>
                <NormalText style={{marginBottom:0,color:'black'}}>{itemData.item.Value}</NormalText>  
            </View>
        )
    }

    SelectUnselectNotifications=(Id)=>{
        let TempNotificationsArray=this.state.SelectedNotification
        if(!TempNotificationsArray.includes(Id))
        {
            TempNotificationsArray.push(Id)
            this.setState({SelectedNotification:TempNotificationsArray})
        }
        else
        {
            
            let index = TempNotificationsArray.indexOf(Id)
            if(index >= 0 )
            {
                TempNotificationsArray.splice(index,1)
                this.setState({SelectedNotification:TempNotificationsArray})
            }
        }
    }

    onInitialize=()=>{
            const {AuthHeader,IsOwner,UserId,SuperOwnerId}=this.props.loginState
            const {SelectedUser,RouteNo}=this.props.navigation.state.params

            if(RouteNo === 2)
            {
                this.setState({IsLoading:true})
                let payload={
                    forPackageId:this.props.navigation.state.params.PackageId,
                    forOwnerId:this.props.navigation.state.params.SelectedUser
                }

                get_assigned_users(AuthHeader,payload).then(result =>{
                    if(result.IsSuccess)
                    {
                        this.setState({AssignedUsers: result.Data},()=>{
                            this.setState({SelectedAssignedUserId:this.state.AssignedUsers[0].UserId},()=>{
                                this.FetchAssignedPermission(this.state.SelectedAssignedUserId)
                            })
                            this.setState({IsLoading:false});
                        })
                    }
                    else
                    {
                        this.setState({IsLoading:false})
                        verbose(false,"Users Fetch Error","There was An Error Fetching Assigned Users.Please Try Again")
                    }
                })
            }
            else
            {
                // IsOwner ? UserId:SuperOwnerId
            let payload={
                forOwnerId:this.props.navigation.state.params.OwnerId,
                userTypeId:"",
                assignedToMe:true,
                forUserId:SelectedUser,
                AuthHeader:AuthHeader,
                createdByMe:"",
                currentPage:"1",
                pageSize:"100",
                forDebug:false
            }

            console.log("on Initialize",payload)

            get_packages(payload).then(result=>{
                if(result.IsSuccess)
                {
                    this.setState({AssignedPackages:result.Data})
                }
            })
            }

    }

    FetchAssignedPermission=(SelectedUser)=>{
        const {AuthHeader}=this.props.loginState
        const {PackageId}=this.props.navigation.state.params

        let payload={
            ForPackageId:PackageId,
            ForUserId:SelectedUser
        }

        console.log("Permissions Payload",payload)
        get_package_permissions(AuthHeader,payload).then(result => {
            if(result.IsSuccess)
            {
                this.setState({ReceivedPermissionSet:result.Data},()=>{
                    let tempAccessRT=[];
                    this.state.ReceivedPermissionSet.forEach(result => {
                        if(result.PermissionSetId !== 42 && result.PermissionSetId !== 2)
                        {
                          if(result.CanView)
                          {
                            tempAccessRT.push(result.PermissionSetId.toString())
                          }
                        }
                        else if(result.PermissionSetId === 2 )
                        {
                            if(result.CanManage === true && result.CanView === true)
                            {
                            this.setState({CallPermissionStatus:1})
                            }
                            else if(result.CanManage === false && result.CanView === true)
                            {
                            this.setState({CallPermissionStatus:2})
                            }
                            else
                            {
                            this.setState({CallPermissionStatus:3})
                            }
                        
                        }
                        else if(result.PermissionSetId === 42)
                        {
                          if(result.CanManage === true && result.CanView === true)
                          {
                            this.setState({PackagePermissionStatus:1})
                          }
                          else if(result.CanManage === false && result.CanView === true)
                          {
                            this.setState({PackagePermissionStatus:2})
                          }
                          else
                          {
                            this.setState({PackagePermissionStatus:3})
                          }
                          if(result.ShowOwnerName && result.ShowOwnerContactNo)
                          {
                            this.setState({ShowOwnerContactDetails:true})
                          }
                          else
                          {
                            this.setState({ShowOwnerContactDetails:false})
                          }
                        }
                    })
                    this.setState({SelectedNotification:tempAccessRT},()=>{
                        console.log(this.state.SelectedNotification)
                      })
                })
            }
            else
            {
                verbose(false,"Permissions Not Fetched","There Was An Error Fetching Permissions for the Selected User")
            }
        })
    }

    ChangeCallPermissionStatus=(status)=>{
        this.setState({CallPermissionStatus:status})
    }
    
    ChangePackagePermissionStatus=(status)=>{
        this.setState({PackagePermissionStatus:status})
    }

    ChangeShowOwnerDetails=(status)=>{
        this.setState({ShowOwnerContactDetails:status})
    }

    ApplyPackagePermission=(payload)=>{
        this.setState({ButtonLoader:true})
        upsert_package_permisssion(this.props.loginState.AuthHeader,payload).then(result => {
            console.log("Assignment Result",result);
            if(result.IsSuccess)
            {
                this.setState({ButtonLoader:false});
                verbose(true,"Assignment Successfull","Permissions Were Assigned Successfully For The Selected User")
            }
            else
            {
                this.setState({ButtonLoader:false});
                verbose(false,"Assignment Failed","Failed To Assign Permissions For The Selected User")
            }
        })
    }

    ChangeAssignedUser=(val)=>{
        this.setState({SelectedAssignedUserId:val},()=>{
            this.FetchAssignedPermission(this.state.SelectedAssignedUserId)
        })
    }

    onSubmitPermissions=()=>{
        this.setState({ButtonLoader:true})
       const {RouteNo,SelectedUser}=this.props.navigation.state.params
        if(RouteNo === 1)
        {
            let Payload=[]

            if(this.state.SelectedPackage === null)
            {
                console.log("In 1")
              this.state.AssignedPackages.forEach(ReceivedPackage => {
                this.state.CallPackagePermissionSetId.forEach((element,index)=>{
                  Payload.push( {
                    "UserId": SelectedUser,
                    "PermissionSetId": element,
                    "PackageId": ReceivedPackage.PackageId,
                    "CanManage":index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true :false,
                    "CanView": index === 0 ? this.state.CallPermissionStatus === 1 || this.state.CallPermissionStatus === 2 ? true:false:this.state.PackagePermissionStatus === 1 || this.state.PackagePermissionStatus === 2 ? true:false,
                    "CanCreate":index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true:false,
                    "CanEdit": index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true:false,
                    "CanDeactivate": false,
                    "CanViewPermissions": false,
                    "CanSetPermissions": false,
                    "ShowOwnerName": this.state.ShowOwnerContactDetails,
                    "ShowOwnerContactNo": this.state.ShowOwnerContactDetails,
                    "ShowProviderContactName": !this.state.ShowOwnerContactDetails,
                    "ShowProviderContactNo": !this.state.ShowOwnerContactDetails,
                    "WithCallLimit": 0
                  })
                })
            
                this.state.AllNotifications.forEach(element => {
                  Payload.push( {
                    "UserId": SelectedUser,
                    "PermissionSetId": element,
                    "PackageId": ReceivedPackage.PackageId,
                    "CanManage": this.state.SelectedNotification.includes(element),
                    "CanView": this.state.SelectedNotification.includes(element),
                    "CanCreate": this.state.SelectedNotification.includes(element),
                    "CanEdit": this.state.SelectedNotification.includes(element),
                    "CanDeactivate": false,
                    "CanViewPermissions": false,
                    "CanSetPermissions": false,
                    "ShowOwnerName": this.state.ShowOwnerContactDetails,
                    "ShowOwnerContactNo": this.state.ShowOwnerContactDetails,
                    "ShowProviderContactName": !this.state.ShowOwnerContactDetails,
                    "ShowProviderContactNo": !this.state.ShowOwnerContactDetails,
                    "WithCallLimit": 0
                  })
                });
              });
              this.ApplyPackagePermission(Payload)
            //   console.log("257",Payload)
            }
            else
            {
                console.log("In 2")
              this.state.AssignedPackages.forEach(ReceivedPackage => {
                  console.log("237",this.state.SelectedPackage)
                if(ReceivedPackage.PackageId === this.state.SelectedPackage)
                {
                  this.state.CallPackagePermissionSetId.forEach((element,index)=>{
                    Payload.push( {
                      "UserId": SelectedUser,
                      "PermissionSetId": element,
                      "PackageId": ReceivedPackage.PackageId,
                      "CanManage":index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true :false,
                      "CanView": index === 0 ? this.state.CallPermissionStatus === 1 || this.state.CallPermissionStatus === 2 ? true:false:this.state.PackagePermissionStatus === 1 || this.state.PackagePermissionStatus === 2 ? true:false,
                      "CanCreate":index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true:false,
                      "CanEdit": index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true:false,
                      "CanDeactivate": false,
                      "CanViewPermissions": false,
                      "CanSetPermissions": false,
                      "ShowOwnerName": this.state.ShowOwnerContactDetails,
                      "ShowOwnerContactNo": this.state.ShowOwnerContactDetails,
                      "ShowProviderContactName": !this.state.ShowOwnerContactDetails,
                      "ShowProviderContactNo": !this.state.ShowOwnerContactDetails,
                      "WithCallLimit": 0
                    })
                  })
              
                  this.state.AllNotifications.forEach(element => {
                    Payload.push( {
                      "UserId": SelectedUser,
                      "PermissionSetId": element,
                      "PackageId": ReceivedPackage.PackageId,
                      "CanManage": this.state.SelectedNotification.includes(element),
                      "CanView": this.state.SelectedNotification.includes(element),
                      "CanCreate": this.state.SelectedNotification.includes(element),
                      "CanEdit": this.state.SelectedNotification.includes(element),
                      "CanDeactivate": false,
                      "CanViewPermissions": false,
                      "CanSetPermissions": false,
                      "ShowOwnerName": this.state.ShowOwnerContactDetails,
                      "ShowOwnerContactNo": this.state.ShowOwnerContactDetails,
                      "ShowProviderContactName": !this.state.ShowOwnerContactDetails,
                      "ShowProviderContactNo": !this.state.ShowOwnerContactDetails,
                      "WithCallLimit": 0
                    })
                  });
                }
              })
              this.ApplyPackagePermission(Payload)
          
            }
          }
          else
          {
            let Payload=[]

            this.state.CallPackagePermissionSetId.forEach((element,index)=>{
              Payload.push( {
                "UserId": this.state.SelectedAssignedUserId,
                "PermissionSetId": element,
                "PackageId": this.props.navigation.state.params.PackageId,
                "CanManage":index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true :false,
                "CanView": index === 0 ? this.state.CallPermissionStatus === 1 || this.state.CallPermissionStatus === 2 ? true:false:this.state.PackagePermissionStatus === 1 || this.state.PackagePermissionStatus === 2 ? true:false,
                "CanCreate":index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true:false,
                "CanEdit": index === 0 ? this.state.CallPermissionStatus === 1 ? true :false:this.state.PackagePermissionStatus === 1 ? true:false,
                "CanDeactivate": false,
                "CanViewPermissions": false,
                "CanSetPermissions": false,
                "ShowOwnerName": this.state.ShowOwnerContactDetails,
                "ShowOwnerContactNo": this.state.ShowOwnerContactDetails,
                "ShowProviderContactName": !this.state.ShowOwnerContactDetails,
                "ShowProviderContactNo": !this.state.ShowOwnerContactDetails,
                "WithCallLimit": 0
              })
            })
        
            this.state.AllNotifications.forEach(element => {
              Payload.push( {
                "UserId": this.state.SelectedAssignedUserId,
                "PermissionSetId": element,
                "PackageId": this.props.navigation.state.params.PackageId,
                "CanManage": this.state.SelectedNotification.includes(element),
                "CanView": this.state.SelectedNotification.includes(element),
                "CanCreate": this.state.SelectedNotification.includes(element),
                "CanEdit": this.state.SelectedNotification.includes(element),
                "CanDeactivate": false,
                "CanViewPermissions": false,
                "CanSetPermissions": false,
                "ShowOwnerName": this.state.ShowOwnerContactDetails,
                "ShowOwnerContactNo": this.state.ShowOwnerContactDetails,
                "ShowProviderContactName": !this.state.ShowOwnerContactDetails,
                "ShowProviderContactNo": !this.state.ShowOwnerContactDetails,
                "WithCallLimit": 0
              })
            });

            this.ApplyPackagePermission(Payload)
          }
        }
    

    

    render()
    {
    
    let ShowPackages=this.state.AssignedPackages.map((result,index)=>{
        return (
            <Picker.Item key={index} label={result.PackageName} value={result.PackageId} />
        )
    })

    let ShowAssignedUsers=this.state.AssignedUsers.map((result,index)=>{
        return (
            <Picker.Item key={index} label={result.UserName} value={result.UserId} />
        )
    })

        return(
            <Container style={styles.PackagePermissionContainer}>
                <ScrollView>
                <NavigationEvents onDidFocus={()=>this.onInitialize()}/>
                {this.props.navigation.state.params.RouteNo === 1 ? 
                <View style={styles.PickerContainer}>
                    <NormalText style={{color:'black',fontSize:14}}>Select Package</NormalText>
                    <View style={styles.PackagePickerContainer}>
                        <Picker selectedValue={this.state.SelectedPackage} onValueChange={(val)=> this.setState({SelectedPackage:val}) } >
                            <Picker.Item key={1} label="All" value={null} />
                            {ShowPackages}
                        </Picker> 
                    </View>
                </View>:
                this.state.AssignedUsers.length > 0 ?
                <View style={styles.PickerContainer}>
                    <NormalText style={{color:'black',fontSize:14}}>Select User</NormalText>
                    <View style={styles.PackagePickerContainer}>
                        <Picker selectedValue={this.state.SelectedAssignedUserId} onValueChange={(val)=> this.ChangeAssignedUser(val)} >
                            {ShowAssignedUsers}
                        </Picker> 
                    </View>
                </View>:null}
                <View style={styles.PackagePermission}>
                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading="Call Permissions">
                        <View style={styles.CustomCollapsibleCardContent}>
                            <RadioButton.Group onValueChange={this.ChangeCallPermissionStatus}>
                                <RBContainer style={styles.CustomRadioButton}>
                                    <RadioButton color="black" uncheckedColor="black" value={1} status={this.state.CallPermissionStatus == 1 ? 'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>Create and Manage</NormalText>
                                </RBContainer>
                                <RBContainer style={styles.CustomRadioButton}>
                                    <RadioButton color="black" uncheckedColor="black" value={2} status={this.state.CallPermissionStatus === 2 ?'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>View Only</NormalText>
                                </RBContainer>
                                <RBContainer style={styles.CustomRadioButton}>
                                    <RadioButton color="black" uncheckedColor="black" value={3} status={this.state.CallPermissionStatus === 3 ? 'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>None</NormalText>
                                </RBContainer>
                            </RadioButton.Group>
                        </View>
                    </CollapsibleCard>
                </View>

                <View style={styles.PackagePermission}>
                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading="Package Permissions">
                        <View style={styles.CustomCollapsibleCardContent}>
                            <RadioButton.Group onValueChange={this.ChangePackagePermissionStatus}>
                                <RBContainer style={styles.CustomRadioButton}>
                                    <RadioButton color="black" uncheckedColor="black" value={1} status={this.state.PackagePermissionStatus == 1 ? 'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>Create and Manage</NormalText>
                                </RBContainer>
                                <RBContainer style={styles.CustomRadioButton}>
                                    <RadioButton color="black" uncheckedColor="black" value={2} status={this.state.PackagePermissionStatus == 2 ? 'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>View Only</NormalText>
                                </RBContainer>
                                <RBContainer style={styles.CustomRadioButton}>
                                    <RadioButton color="black" uncheckedColor="black" value={3} status={this.state.PackagePermissionStatus == 3 ? 'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>None</NormalText>
                                </RBContainer>
                            </RadioButton.Group>
                        </View>
                    </CollapsibleCard>
                </View>

                <View style={styles.PackagePermission}>
                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading="Contact Permissions">
                        <View style={styles.CustomCollapsibleCardContent}>
                            <RadioButton.Group onValueChange={this.ChangeShowOwnerDetails}>
                                <RBContainer style={{...styles.CustomRadioButton,...{width:"50%"}}}>
                                    <RadioButton color="black" uncheckedColor="black" value={true} status={this.state.ShowOwnerContactDetails ? 'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>Show Owner Details</NormalText>
                                </RBContainer>
                                <RBContainer style={{...styles.CustomRadioButton,...{width:"50%"}}}>
                                    <RadioButton color="black" uncheckedColor="black" value={false} status={!this.state.ShowOwnerContactDetails ? 'checked':'unchecked'}/>
                                    <NormalText style={{marginBottom:0,color:'black'}}>Show Provider Details</NormalText>
                                </RBContainer>
                            </RadioButton.Group>
                        </View>
                    </CollapsibleCard>
                </View>

                <View style={styles.PackagePermission}>
                    <CollapsibleCard style={styles.CustomCollapsibleCard} Heading="Notifications">
                        <View style={styles.CustomCollapsibleCardContentNotifications}>
                            <FlatList 
                                keyExtractor={(item,index)=>index.toString()}
                                data={this.state.NotificationArray}
                                renderItem={this.ShowNotifications}
                                numColumns={2}/>
                        </View>
                    </CollapsibleCard>
                </View>

                <View style={styles.ApplyPermissionsContainer}>
                    <TouchableOpacity onPress={()=>this.onSubmitPermissions()}>
                        <CustomButton style={{width:250}}> 
                        {this.state.ButtonLoader ? 
                            <ActivityIndicator size="small" color="white" />
                            :<NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Apply Permissions</NormalText>}
                        </CustomButton>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    PackagePermissionContainer:{
        padding:10,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        backgroundColor:"#E9EAEF"
    },
    PickerContainer:{
        width:'100%',
        marginBottom:10
    },
    PackagePickerContainer:{
        width:'100%',
        height:35,
        borderWidth:1,
        borderRadius:5,
        borderColor:"#CBCFD6",
        justifyContent:"center"
    },
    PackagePermission:{
        marginVertical:5
    },
    CustomCollapsibleCard:{
        width:'100%',
        borderRadius:10
    },
    CustomCollapsibleCardContent:{
        padding:20,
        flexDirection:'row',
        height:65,
        width:'100%',
        justifyContent:'space-around'
    },
    CustomCollapsibleCardContentNotifications:{
        padding:10,
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between'
    },
    CustomRadioButton:{
        width:'33%',
        alignItems:'center',
        justifyContent:'center'
    },
    CheckboxContainer:{
        width:'50%',
        flexDirection:'row',
        alignItems:'center',
    },
    ApplyPermissionsContainer:{
        width:'100%',
        alignItems:'center'
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

export default connect(mapStateToProps,mapDispatchToProps)(PackagePermission);