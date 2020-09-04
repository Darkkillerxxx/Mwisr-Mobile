import React from 'react'
import { View,StyleSheet,Image,TouchableOpacity } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import NormalText from './NormalText'
import {FontAwesome}  from '@expo/vector-icons';
import {get_Dashboard} from '../Utils/api'

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            Dashboard:[],
            SelectedIndex:0
        }
    }

    componentDidMount() {
        get_Dashboard(this.props.AuthHeader).then(result => {
            if(result.IsSuccess)
            {
                this.setState({Dashboard:result.Data},()=>{
                    console.log("Length",this.state.Dashboard)
                })
            }
        })
    }

    IncreaseIndex=()=>{
        if(this.state.SelectedIndex !== this.state.Dashboard.length)
        {
            this.setState({SelectedIndex:this.state.SelectedIndex + 1})
        }
    }
    
    DecreaseIndex=()=>{
        if(this.state.SelectedIndex !== 0)
        {
            this.setState({SelectedIndex:this.state.SelectedIndex - 1})
            
        }
    }

    render() {
        return(

            <View style={styles.DashboardContainer} >
                {this.state.Dashboard.length > 0 ?
                <>
                <View style={styles.DashboardTop}>
                    <View>
                        <View>
                            <NormalText style={{...styles.AccuracyNo,...{backgroundColor:'#16d39a'}}}>{parseInt(this.state.Dashboard[this.state.SelectedIndex].Accuracy)}</NormalText>
                        </View>
                        <AnimatedCircularProgress
                        size={80}
                        width={5}
                        fill={parseInt(this.state.Dashboard[this.state.SelectedIndex].Accuracy)}
                        tintColor={'#16d39a'}
                        onAnimationComplete={() =>{}}
                        backgroundColor="white"
                        rotation={180}>
                            {
                                (fill)=>(
                                    <Image source={require('../assets/Images/Analyst.png')} style={styles.ProfilePic}/>
                                )
                            }
                        </AnimatedCircularProgress>
                        <NormalText style={{...styles.AccuracyText,...{backgroundColor:'#16d39a'}}}>Accuracy</NormalText>
                    </View>
                    <View style={styles.NameContainer}>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>{this.state.Dashboard[this.state.SelectedIndex].InformationType === "C" ? this.state.Dashboard[this.state.SelectedIndex].OwnerName:this.state.Dashboard[this.state.SelectedIndex].UserName}</NormalText>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>ID : {this.state.Dashboard[this.state.SelectedIndex].InformationType === "C" ? this.state.Dashboard[this.state.SelectedIndex].OwnerId:this.state.Dashboard[this.state.SelectedIndex].userId}</NormalText>
                        <NormalText style={{marginBottom:0,color:'#4A5A7C',fontSize:14}}>{this.state.Dashboard[this.state.SelectedIndex].InformationType === "C" ? "Company":"Self"}</NormalText>
                    </View>
                </View>

                <View style={styles.DasboardBottom}>
                    <View style={styles.DashboardBottomSides}>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Profit</NormalText>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>₹ {this.state.Dashboard[this.state.SelectedIndex].ProfitPerInvestment}</NormalText>
                    </View>

                    <View style={styles.DashboardBottomSides}>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Calls</NormalText>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}> {this.state.Dashboard[this.state.SelectedIndex].Calls}</NormalText>
                    </View>

                    <View style={styles.DashboardBottomNoBorder}>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>ROI</NormalText>
                        <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>{this.state.Dashboard[this.state.SelectedIndex].ROI} %</NormalText>
                    </View>
                </View>

                {/* <View style={{...styles.LeftRightArrowContainers,...{alignItems:this.state.SelectedIndex === 0 ? 'flex-start':this.state.SelectedIndex === this.state.Dashboard.length ? 'flex-end':""}}}></View> */}

                <View style={{...styles.LeftRightArrowContainers,...{justifyContent:this.state.SelectedIndex === 0 ? 'flex-end':this.state.SelectedIndex === this.state.Dashboard.length ? 'flex-start':'space-between'}}}>
                     
                    {this.state.SelectedIndex !== 0  ?
                    <TouchableOpacity onPress={()=>this.DecreaseIndex()}>
                        <View style={{flexDirection:'row'}}> 
                            <View style={{height:35,width:35,borderRadius:100,backgroundColor:'black',opacity:0.5,alignItems:'center',justifyContent:'center'}}>
                                <FontAwesome name="chevron-left" size={12} color="white" />
                            </View>

                            <View style={{backgroundColor:'black',opacity:0.5,padding:10,justifyContent:'center',marginLeft:5,borderRadius:5,height:10,marginTop:7}}>
                                <NormalText style={{marginBottom:0,color:'white'}}>Previous</NormalText>
                            </View>
                        </View>
                    </TouchableOpacity>:null}

                    {this.state.SelectedIndex !== this.state.Dashboard.length-1 ? 
                    <TouchableOpacity onPress={()=>this.IncreaseIndex()}>
                        <View style={{flexDirection:'row'}}> 
                            <View style={{backgroundColor:'black',opacity:0.5,padding:10,justifyContent:'center',marginRight:5,borderRadius:5,height:10,marginTop:7}}>
                                <NormalText style={{marginBottom:0,color:'white'}}>Next</NormalText>
                            </View>
                            <View style={{height:35,width:35,borderRadius:100,backgroundColor:'black',opacity:0.5,alignItems:'center',justifyContent:'center'}}>
                                <FontAwesome name="chevron-right" size={12} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>:null}
                    

                    </View>
                </>:null}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    DashboardContainer:{
        width:'100%',
        height:200,
        borderColor:'black',
        borderWidth:1,
        backgroundColor:"#0f2346",
        padding:5
    },
    DashboardTop:{
        width:'100%',
        height:125,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        padding:5,
        borderBottomWidth:1,
        borderColor:'#4A5A7C'
    },
    ProfilePic:{
        resizeMode:'stretch',
        width:80,
        height:80
    },
    NameContainer:{
        marginLeft:15
    },
    AccuracyText:{
        textAlign:'center',
        borderRadius:10,
        backgroundColor:'#00e0ff',
        color:'white',
        marginTop:-15
    },
    DasboardBottom:{
        width:'100%',
        height:70,
        flexDirection:'row',
        padding:5,
        justifyContent:'space-between'
    },
    DashboardBottomSides:{
        width:'33%',
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:1,
        borderColor:'#4A5A7C'
    },
    DashboardBottomNoBorder:{
        width:'33%',
        justifyContent:'center',
        alignItems:'center'
    },
    AccuracyNo:{
        position:'absolute',
        zIndex:1,
        borderRadius:100,
        paddingHorizontal:5,
        paddingVertical:5,
        fontSize:12,
        backgroundColor:'#00e0ff',
        color:'white'
    },
    LeftRightArrowContainers:{
        width:'100%',
        height:35,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        marginTop:110,
        paddingHorizontal:10,
        flexDirection:'row'
    }
})

export default Dashboard;


