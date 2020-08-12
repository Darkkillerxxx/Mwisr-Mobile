import React from 'react'
import { View, StyleSheet,FlatList,ActivityIndicator,Image } from 'react-native'
import { connect }from 'react-redux'
import {get_packages,getPackageBackColor,getPackageFontColor} from '../Utils/api'
import {FontAwesome}  from '@expo/vector-icons';
import NormalText from '../Components/NormalText'
import BoldText from '../Components/BoldText'
import * as Progress from 'react-native-progress'; 
import Card from '../Components/Card'

class Packages extends React.Component{
    constructor()
    {
        super();
        this.state={
            ReceivedPacakgeList:[],
            isLoading:false
        }
    }

    getPackages(forOwnerId,userTypeId, assignedToMe, forUserId ,createdByMe) {
        this.setState({isLoading:true})
        const { AuthHeader } = this.props.loginState;
        get_packages({
          forOwnerId,
          userTypeId,
          AuthHeader,
          forUserId: "",
          assignedToMe,
          createdByMe: createdByMe,
          currentPage:1,
          pageSize:100,
          forDebug:false
        }).then(data => {
            if(data.IsSuccess)
            {
                this.setState({ReceivedPacakgeList:data.Data},()=>{
                    this.setState({isLoading:false})
                    console.log(this.state.ReceivedPacakgeList)
                })
            }
        });
      }

    componentDidMount() 
    {
        if(this.props.UserProfile === false || this.props.UserProfile === undefined)
        {
            this.getPackages("","",this.props.loginState.UserTypeId === 7 ? true:"",this.props.loginState.UserId,this.props.loginState.UserTypeId === 7 ? "":true);
        }
        else
        {
           this.getPackages("","","",this.props.UserId,this.props.createdByMe)
        }
        
    }

    componentDidUpdate(prevProps,prevState,ss)
    {
        if(prevProps.SelectedTab !== this.props.SelectedTab)
        {
            console.log("Props Change")
            if(this.props.SelectedTab === 1)
            {
            this.setState({ isloading: true });
            this.getPackages("","", "","",true);
            }
            else if(this.props.SelectedTab === 2)
            {
            this.setState({ isloading: true });
            this.getPackages("","2", "","",true);
            }
            else if(this.props.SelectedTab === 3)
            {
            this.setState({ isloading: true });
            this.getPackages("","6", "","",true);
            }
            else if(this.props.SelectedTab === 4)
            {
            this.setState({ isloading: true });
            this.getPackages("","5", "","",true);
            }
            else if(this.props.SelectedTab === 5)
            {
            this.setState({ isloading: true });
            this.getPackages("","", true,"","");
            }
        }
    }

    checkSelected=(id)=>{
        let Selected=false
        console.log("Hi")
        this.props.Segments.forEach(element => {
            if(id === element.SegmentId)
            {
                if(element.Show)
                {
                    Selected=true
                }
            }
        })

        return Selected
    }

    PacakgeList=(itemData)=>{
        return(
            <Card style={styles.PackageCard}>
                <View style={{...styles.PackageTopContainer,...{backgroundColor:getPackageBackColor(itemData.item.PackageTypeName)}}}>
                    <View style={styles.PackageTopLeft}>
                        <FontAwesome name="dropbox" size={38} color={getPackageFontColor(itemData.item.PackageTypeName)} />
                        <NormalText style={{color:`${getPackageFontColor(itemData.item.PackageTypeName)}`,marginBottom:0}}>Created By</NormalText>
                        <NormalText style={{color:`${getPackageFontColor(itemData.item.PackageTypeName)}`}}>{itemData.item.DelegatedUserName}</NormalText>
                    </View>
                    <View style={styles.PackageTopRight}>
                        <NormalText style={{color:`${getPackageFontColor(itemData.item.PackageTypeName)}`,marginBottom:0}}>{itemData.item.PackageName}</NormalText>
                        <NormalText style={{color:`${getPackageFontColor(itemData.item.PackageTypeName)}`,marginBottom:0}}>{itemData.item.Profit} ₹</NormalText>
                        <NormalText style={{color:`${getPackageFontColor(itemData.item.PackageTypeName)}`,marginBottom:0}}>{itemData.item.PackageTypeName}</NormalText>
                    </View>
                </View>
                <View style={styles.PackageMidContainer}>
                    <View style={styles.PacakgeMidLeft}>
                        <NormalText style={{marginBottom:0}}>Total Calls</NormalText>
                        <NormalText style={{marginBottom:0}}>{itemData.item.TotalCalls}</NormalText>
                    </View>
                    <View style={styles.PackageMidRight}>
                        <NormalText style={{marginBottom:0}}>Total ROI</NormalText>
                        <NormalText style={{marginBottom:0}}>{itemData.item.AvgROI} %</NormalText>
                    </View>
                </View>
                <View style={styles.PackageBottomContainer}>
                    <View style={styles.PacakgeBottomLeft}>
                        <View style={styles.PacakgeBottomLeftLeft}>
                            <NormalText style={{marginBottom:0}}>Risk</NormalText>
                            <NormalText style={{marginBottom:0}}>{itemData.item.RiskAvg}</NormalText>
                        </View>
                        <View style={styles.PacakgeBottomRightRight}>
                            <NormalText style={{marginBottom:0}}>Reward</NormalText>
                            <NormalText style={{marginBottom:0}}>{itemData.item.RewardAvg}</NormalText>
                        </View>
                    </View>
                    <View style={styles.PacakgeBottomRightRight}>
                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5}}>
                            <NormalText style={{marginBottom:5}}>Accuracy</NormalText>
                            <NormalText style={{marginBottom:5}}>{itemData.item.Accuracy} %</NormalText>
                        </View>
                        <Progress.Bar progress={itemData.item.Accuracy / 100} color={getPackageFontColor(itemData.item.PackageTypeName)}/>
                    </View>
                </View>
            </Card>
        )
    }

    render()
    {
        return(
            !this.state.isLoading ?

                this.state.ReceivedPacakgeList.length > 0 ?
                   
                    <FlatList 
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.ReceivedPacakgeList}
                        renderItem={this.PacakgeList}/>
                        : 
                        <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('../assets/Images/searching.png')} style={{width:'30%',height:'30%',resizeMode:'contain'}}/>
                            <NormalText style={{marginTop:10,marginBottom:0,fontSize:16}}>No Packages Were Found</NormalText>
                        </View>
                        :
            
                        <ActivityIndicator size="large" color="#f5bb18" />
        )

    }
}

const styles=StyleSheet.create({
    PackageCard:{
        width:'97%',
        height:200,
        borderRadius:10,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginVertical:10
    },
    PackageTopContainer:{
        width:'100%',
        height:'50%',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        flexDirection:'row'
    },
    PackageTopLeft:{
        width:'35%',
        alignItems:'center',
        justifyContent:'center'
    },
    PackageTopRight:{
        width:'65%',
        alignItems:'flex-end',
        justifyContent:'center',
        padding:10
    },
    PackageMidContainer:{
        width:'100%',
        height:'25%',
        flexDirection:'row',
        padding:5
    },
    PacakgeMidLeft:{
        width:'50%',
        height:'100%',
        borderRightColor:'#fafafa',
        borderRightWidth:1,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    PackageMidRight:{
        width:'50%',
        height:'100%',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    PackageBottomContainer:{
        width:'100%',
        height:'25%',
        flexDirection:'row',
        padding:5
    },
    PacakgeBottomLeft:{
        width:'50%',
        height:'100%',
        flexDirection:'row'
    },
    PacakgeBottomLeftLeft:{
        width:'50%',
        height:'100%',
        alignItems:'center'
    },
    PacakgeBottomRightRight:{
        width:'50%',
        height:'100%',
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
        onSetLogin:(response)=>dispatch(setLogin(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Packages);