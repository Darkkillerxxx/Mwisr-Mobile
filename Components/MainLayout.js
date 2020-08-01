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
            ErrorMsg2:""
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
    ErrorDesc:{
        color:'white',
        marginBottom:0,
        fontSize:12,
        textAlign:'center'
    }
})

const mapStateToProps= state =>{
    return{
        ErrMsg:state.login.ErrorMsg
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetMsg:(response)=>dispatch(setMsg(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);