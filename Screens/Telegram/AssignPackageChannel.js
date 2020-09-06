import React from 'react'
import {StyleSheet,View,Picker,TouchableOpacity, FlatList} from 'react-native'
import { connect }from 'react-redux'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import {get_channel_packages,getPackageFontColor,get_packages,assign_unassigne_package_channel, verbose} from '../../Utils/api'
import CustomButton from '../../Components/Button'
import MiniPackage from '../../Components/MiniPackage'
import {Checkbox} from 'react-native-paper'

class AssignPackageChannels extends React.Component{
    constructor()
    {
        super()
        this.state={
            ShowModal:false,
            isLoading:false,
            ButtonLoader:false,
            ShowAssigned:true,
            ReceivedPackages:[],
            ReceivedChannels:[],
            ReceivedChannelsCopy:[],
            ChannelValue:"",
            SelectedChannelName:"",
            SelectedChannelId:"",
            SelectedChannelIndex:0,
            SelectedPackage:[]
        }
    }

    get_packages_channels=()=>{
        let Payload={
            forOwnerId:"",
            userTypeId:"",
            assignedToMe:"",
            forUserId:"",
            AuthHeader:this.props.loginState.AuthHeader,
            createdByMe:true,
            currentPage:"1",
            pageSize:"100",
            forDebug:false 
    }

        get_packages(Payload).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({ReceivedPackages:result.Data})
            }
        })
    }

    Init=()=>{
       

        get_channel_packages(this.props.loginState.AuthHeader).then(result => {
            if(result.IsSuccess)
            {
                let channelArr=JSON.parse(result.Data)
                console.log(channelArr.length)
                let channel=[]
                for(let i=0;i<channelArr.length;i++)
                {
                if(channelArr[i].hasOwnProperty("Packages"))
                {
                    channel.push(channelArr[i])
                }
                else
                {
                    channelArr[i].Packages=[]
                    channel.push(channelArr[i])
                }
                }
                console.log("222",channel)
                this.setState({ReceivedChannels:channel},()=>{
                    console.log("1111",this.state.ReceivedChannels)
                    // this.setState({ReceivedChannelsCopy:channel},()=>{
                    // //   this.onSearchSubmit();
                    //   this.setState({ShowSpinner:false})
                    // })
                  })
            }
        })
    }

    componentDidMount() {
        this.Init()
        this.get_packages_channels()
    }


    SelectUnSelectPackage=(Id)=>{
        let temp=this.state.SelectedPackage
        if(!this.state.SelectedPackage.includes(Id))
        {
            temp.push(Id)
        }
        else
        {
            let index=temp.indexOf(Id)
            temp.splice(index,1)
        }
        this.setState({SelectedPackage:temp})
    }

    showAssignedPackages=(itemData)=>{
        return(
            <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                <MiniPackage 
                    Package={itemData.item} 
                    ShowClose={false} 
                    ShowDate={false} 
                    ForTele={true} 
                    style={{borderLeftColor:getPackageFontColor(itemData.item.SegmentName),marginVertical:5,width:'85%',height:90,alignItems:'center'}}/>
                
                <View style={{width:'15%',alignItems:'center',justifyContent:'center'}}>
                  <Checkbox 
                      status={this.state.SelectedPackage.includes(itemData.item.PackageId) ? "checked":"unchecked"}
                      onPress={() => this.SelectUnSelectPackage(itemData.item.PackageId)}/>  
                </View>
            </View>
        )
    }

    showUnAssignedPackages=(itemData)=>{
        return(
            <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                <MiniPackage 
                    Package={itemData.item} 
                    ShowClose={false} 
                    ShowDate={false} 
                    ForTele={false} 
                    style={{borderLeftColor:getPackageFontColor(itemData.item.PackageTypeName),marginVertical:5,width:'85%',height:90,alignItems:'center'}}/>
                
                <View style={{width:'15%',alignItems:'center',justifyContent:'center'}}>
                  <Checkbox 
                      status={this.state.SelectedPackage.includes(itemData.item.PackageId) ? "checked":"unchecked"}
                      onPress={() => this.SelectUnSelectPackage(itemData.item.PackageId)}/>  
                </View>
            </View>
        )
    }

    AssignUnAssignPackage=()=>{
        let payload={
            "PackageId":parseInt(this.state.SelectedPackage.toString()),
            "ChannelIds":parseInt(this.state.SelectedChannelId),
            "UnAssign":this.state.ShowAssigned
        }
        console.log(payload);
        assign_unassigne_package_channel(this.props.loginState.AuthHeader,payload).then(result=>{
            if(result.IsSuccess)
            {
                verbose(true,"Packages Assigned",`Pacakges Sucessfully Have Been Assigned To ${this.state.SelectedChannelName}`)
                this.Init()
            }
            else
            {
                verbose(false,"Assignment Error",result.DisplayMsg)
            }
        })
    }

    SelectChannel=(val)=>{
        let tempVal=val.split(',')
        // console.log("72",tempVal)
        this.setState({ChannelValue: val})
        this.setState({SelectedChannelName:tempVal[1]},()=>{
            console.log(this.state.SelectedChannelName)
        })
        this.setState({SelectedChannelId:tempVal[0]})
        this.setState({SelectedChannelIndex:tempVal[2]})
    }

    ChangeType=()=>{
        this.setState({SelectedPackage:[]})
        this.setState({ShowAssigned:!this.state.ShowAssigned})
    }

    render()
    {
        let ShowChannels=this.state.ReceivedChannels.map((result,index)=>(
            <Picker.Item key={index} value={`${result.ChannelId},${result.Title},${index}`} label={result.Title} />
        ))

        return(
            <Container style={styles.CustomContainer}>
                <View style={styles.SelectorCollector}>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:14}}>Select Channel</NormalText>
                    <View style={styles.PickerContainer}>
                        <Picker selectedValue={this.state.ChannelValue} onValueChange={(val)=>this.SelectChannel(val)}>
                            {ShowChannels}
                        </Picker>
                    </View>

                    <View style={styles.TypeSelectorContainer}>
                        <View style={styles.TypeSelector}>
                            <View style={this.state.ShowAssigned ?  styles.TypesSideSelected:styles.TypeSides}>
                                <TouchableOpacity onPress={()=>this.ChangeType()}>
                                    <NormalText style={{marginBottom:0,color:'black',fontSize:14,color:`${this.state.ShowAssigned ? "white":"#f5bb18"}`}}>Assigned</NormalText>
                                </TouchableOpacity>
                            </View>
                            <View style={this.state.ShowAssigned ?  styles.TypeSides : styles.TypesSideSelected}>
                                <TouchableOpacity onPress={()=>this.ChangeType()}>
                                    <NormalText style={{marginBottom:0,color:'black',fontSize:14,color:`${this.state.ShowAssigned ? "#f5bb18":"white"}`}}>Un-Assigned</NormalText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                
               
                <View style={styles.PackagesContainer}>
                    {/* {console.log("In Render",this.state.ReceivedChannels[this.state.SelectedChannelIndex].Packages)} */}
                    {this.state.ReceivedChannels.length > 0 ? 
                    this.state.ShowAssigned ? 
                    <FlatList 
                        keyExtractor={(item,index)=>index.toString()}
                        data={this.state.ReceivedChannels[this.state.SelectedChannelIndex].Packages}
                        renderItem={this.showAssignedPackages}
                    />:
                    <FlatList 
                        keyExtractor={(item,index)=>index.toString()}
                        data={this.state.ReceivedPackages}
                        renderItem={this.showUnAssignedPackages}
                    />:null}
                </View>

                <View style={styles.AssignButtonContainer}>
                    <TouchableOpacity onPress={()=>this.AssignUnAssignPackage()}>
                        <CustomButton style={{width:150,height:35,borderRadius:5}}>
                            {this.state.ButtonLoader ? 
                            <ActivityIndicator size="small" color="white" />
                            :<NormalText style={{color:'white',marginBottom:0,fontSize:14}}>{this.state.ShowAssigned ? "Un-Assign Pacakges":"Assign Packages"}</NormalText>}
                        </CustomButton>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
     CustomContainer:{
        justifyContent: 'flex-start',
        backgroundColor:"#EAEBF0",
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
    PackagesContainer:{
        width:'100%',
        flex:1
    },
    AssignButtonContainer:{
        width:'100%',
        height:50,
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

export default connect(mapStateToProps,mapDispatchToProps)(AssignPackageChannels);