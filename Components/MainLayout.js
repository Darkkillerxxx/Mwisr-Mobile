import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import MWisrNavigator from '../Navigator/Navigator'
import { connect }from 'react-redux'
import {setMsg} from '../store/Actions/ActionLogin'
import NormalText from './NormalText'
import {FontAwesome}  from '@expo/vector-icons';


class MainLayout extends React.Component{
    constructor()
    {
        super()
        this.state={
            DisplayMsg:false,
            ErrorMsg1:"",
            ErrorMsg2:"",
            Message:[],
            MessageBuffer:[],
            ShowMsg:false
        }
    }

    componentDidMount()
    {
        console.log("Error Code :" + this.props.ErrMsg )
    }

    componentDidUpdate(prevProps,prevState,Ss)
    {   
        if(prevProps.ErrMsg !== this.props.ErrMsg)
        {
            console.log("Updated Error Code :" + this.props.ErrMsg)
          switch(this.props.ErrMsg)
          {
              case 401:
                this.setState({ErrorMsg1:"Session Invalid.Please Login Again"},()=>{
                    this.setState({ErrorMsg2:"If You Do Not Remember Logging In From Another Workplace Then Contact Support Immediately"},()=>{
                        this.setState({DisplayMsg:true},()=>{
                            setTimeout(()=>{
                                this.setState({DisplayMsg:false},()=>{
                                    this.props.onSetMsg(null)
                                })
                            },10000)
                        })
                    })
                })
                break;
            
              case 500:
                this.setState({ErrorMsg1:"Internal Server Error"},()=>{
                    this.setState({ErrorMsg2:"It Seems Like An Issue With Our Servers.Please Try Again After Some Time.If The Issue Persists Please Contact Support"},()=>{
                        this.setState({DisplayMsg:true},()=>{
                            setTimeout(()=>{
                                this.setState({DisplayMsg:false},()=>{
                                    this.props.onSetMsg(null)
                                })
                            },10000)
                        })
                    })
                })
               
                break;
            
              case 504:
                console.log("504")
                  this.setState({ErrorMsg1:"Network Error"},()=>{
                        this.setState({ErrorMsg2:"It Seems Like You Cannot Reach Our Servers.Please Check Your Internet Connection"},()=>{
                            this.setState({DisplayMsg:true},()=>{
                                setTimeout(()=>{
                                    this.setState({DisplayMsg:false},()=>{
                                        this.props.onSetMsg(null)
                                    })
                                },10000)
                            })
                        })
                  })
                  
                  break;

              case 408:
                  this.setState({ErrorMsg:"Response Timeout"},()=>{
                    this.setState({ErrorMsg2:"It Seems Like Our Servers Are Not Responding.Please Try Again Later.If The Issue Persist Please Contact Support"},()=>{
                        this.setState({DisplayMsg:true},()=>{
                            setTimeout(()=>{
                                this.setState({DisplayMsg:false},()=>{
                                    this.props.onSetMsg(null)
                                })
                            },10000)
                        })
                    }) 
                  })
                 
                  break;
              
              default:
                 
                  break;
            }
        }


        if(prevProps.Message !== this.props.Message)
        {
            this.setNrmlMsg(this.props.Message)   
        }
    }

    setNrmlMsg=(Msg)=>{
        if(this.state.Message.length === 0)
        {
            let ReceivedMessage=[]
            ReceivedMessage.push(JSON.parse(Msg))
            this.setState({Message: ReceivedMessage},()=>{
                console.log("Showing Message",this.state.Message)
                setTimeout(()=>{
                    this.setState({Message:[]},()=>{
                        setTimeout(()=>{
                            if(this.state.MessageBuffer.length > 0)
                            {
                                console.log("Inside Buffer")
                                this.setNrmlMsg(this.state.MessageBuffer[0])
                                let tempBuffer=this.state.MessageBuffer
                                tempBuffer.splice(0,1)
                                this.setState({MessageBuffer:tempBuffer});
                            }
                        },1500)
                    })
                },5000)
            })
        }
        else
        {
            let Buffer=this.state.MessageBuffer
            Buffer.push(Msg)
            this.setState({MessageBuffer:Buffer})
        }
    }

    render()
    {
        return(
            <View style={{flex:1}}>
                {this.state.DisplayMsg ? 
                    <View style={styles.ErrorMsg}>
                        <View style={{width:'30%',alignItems:'center'}}>
                            <FontAwesome name="exclamation-triangle" size={36} color="white" />
                        </View>
                        <View style={{width:'70%'}}>
                            <NormalText style={styles.ErrorHeading}>{this.state.ErrorMsg1}</NormalText>
                            <NormalText style={styles.ErrorDesc}>{this.state.ErrorMsg2}</NormalText>
                        </View>
                    </View>
                :null}
                {this.state.Message.length > 0 ?
                <View style={styles.Message}>
                    <View style={styles.MessageLeft}>
                        <FontAwesome name="check" size={36} color="white" />
                    </View>
                    <View style={styles.MessageRight}>
                        <NormalText style={styles.MessageHeading}>{this.state.Message[0].Heading}</NormalText>
                        <NormalText style={styles.MessageDesc}>{this.state.Message[0].Description}</NormalText>
                    </View>
                </View>:null}
                <MWisrNavigator />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    ErrorMsg:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'#ed4356',
        alignItems:'center',
        justifyContent:'center',
        padding:15,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5
    },
    ErrorHeading:{
        color:'white',
        marginBottom:5,
        fontSize:15,
        textAlign:'center'
    },
    MessageHeading:{
        color:'white',
        marginBottom:5,
        fontSize:15,
        textAlign:'center'
    },
    ErrorDesc:{
        color:'white',
        marginBottom:0,
        fontSize:12,
        textAlign:'center'
    },
    MessageDesc:{
        color:'white',
        marginBottom:0,
        fontSize:12,
        textAlign:'center'
    },
    Message:{
        minHeight:80,
        width:'95%',
        position:'absolute',
        backgroundColor:'#16d39a',
        elevation:1,
        borderRadius:10,
        alignSelf:'center',
        marginVertical:10,
        flexDirection:'row'
    },
    MessageLeft:{
        width:'20%',
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    },
    MessageRight:{
        width:'80%',
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    }
})

const mapStateToProps= state =>{
    return{
        ErrMsg:state.login.ErrorMsg,
        Message:state.login.Message
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetMsg:(response)=>dispatch(setMsg(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);