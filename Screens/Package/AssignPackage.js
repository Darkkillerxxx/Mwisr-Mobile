import React from 'react'
import {View, StyleSheet,Picker,ActivityIndicator,TouchableOpacity,FlatList, ToastAndroid} from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import {NavigationEvents} from 'react-navigation';
import { connect }from 'react-redux'
import {get_sub_list, assign_Package,verbose} from '../../Utils/api'
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

const AddStep = ["Select User","Select Packages","Review Packages"];
const AddUserStep=["Select Packages","Review Packages"]


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
            SelectedPackageArray:[],
            ButtonLoading:false,
            ErrCode:0
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
                // this.AssignPackage()
                this.setState({AssignPart:2})
                this.setState({StepState:2})
            }
            if(this.state.AssignPart === 2)
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
            this.setState({ErrorCode:0})
            return true
            
        }
        else if(this.state.AssignPart === 1)
        {
            if(this.state.SelectedPackage.length === 0)
            {
                this.setState({ErrorCode:2})
                return false
            }
            this.setState({ErrorCode:0})
            return true
        }
        else if(this.state.AssignPart === 2)
        {
          this.setState({ErrorCode:0})
          return true    
        }
    }

    GetSubList=(UserType)=>{
        get_sub_list(null,UserType,true,this.props.loginState.AuthHeader).then(result =>{
            if(result.IsSuccess)
                {
                        this.setState({User:result.Data},()=>{
                        this.setState({SelectedUser:result.Data[0].UserId})
                        this.setState({isLoading:false})
                    })
                }
        })
    }


    Inititialize=()=>{
        const {UserId,OwnerId,route}=this.props.navigation.state.params
        console.log("Route",route)
        if(route === 2 || route === 3)
         {
                this.setState({SelectedUser:UserId},()=>{
                    this.setState({AssignPart:1},()=>{
                        this.setState({StepState:0},()=>{
                            this.fetchPackage()
                        })
                    })
                })
         }
         else
         {
            this.setState({AssignPart:0})
            this.setState({StepState:0})
            this.setState({isLoading:true})
            this.GetSubList(this.state.SelectedUserType)
         }
    }

    LoseFocus=()=>{   
        console.log("Losing Focus")
        this.setState({SelectedPackage:[]})
        this.setState({SelectedPackageArray:[]})
        this.setState({AssignPart:0})
        this.setState({StepState:0})
        this.setState({Packages:[]})
        this.setState({AssignedPackages:[]})
        this.setState({AssignedPackagesId:[]})
        this.setState({SelectedPackage:[]})
        this.setState({SelectedUser:null})
    }

    fetchPackage=()=>{
        const {AuthHeader,IsOwner,UserId,SuperOwnerId}=this.props.loginState
        const {OwnerId,route}=this.props.navigation.state.params

        let payload1={
            forOwnerId:IsOwner ? UserId:SuperOwnerId,
            userTypeId:"",
            assignedToMe:route === null ? false:"",//temp soln.
            forUserId:route === null ? this.state.SelectedUser:"",//temp soln.
            AuthHeader:AuthHeader,
            createdByMe:"",
            currentPage:"1",
            pageSize:"100",
            forDebug:false
        }

        get_packages(payload1).then(result=>{
            if(result.IsSuccess)
            {
                console.log("Payload",payload1);
                console.log("Result",result.Data);
                this.setState({Packages:result.Data},()=>{    
                   if(route === null)
                   {
                    this.setState({ButtonLoading:false},()=>{
                        this.setState({AssignPart:this.state.AssignPart + 1})
                        this.setState({StepState:this.state.StepState + 1})
                    })
                   }
                })
            }
        })
    }

    onDateEdit=(date,id)=>{
        console.log("Date",date,id)
        let TempSelectedPackages=this.state.SelectedPackageArray
        TempSelectedPackages.forEach(element=>{
            if(parseInt(element.PackageId)  === parseInt(id))
            {
                element.ValidTo = date
            }
        })

        this.setState({SelectedPackageArray:TempSelectedPackages})
    }

    ShowUnAssignedPackages=(itemData)=>{
        return(
            <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                          <View style={{width:'80%',alignItems:'center',justifyContent:'center'}}>
                                <MiniPackage ShowDate={false} ShowClose={false} style={{borderLeftColor:getPackageFontColor(itemData.item.PackageTypeName)}} Package={itemData.item} />       
                          </View>
                          <View style={{width:'15%',alignItems:'center',justifyContent:'center'}}>
                            <Checkbox 
                                status={this.state.SelectedPackage.includes(itemData.item.PackageId) ? "checked":"unchecked"}
                                onPress={() => this.SelectUnSelectPackage(itemData.item.PackageId,itemData.item)}/>  
                          </View>
                   </View>
        )
    }

    ShowAssignedPackages=(itemData)=>{
        return(
            <View style={{width:'48%',alignItems:'center',justifyContent:'center',margin:5}}>
                <MiniPackage onDateChange={this.onDateEdit} ShowDate={true} ShowClose={true} style={{borderLeftColor:getPackageFontColor(itemData.item.PackageTypeName)}} Package={itemData.item} />
            </View>
        )
    }

    StringifyOwnerIds=(UserId)=>{
        let TempOwnerIds=[]

        this.state.SelectedPackageArray.forEach(Id=>{
            TempOwnerIds.push(UserId)
        })

        return TempOwnerIds.toString()

    }

    StringifyPackageIds=()=>{
        return this.state.SelectedPackage.toString()
    }

    StringifyUserIds=(SelectedUser)=>{
        let TempUserIds=[]
        this.state.SelectedPackageArray.forEach(Id=>{
            TempUserIds.push(SelectedUser)
        })

        return TempUserIds.toString()

    }

    StringifyDurations=()=>{
        let TempDurations=[]
        this.state.SelectedPackageArray.forEach(Duration=>{
            TempDurations.push(Duration.ValidTo)
        })

        return TempDurations.toString()
    }

    AssignPackage=()=>{
        this.setState({ButtonLoading:true})
        const {AuthHeader,IsOwner,UserId,SuperOwnerId}=this.props.loginState
        let payload={
            "ForOwnerIds":IsOwner ? this.StringifyOwnerIds(UserId):this.StringifyOwnerIds(SuperOwnerId),
            "PackageIds":this.StringifyPackageIds(),
            "AssignedToUserIds":this.StringifyUserIds(this.state.SelectedUser),
            "Durations":this.StringifyDurations()
        }

        assign_Package(AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({ButtonLoading:false})
                verbose(true,"Package Assigned","Selected Packages Were Assigned Successfully")
                if(this.props.navigation.state.params.route !==3)
                {
                    this.props.navigation.navigate('PackagePermission',{
                        RouteNo:1,
                        SelectedUser:this.state.SelectedUser,
                        OwnerId:null
                    })
                } 
            }
            else
            {
                ToastAndroid.show("Error Assigning Packages",ToastAndroid.SHORT)
                //show Error for Assigning Packages
            }
        })

        console.log("Asssign Payload",payload)
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

    SelectUnSelectPackage=(Id,Packages)=>{
        let Temp=this.state.SelectedPackage
        let Temp2=this.state.SelectedPackageArray
        console.log("261",Packages)
        if(!Temp.includes(Id))
        {
            Temp.push(Id)
            Packages.ValidTo="23-10-2021"
            Temp2.push(Packages)
            this.setState({SelectedPackage:Temp})
            this.setState({SelectedPackageArray:Temp2})
        }
        else
        {
            let pos=Temp.indexOf(Id)
            if(pos >= 0)
            {
                Temp.splice(pos,1)
                Temp2.splice(pos,1)
            }
            this.setState({SelectedPackage:Temp})
            this.setState({SelectedPackageArray:Temp2})
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
               <NavigationEvents onDidBlur={()=>this.LoseFocus()} onDidFocus={()=> this.Inititialize()}/>
               <View style={{width:'100%',height:75}}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.state.StepState}
                    labels={this.props.navigation.state.params.route === null  ? AddStep:AddUserStep}
                    stepCount={this.props.navigation.state.params.route ==null ? 3:2}
                   />
               </View>
               {this.state.AssignPart === 0 ?
               <View style={{flex:1,width:'100%'}}>
                    <NormalText style={{fontSize:14,color:'black'}}>Choose User Type : </NormalText>
                    <View style={styles.CustomPicker}>
                        <Picker selectedValue={this.state.SelectedUserType} style={styles.CustomPicker} onValueChange={(val)=>this.setState({SelectedUserType:val},()=>this.GetSubList(val))}>
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
               this.state.AssignPart === 1 ?
               <View style={{flex:1,width:"100%"}}>
                   {this.state.ErrorCode === 2 ?
                    <NormalText style={{fontSize:12,color:'red',marginBottom:5}}>Need To To Select Atleast One Package</NormalText>:null}  
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
                    data={this.state.SelectedPackageArray}
                    renderItem={this.ShowAssignedPackages}
                    numColumns={2}/>
               </View>
               }
               <View style={{height:50,width:'100%',alignItems:'center',justifyContent:'space-evenly',flexDirection:'row'}}>
                    { console.log("433",this.state.AssignPart)}
                    {
                        this.state.AssignPart === 1  ?
                            this.props.navigation.state.params.route !== 2 && this.props.navigation.state.params.route !== 3 ?  
                            <TouchableOpacity style={{width:'45%'}} onPress={()=>this.HandleBackButton()}>
                                <CustomButton style={{width:'100%'}}>
                                    <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Back</NormalText>
                                </CustomButton>
                            </TouchableOpacity>
                            :null
                            :this.state.AssignPart === 2 ? 
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