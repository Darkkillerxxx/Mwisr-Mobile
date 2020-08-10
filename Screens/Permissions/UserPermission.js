import React from 'react';
import { View,StyleSheet,FlatList,ScrollView, TouchableOpacity,ToastAndroid } from 'react-native';
import {NavigationEvents} from 'react-navigation'
import {get_user_permission_set,upsert_user_permission} from '../../Utils/api'
import { connect }from 'react-redux'
import Card from '../../Components/Card';
import Container from '../../Components/Container';
import CollapsibleCard from '../../Components/CollapsibleCard';
import NormalText from '../../Components/NormalText';
import MwisrSelector from '../../Components/MwisrSelector';
import CustomButton from '../../Components/Button';

class UserPermission extends React.Component{
    constructor(){
        super()
        this.state={
            ReceivedPermissions:[]
        }
    }


    onInitialize=()=>{
        const {AuthHeader}=this.props.loginState
        const {UserId,OwnerId}=this.props.navigation.state.params
        let payload={
            forUserId:UserId,
            forOwnerId:OwnerId
        } 
        console.log("getPermissions",payload)
        get_user_permission_set(AuthHeader,payload).then(res => {
            if(res.IsSuccess)
            {
                this.setState({ReceivedPermissions:res.Data})
            }
            else
            {
                ToastAndroid.show("Error Showing Permissions",ToastAndroid.SHORT)
            }
        })
    }

    onChangePermissions=(val)=>{
        let tempVal=val.split(',')
        console.log(tempVal)
        let tempPermissions=this.state.ReceivedPermissions

        if(tempVal[1] === "0")
        {
            console.log("If")
            if(tempVal[2] === "1")
            {
                console.log("If 1")
              tempPermissions[tempVal[0]].CanManage=true;
              tempPermissions[tempVal[0]].CanView=true;
              tempPermissions[tempVal[0]].CanEdit=true;
            }
            else if(tempVal[2] === "2")
            {
                console.log("If 2")
              tempPermissions[tempVal[0]].CanManage=false;
              tempPermissions[tempVal[0]].CanView=true;
              tempPermissions[tempVal[0]].CanEdit=false;
            }
            else
            {
                console.log("If 3")
              tempPermissions[tempVal[0]].CanManage=false;
              tempPermissions[tempVal[0]].CanView=false;
              tempPermissions[tempVal[0]].CanEdit=false;
            }
        }
        else
        {
            console.log("Else")
            if(tempVal[2] === "1")
            {
                console.log("In 1")
              tempPermissions[tempVal[0]].CanManageOnlyOwn=true;
              tempPermissions[tempVal[0]].CanViewOnlyOwn=true;
              tempPermissions[tempVal[0]].CanEditOnlyOwn=true;
            }
            else if(tempVal[2] === "2")
            {
                console.log("In 2")
              tempPermissions[tempVal[0]].CanManageOnlyOwn=false;
              tempPermissions[tempVal[0]].CanViewOnlyOwn=true;
              tempPermissions[tempVal[0]].CanEditOnlyOwn=false;
            }
            else
            {
                console.log("In 3")
              tempPermissions[tempVal[0]].CanManageOnlyOwn=false;
              tempPermissions[tempVal[0]].CanViewOnlyOwn=false;
              tempPermissions[tempVal[0]].CanEditOnlyOwn=false;
            }
          }
          this.setState({ReceivedPermissions:tempPermissions})
        }

    onApplyPermissions=()=>{
        let finalPayload=[]
        this.state.ReceivedPermissions.forEach(element => {
            let samplePayload={
            "ForUserId": this.props.navigation.state.params.UserId ,
            "PermissionSetId": element.PermissionSetId,
            "CanManage": element.CanManage,
            "CanEdit": element.CanEdit ,
            "CanView": element.CanView,
            "CanManageOnlyOwn": element.CanManageOnlyOwn,
            "CanEditOnlyOwn": element.CanEditOnlyOwn,
            "CanViewOnlyOwn": element.CanViewOnlyOwn,
            "CanCreate": true,
            "CanDeactivate": true,
            "CanViewPermissions": true,
            "CanSetPermissions": true,
            "CanDeactivateOnlyOwn": true,
            "CanViewPermissionsOnlyOwn": true,
            "CanSetPermissionsOnlyOwn": true,
            "Limit": 100
            }
            finalPayload.push(samplePayload)


            upsert_user_permission(this.props.loginState.AuthHeader,finalPayload).then(result=>{
                if(result.IsSuccess)
                {
                    const {UserId,OwnerId}=this.props.navigation.state.params
                    ToastAndroid.show("Permissions Assigned",ToastAndroid.SHORT)
                    this.props.navigation.navigate('AssignPackage',{
                        route:2,
                        UserId:UserId,
                        OwnerId:OwnerId
                    })
                }
                else
                {
                    ToastAndroid.show("Error Assigning Permissions",ToastAndroid.SHORT)
                }
            })

        });
    }
      


    render() {
        let ShowPermissionCards=this.state.ReceivedPermissions.map((result,index)=>{
            return(
                <CollapsibleCard style={styles.CustomCollapsible} Heading={`${result.GroupName} Permission`}>
                    <View style={styles.CardContent}>
                        <NormalText style={{marginBottom:0,color:'black'}}>{`Access to ${result.OwnerName} ${result.GroupName}`}</NormalText>
                        {result.PossibleStates !== 1 ? 
                        <View style={styles.CardOptions}>
                            <MwisrSelector value={`${index},${1},${1}`} onSelect={this.onChangePermissions} Text={'Manage & View'} Selected={result.CanManageOnlyOwn ? true:false}/>
                            <MwisrSelector value={`${index},${1},${2}`} onSelect={this.onChangePermissions} Text={'View'} Selected={!result.CanManageOnlyOwn && result.CanViewOnlyOwn  ? true:false}/>
                            <MwisrSelector value={`${index},${1},${3}`} onSelect={this.onChangePermissions} Text={'None'} Selected={!result.CanManageOnlyOwn && !result.CanViewOnlyOwn ? true:false}/>
                        </View>:
                        <View style={styles.CardOptions}>
                            <MwisrSelector value={`${index},${1},${1}`} onSelect={this.onChangePermissions} Text={'Yes'} Selected={!result.CanManageOnlyOwn && result.CanViewOnlyOwn  || result.CanManageOnlyOwn ? true:false}/>
                            <MwisrSelector value={`${index},${1},${3}`} onSelect={this.onChangePermissions} Text={'No'} Selected={!result.CanManageOnlyOwn && result.CanViewOnlyOwn  ? true:false}/>
                        </View>}

                        <NormalText style={{marginBottom:0,color:'black'}}>{`Access to ${result.UserName} ${result.GroupName}`}</NormalText>
                        {result.PossibleStates !== 1 ? 
                        <View style={styles.CardOptions}>
                            <MwisrSelector value={`${index},${0},${1}`} onSelect={this.onChangePermissions}  Text={'Manage & View'} Selected={result.CanManage ? true:false}/>
                            <MwisrSelector value={`${index},${0},${2}`} onSelect={this.onChangePermissions} Text={'View'} Selected={!result.CanManage && result.CanView ? true:false}/>
                            <MwisrSelector value={`${index},${0},${3}`} onSelect={this.onChangePermissions} Text={'None'} Selected={!result.CanManage && !result.CanView ? true:false}/>
                        </View>:
                        <View style={styles.CardOptions}>
                            <MwisrSelector value={`${index},${0},${1}`} onSelect={this.onChangePermissions} Text={'Yes'} Selected={!result.CanManage && result.CanView  || result.CanManage ? true:false}/>
                            <MwisrSelector value={`${index},${0},${3}`} onSelect={this.onChangePermissions} Text={'No'} Selected={!result.CanManage && !result.CanView  ? true:false}/>
                        </View>
                        }
                    </View>
              </CollapsibleCard>
            )
        })

        return(
          <Container>
              <NavigationEvents onDidFocus={()=> this.onInitialize()}/>
              <ScrollView>
                {ShowPermissionCards}
              </ScrollView>
              <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={()=>this.onApplyPermissions()} style={{width:300}}>
                        <CustomButton style={{alignSelf:'center'}}>
                            <NormalText style={{marginBottom:0,color:'white'}}>Apply Permissions</NormalText>
                        </CustomButton>
                    </TouchableOpacity>
              </View>
          </Container>
        )
    }
}


const styles = StyleSheet.create({
    CustomCollapsible:{
        width:'95%',
        margin:10,
        borderRadius:5
    },
    CardContent:{
        width:'100%',
        alignItems:'center',
        padding:10
    },
    CardOptions:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:15
    },
    ButtonContainer:{
        marginTop:10,
        width:'100%',
        alignItems:'center',
        padding:10
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

export default connect(mapStateToProps,mapDispatchToProps)(UserPermission);