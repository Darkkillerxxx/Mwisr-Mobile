import React from 'react'
import { View, StyleSheet,ScrollView,AsyncStorage } from 'react-native'
import { Image } from 'react-native-animatable'
import {get_user_photo} from '../Utils/api'
import { connect }from 'react-redux'
import NormalText from './NormalText'
import {FontAwesome}  from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {setRoute,setLogin} from '../store/Actions/ActionLogin'
import { NavigationActions } from 'react-navigation';
class CustomDrawer extends React.Component{
    constructor()
    {
        super()
        this.state={
            Image:require('../assets/Images/Analyst.png'),
            ImageError:false,
            UriImage:null,
            MenuContents:[
                {
                    Name:"Profile",
                    Icon:"user",
                    SubContents:[],
                    Chevron:false,
                    Expanded:null,
                    isVisible:true
                },
                {
                    Name:"Calls",
                    Icon:"phone",
                    isVisible:true,
                    SubContents:[
                        {
                            Key:"ViewCalls",
                            Name:"View All Calls",
                            isVisible:true
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Packages",
                    Icon:"dropbox",
                    isVisible:true,
                    SubContents:[
                        {
                            Key:'ViewPackage',
                            Name:"View Packages",
                            isVisible:true
                        },
                        {
                            Key:"AssignPackage",
                            Name:"Assign Packages",
                            isVisible:true,
                            info:{
                                route:null,
                                UserId:null,
                                OwnerId:null
                            }
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Users",
                    Icon:"users",
                    isVisible:true,
                    SubContents:[
                        {
                            Name:"Owner List",
                            isVisible:true
                        },
                        {
                            Key:"Sub",
                            Name:"Sub-Broker List",
                            isVisible:true
                        },
                        {
                            Key:"Analyst",
                            Name:"Analyst List",
                            isVisible:true
                        },
                        {
                            Key:"Partner",
                            Name:"Partner List",
                            isVisible:true
                        },
                        {
                            Name:"Customer List",
                            isVisible:true
                        },
                        {
                            Key:"AddUser",
                            Name:"Add User",
                            isVisible:true
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Reports",
                    Icon:"file-text",
                    isVisible:true,
                    SubContents:[
                        {
                            Name:"Add Report",
                            isVisible:true
                        },
                        {
                            Key:"ViewReports",
                            Name:"View Report",
                            isVisible:true
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Telegram",
                    Icon:"paper-plane",
                    isVisible:true,
                    SubContents:[
                        {
                            Name:"Configure Telegram",
                            isVisible:true
                        },
                        {
                            Name:"Package Channel",
                            isVisible:true
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Message",
                    Icon:"mobile-phone",
                    isVisible:true,
                    SubContents:[
                        {
                            Name:"Send Message",
                            isVisible:true
                        },
                        {
                            Name:"Received Message",
                            isVisible:true
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Subscription",
                    Icon:"gift",
                    isVisible:true,
                    SubContents:[
                        {
                            Name:"Buy Subscription",
                            isVisible:true
                        },
                        {
                            Name:"Add-Ons",
                            isVisible:true
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Settings",
                    Icon:"wrench",
                    isVisible:true,
                    SubContents:[
                        {
                            Name:"Notifications",
                            isVisible:true
                        },
                        {
                            Name:"Brokerage Account",
                            isVisible:true
                        }
                    ],
                    Chevron:true,
                    Expanded:false
                },
                {
                    Name:"Order Book",
                    Icon:"book",
                    SubContents:[],
                    Chevron:false,
                    Expanded:null,
                    isVisible:true
                },
                {
                    Name:"Positional Book",
                    Icon:"book",
                    SubContents:[],
                    Chevron:false,
                    Expanded:null,
                    isVisible:true
                },
                {
                    Name:"Trade Book",
                    Icon:"book",
                    SubContents:[],
                    Chevron:false,
                    Expanded:null,
                    isVisible:true
                },
                {
                    Name:"Logout",
                    Icon:"sign-out",
                    SubContents:[],
                    Chevron:false,
                    Expanded:null,
                    Key:"LogOut",
                    isVisible:true
                }
            ]
        }
    }

    componentDidMount()
    {
        const {AuthHeader}=this.props.loginState
        console.log("Route State",this.props.routeState)
        get_user_photo(AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                // console.log("Result Image",result.Data.URL)
                this.setState({UriImage:result.Data.URL})
            }
        })

        if(!this.props.loginState.isOwner)
        {
            let TempMenuContents=this.state.MenuContents
            TempMenuContents[3].SubContents[0].isVisible=false
            this.setState({MenuContent:TempMenuContents})
        }
    }

    ExpandMinimizeMenu=(index)=>{
        let TempMenuContents=this.state.MenuContents;
        TempMenuContents[index].Expanded = !TempMenuContents[index].Expanded
        this.setState({MenuContent:TempMenuContents})
    }

    NavigateToRoute=(Route,Info)=>{
        if(Route === "LogOut")
        {
            this.props.onSetRoute("")
            this.props.onSetLogin([])
            AsyncStorage.clear().then(()=>{
                this.props.navigation.navigate('PreDB',{},NavigationActions.navigate({routeName:'Login'}))
            })
        }
        else
        {
            this.props.onSetRoute(Route)
            this.props.navigation.navigate(Route,Info === undefined ? null:Info)
        }
    }


    render()
    {
        const {UserName,EMailId}=this.props.loginState

        let MenuContent=this.state.MenuContents.map((data,index)=>{
            return(
                data.isVisible ?
                <View key={index} >
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                        <View style={{width:'33.33%',alignItems:'flex-start',paddingHorizontal:10}}>
                            <FontAwesome name={data.Icon} size={18} color="white" />
                        </View>
                        <View style={{width:'33.33%',alignItems:'flex-start'}}>
                            {
                                  !data.Chevron ? 
                                  <TouchableOpacity onPress={()=>data.Key !== undefined ? this.NavigateToRoute(data.Key,data.info):null}>
                                        <NormalText style={{color:'white',fontSize:14}}>{data.Name}</NormalText>
                                   </TouchableOpacity>:
                                   <NormalText style={{color:'white',fontSize:14}}>{data.Name}</NormalText>
                            }
                          
                        </View>
                        <View style={{width:'33.33%',alignItems:'flex-end',paddingHorizontal:5}}>
                            {
                            data.Chevron ? 
                                    <TouchableOpacity onPress={()=>this.ExpandMinimizeMenu(index)}>
                                         <FontAwesome name={data.Expanded ? "chevron-up" : "chevron-down"} size={18} color="white" />
                                    </TouchableOpacity>
                                  :null  
                            }
                        </View>
                    </View>
                    {data.Expanded ? 
                        data.SubContents.map((data,index)=>{
                            return(
                                data.isVisible ? 
                                <View key={index} style={{width:'80%',alignItems:'flex-end'}}>
                                    <TouchableOpacity onPress={()=>{
                                        data.Key !== undefined ? 
                                        this.NavigateToRoute(data.Key,data.info)
                                        :null
                                        }}>
                                        <NormalText style={{color:`${this.props.routeState === data.Key ? "yellow":"white"}`,fontSize:14,textAlign:'left'}}>{data.Name}</NormalText>
                                    </TouchableOpacity>
                                </View>:null
                            )
                        })
                        :null    
                    }
                    
                </View>:null
                
            )
        })
        return(
            <View style={styles.MenuContainer}>
                <Image 
                    source={this.state.ImageError ? this.state.Image :{uri:this.state.UriImage}} 
                    onError={()=>this.setState({ImageError:true})} 
                    style={styles.ImageContainer} />
                
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                    <NormalText style={{color:'white',fontSize:16,marginBottom:0}}>{UserName}</NormalText>
                    <NormalText style={{color:'white',fontSize:10,marginBottom:0}}>{EMailId}</NormalText>
                </View>

                <ScrollView style={{flex:1,alignSelf:'stretch',marginTop:25}}>
                    {MenuContent}
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    MenuContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        padding:10,
        backgroundColor:'#0f2346'
    },
    ImageContainer:{
        width:100,
        height:100,
        borderRadius:100,
        overflow:'hidden',
        resizeMode:'cover',
        borderColor:'white',
        borderWidth:2
    }
})

const mapStateToProps= state =>{
    return{
        loginState:state.login.login,
        routeState:state.login.RouteName
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetRoute:(response)=>dispatch(setRoute(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomDrawer);