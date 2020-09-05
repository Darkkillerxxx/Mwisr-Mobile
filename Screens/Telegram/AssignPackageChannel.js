import React from 'react'
import {StyleSheet,View,Picker,TouchableOpacity} from 'react-native'
import { connect }from 'react-redux'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import {get_channel_packages} from '../../Utils/api'
import CustomButton from '../../Components/Button'

class AssignPackageChannels extends React.Component{
    constructor()
    {
        super()
        this.state={
            ShowModal:false,
            isLoading:false,
            ButtonLoader:false,
            ShowAssigned:true,
            ReceivedChannels:[],
            ReceivedChannelsCopy:[],
            ChannelValue:"",
            SelectedChannelName:"",
            SelectedChannelId:"",
            SelectedChannelIndex:null
        }
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
    }

    SelectChannel=(val)=>{
        let tempVal=val.split(',')
        this.setState({ChannelValue: val})
        this.setState({SelectedChannelName:tempVal[1]},()=>{
            console.log(this.state.SelectedChannelName)
        })
        this.setState({SelectedChannelId:tempVal[0]})
        this.setState({SelectedChannelIndex:tempVal[2]})
    }

    render()
    {
        let ShowChannels=this.state.ReceivedChannels.map((result,index)=>(
            <Picker.Item value={`${result.ChannelId},${result.Title},${result.index}`} label={result.Title} />
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
                
                <View style={styles.PackagesContainer}>
                    {this.state.ShowAssigned ? null:null}
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