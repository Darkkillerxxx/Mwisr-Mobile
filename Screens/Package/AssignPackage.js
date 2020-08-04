import React from 'react'
import {View, StyleSheet,Picker,ActivityIndicator,TouchableOpacity,FlatList, ToastAndroid} from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import {NavigationEvents} from 'react-navigation';
import { connect }from 'react-redux'
import {get_sub_list, assign_Package} from '../../Utils/api'
import CustomButton from '../../Components/Button'
import StepIndicator from 'react-native-step-indicator';
import {Checkbox} from 'react-native-paper'
import MiniPackage from '../../Components/MiniPackage';
import {get_packages,getPackageFontColor} from '../../Utils/api'

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#28262B',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#28262B',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#28262B',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#28262B',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#F0B22A',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#F0B22A',
    stepIndicatorLabelFinishedColor: '#28262B',
    stepIndicatorLabelUnFinishedColor: '#fafafa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#28262B'
  }

const AddStep = ["Select User","Un-Assigned Packages","Assigned Packages"];


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
            ],
            SelectedUserType:null,
            User:[],
            SelectedUser:null,
            AssignPart:0,
            isLoading:false,
            StepState:0,
            Packages:[],
            AssignedPackages:[],
            AssignedPackagesId:[],
            SelectedPackage:[],
            ButtonLoading:false,
            ErrCode:null
        }
    }

    Proceed=()=>{
        if(this.validation())
        {
            if(this.state.AssignPart === 0)
            {
                this.setState({ButtonLoading:true})
                this.fetchPackage()
            }
            else if(this.state.AssignPart === 1)
            {
                this.AssignPackage()
            }
        }
    }

    HandleBackButton=()=>{
        this.setState({AssignPart:this.state.AssignPart - 1})
        this.setState({StepState:this.state.StepState - 1})
    }

    validation=()=>{
        if(this.state.AssignPart === 0)
        {
            if(this.state.SelectedUser === null)
            {
                this.setState({ErrCode:1})
                return false
            }
            return true
        }
        else if(this.state.AssignPart === 1)
        {
            return true
        }
        else if(this.state.AssignPart === 2)
        {
            return true
        }
    }


    Inititialize=()=>{
        this.setState({isLoading:true})
        console.log(this.props.loginState)
        get_sub_list(null,this.state.SelectedUserType,true,this.props.loginState.AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({User:result.Data},()=>{
                    this.setState({SelectedUser:result.Data[0].UserId})
                    this.setState({isLoading:false})
                })
            }
        })
    }

    fetchPackage=()=>{
        const {AuthHeader,IsOwner,UserId,SuperOwnerId}=this.props.loginState
        let payload1={
            forOwnerId:IsOwner ? UserId:SuperOwnerId,
            userTypeId:"",
            assignedToMe:false,
            forUserId:this.state.SelectedUser,
            AuthHeader:AuthHeader,
            createdByMe:"",
            currentPage:"1",
            pageSize:"100",
            forDebug:false
        }

        get_packages(payload1).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Packages:result.Data},()=>{    
                    this.setState({ButtonLoading:false},()=>{
                        this.setState({AssignPart:this.state.AssignPart + 1})
                        this.setState({StepState:this.state.StepState + 1})
                    })
                })
            }
        })
    }

    ShowUnAssignedPackages=(itemData)=>{
        return(
            <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                          <View style={{width:'15%',alignItems:'center',justifyContent:'center'}}>
                            <Checkbox 
                                status={this.state.SelectedPackage.includes(itemData.item.PackageId) ? "checked":"unchecked"}
                                onPress={() => this.SelectUnSelectPackage(itemData.item.PackageId)}/>  
                          </View>

                          <View style={{width:'80%',alignItems:'center',justifyContent:'center'}}>
                                <MiniPackage ShowClose={false} style={{borderLeftColor:getPackageFontColor(itemData.item.PackageTypeName)}} Package={itemData.item} />       
                          </View>
                   </View>
        )
    }

    ShowAssignedPackages=(itemData)=>{
        return(
            <View style={{width:'48%',alignItems:'center',justifyContent:'center',margin:5}}>
                <MiniPackage ShowClose={true} style={{borderLeftColor:getPackageFontColor(itemData.item.PackageTypeName)}} Package={itemData.item} />
            </View>
          
        )
    }

    AssignPackage=()=>{
        this.setState({ButtonLoading:true})
        const {AuthHeader,IsOwner,UserId,SuperOwnerId}=this.props.loginState
        let payload={
            "ForOwnerIds":IsOwner ? UserId:SuperOwnerId,
            "PackageIds":this.state.SelectedPackage.toString(),
            "AssignedToUserIds":this.state.SelectedUser,
            "Durations":"23-10-2021"
        }

        assign_Package(AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
                this.fetchAssignPackage()
            }
            else
            {
                //show Error for Assigning Packages
            }
        })
    }

//Code Reduction Posible Here...Can make fetchAssignPackage and Fetch Package into ine function

    fetchAssignPackage=()=>{
        const {AuthHeader,IsOwner,UserId,SuperOwnerId}=this.props.loginState
        let payload={
            forOwnerId:IsOwner ? UserId:SuperOwnerId,
            userTypeId:"",
            assignedToMe:true,
            forUserId:this.state.SelectedUser,
            AuthHeader:AuthHeader,
            createdByMe:"",
            currentPage:"1",
            pageSize:"100",
            forDebug:false
        }

        get_packages(payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({AssignedPackages:result.Data},()=>{    
                    this.setState({ButtonLoading:false},()=>{
                        this.setState({AssignPart:this.state.AssignPart + 1})
                        this.setState({StepState:this.state.StepState + 1})
                    })
                })
            }
        })
    }

    SelectUnSelectPackage=(Id)=>{
        let Temp=this.state.SelectedPackage
        if(!Temp.includes(Id))
        {
            Temp.push(Id)
            this.setState({SelectedPackage:Temp})
        }
        else
        {
            let pos=Temp.indexOf(Id)
            if(pos >= 0)
            {
                Temp.splice(pos,1)
            }
            this.setState({SelectedPackage:Temp})
        }
    }

    
    render()
    {
        let ShowUserTypes=this.state.UserType.map(result=>{
            return(
                <Picker.Item key={result.Id} label={result.Name} value={result.Id} />
            )
        })

        let ShowUsers=this.state.User.map(result=>{
            return(
                <Picker.Item key={result.UserId} label={result.UserName} value={result.UserId} />
            )
        })
       
        return(
           <Container style={styles.AssignContainer}>
               <NavigationEvents onDidFocus={()=> this.Inititialize()}/>
               <View style={{width:'100%',height:75}}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.state.StepState}
                    labels={AddStep}
                    stepCount={3}
                   />
               </View>
               {this.state.StepState === 0 ?
               <View style={{flex:1,width:'100%'}}>
                    <NormalText style={{fontSize:14,color:'black'}}>Choose User Type : </NormalText>
                    <View style={styles.CustomPicker}>
                        <Picker selectedValue={this.state.SelectedUserType} style={styles.CustomPicker} onValueChange={(val)=>this.setState({SelectedUserType:val})}>
                            {ShowUserTypes}
                        </Picker>
                    </View>

                    {!this.state.isLoading ?
                    <View>
                        <NormalText style={{fontSize:14,color:'black',marginTop:15}}>Select User </NormalText>
                        <View style={styles.CustomPicker}>
                            <Picker selectedValue={this.state.SelectedUser} style={styles.CustomPicker} onValueChange={(val)=>this.setState({SelectedUser:val})}>
                                {ShowUsers}
                            </Picker>
                        </View>
                    </View>:
                    <View style={{width:'100%',height:50,alignitems:'center',justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="#FFD764"/>
                    </View>}

               </View>:
               this.state.StepState === 1 ?
               <View style={{flex:1,width:"100%"}}>
                   <FlatList
                    key={1}
                    keyExtractor={(item,index)=>index.toString()}
                    data={this.state.Packages}
                    renderItem={this.ShowUnAssignedPackages}/>
               </View>:
               <View style={{flex:1,width:"100%"}}>
                   <FlatList
                    key={2}
                    keyExtractor={(item,index)=>index.toString()}
                    data={this.state.AssignedPackages}
                    renderItem={this.ShowAssignedPackages}
                    numColumns={2}/>
               </View>
               }
               <View style={{height:50,width:'100%',alignItems:'center',justifyContent:'space-evenly',flexDirection:'row'}}>
                    {
                        this.state.AssignPart === 1 || this.state.AssignPart === 2 ? 
                        <TouchableOpacity style={{width:'45%'}} onPress={()=>this.HandleBackButton()}>
                            <CustomButton style={{width:'100%'}}>
                                <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Back</NormalText>
                            </CustomButton>
                        </TouchableOpacity>:null
                    }
                    <TouchableOpacity style={{width:'45%'}} onPress={()=>this.Proceed()}>
                        <CustomButton style={{width:'100%'}}>
                            {
                                this.state.ButtonLoading ?
                                <ActivityIndicator size="small" color="white" />:
                                <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>{this.state.AssignPart === 0 ? "Proceed":this.state.AssignPart === 1 ? "Assign":"Proceed"}</NormalText>
                            }
                        </CustomButton>
                    </TouchableOpacity>
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
    },
    UserTypes:{
        width:'30%',
        borderWidth:1,
        margin:5,
        padding:7,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        borderColor:'#FFD764'
    },
    CustomPicker:{
        borderWidth:1,
        borderColor:'grey',
        borderRadius:5,
        height:40
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

export default connect(mapStateToProps,mapDispatchToProps)(AssignPackage);