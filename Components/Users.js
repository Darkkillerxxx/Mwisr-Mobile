import React from 'react'
import { Text,View, StyleSheet, Image,FlatList,Modal,ActivityIndicator,TouchableHighlight} from 'react-native'
import Card from './Card'
import BoldText from './BoldText'
import NormalText from './NormalText'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {FontAwesome}  from '@expo/vector-icons';
import {get_sub_list} from '../Utils/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import UsersFilter from '../Components/UsersFilter'
import UserFilter from '../Components/UsersFilter'
import {NavigationEvents} from 'react-navigation'

class Users extends React.Component{
    constructor()
    {
        super()
        this.state={
            RecivedUserList:[],
            ShowFilters:false,
            isLoading:false,
            Filter:{
                AccuracyFilter:null,
                ProfitFilter:null,
                ROIFilter:null
            }
        }
    }

    componentDidMount(){
        if(this.props.Type === 2)
        {
            this.fetchUsers()
        }
    }

    fetchUsers=()=>{
        this.setState({isLoading:true})
        get_sub_list(null,this.props.UserType,true,this.props.AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({RecivedUserList:result.Data},()=>{
                    this.setState({isLoading:false})
                })
            }
        })
    }

    ApplyFilter=(filter)=>{
        this.setState({ShowFilters:false})
        this.setState({Filter:filter})
    }

    CheckProfitFilter=(user)=>{
        let ProfitFilter= this.state.Filter.ProfitFilter === null ? null:this.state.Filter.ProfitFilter.split(',')
        if(ProfitFilter !== null)
        {
            if(parseInt(user.ProfitPerInvestment) >= parseInt(ProfitFilter[0]) && parseInt(user.ProfitPerInvestment) <= parseInt(ProfitFilter[1]))
            {
                return true
            }
            else
            {
                return false
            }
        }
        else
        {
            return true
        }
    }

    CheckAccuracyFilter=(user)=>{
        // console.log("48",this.state.Filter)
        let AccuracyFilter= this.state.Filter.AccuracyFilter === null ? null:this.state.Filter.AccuracyFilter.split(',')
        if(AccuracyFilter !== null)
        {
            // console.log("52",AccuracyFilter)
            if(parseInt(user.Accuracy) >= parseInt(AccuracyFilter[0]) && parseInt(user.Accuracy) <= parseInt(AccuracyFilter[1]))
            {
                return true
            }
            else
            {
                return false
            }
        }
        else
        {
            return true
        }
         
    }

    CheckCardsDisplay=(user)=>{
        if(this.CheckAccuracyFilter(user))
        {
            if(this.CheckProfitFilter(user))
            {
                return true
            }
        }
        else
        {
            return false
        }
    }

    onUserSelect=(UserId,SuperOwnerId,IsActive)=>{
        this.props.onSelectUser(UserId,SuperOwnerId,IsActive)
    }

    ShowCards=(itemData)=>(
        this.CheckCardsDisplay(itemData.item) ?

         <Card style={styles.UserCard}>
                    <View style={styles.CardLeftContainer}>
                        <View>
                            <View>
                                <NormalText style={{...styles.AccuracyNo,...{backgroundColor:this.props.UserColor}}}>{parseInt(itemData.item.Accuracy)}</NormalText>
                            </View>
                            
                            <AnimatedCircularProgress
                                size={80}
                                width={5}
                                fill={itemData.item.Accuracy}
                                tintColor={this.props.UserColor}
                                onAnimationComplete={() =>{}}
                                backgroundColor="white"
                                rotation={180}>
                                    {
                                        (fill)=>(
                                            <Image source={require('../assets/Images/Analyst.png')} style={styles.ProfilePic}/>
                                        )
                                    }
                            </AnimatedCircularProgress>
                            <NormalText style={{...styles.AccuracyText,...{backgroundColor:this.props.UserColor}}}>Accuracy</NormalText>
                        </View>
                  
                    </View> 
                    <View style={styles.CardTopRightContainer}>
                        <View style={styles.CardTopRight}>
                            <View style={styles.CardTopRightLeft}>
                                <BoldText style={styles.UserName}>{itemData.item.UserName}</BoldText>
                                <NormalText style={styles.MobileNo}>+91{itemData.item.MobileNo}</NormalText>
                            </View>
                            <View style={styles.CardTopRightRight}>
                                <TouchableOpacity onPress={() => this.onUserSelect(itemData.item.UserId,itemData.item.SuperOwner,itemData.item.IsActive)}>
                                    <View style={{...styles.PackagesOuter,...{borderColor:this.props.UserColor}}}>
                                        <NormalText style={{...styles.PackageText,...{color:this.props.UserColor}}}>View Profile</NormalText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={styles.CardBottomRightContainer}>
                            <View style={styles.CardBottom}>
                                <NormalText style={styles.CardBottomTextHead}>Calls</NormalText>
                                <NormalText style={styles.CardBottomText}>{itemData.item.Calls}</NormalText>
                            </View>
                            <View style={styles.CardBottom}>
                                <NormalText style={styles.CardBottomTextHead}>ROI</NormalText>
                                <NormalText style={styles.CardBottomText}>{itemData.item.ROI} %</NormalText>
                            </View>
                            <View style={styles.CardBottomRight}>
                                <View style={styles.CardBottomProfitContainer}>
                                    {itemData.item.ProfitPerInvestment > 0 ? 
                                        <FontAwesome name="arrow-up" size={14} color="green" />:
                                        itemData.item.ProfitPerInvestment < 0 ?
                                        <FontAwesome name="arrow-down" size={14} color="red" />:
                                        null
                                    }
   
                                    <NormalText style={{...styles.CardBottomProfitText,...{color:itemData.item.ProfitPerInvestment === 0 ? null:itemData.item.ProfitPerInvestment > 0 ? 'green':'red'}}}> 
                                    {itemData.item.ProfitPerInvestment > 0 ? 
                                        "Profit":
                                        itemData.item.ProfitPerInvestment < 0 ?
                                        "Loss":
                                        "Profit/Loss"
                                    }
                                     </NormalText>
                                </View>
                               
                                <NormalText style={{...styles.CardBottomProfitNo,...{color:itemData.item.ProfitPerInvestment === 0 ? 'black':itemData.item.ProfitPerInvestment > 0 ? 'green':'red'}}}> { itemData.item.ProfitPerInvestment > 100000 ? "100000+":itemData.item.ProfitPerInvestment} ₹</NormalText>
                            </View>
                        </View>
                    </View>               
                </Card>:null
    )

    render()
    {
        console.log(this.state.Filter)
        return(
            <View style={styles.UserContainer}>
                <NavigationEvents onDidFocus={()=> this.fetchUsers()}/>
               <View style={{width:'100%',height:50,alignItems:'flex-end',paddingHorizontal:10,justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={()=>this.setState({ShowFilters:!this.state.ShowFilters})}>
                        <View style={{flexDirection:'row',width:100,justifyContent:'space-evenly',borderRadius:5,padding:5,backgroundColor:this.props.UserColor,elevation:1}}>
                            <FontAwesome name="filter" size={24} color="white" />
                            <NormalText style={{fontSize:16,marginBottom:0,color:'white'}}>Filters</NormalText>
                        </View> 
                    </TouchableOpacity>
               </View>
               
               { !this.state.isLoading ? 
                        <FlatList 
                           keyExtractor={(item,data) => item.UserId.toString()}
                           data={this.state.RecivedUserList}
                           renderItem={this.ShowCards} />:

                         <View style={{flex:1,alignSelf:'stretch',alignItems:'center',justifyContent:'center'}}>
                             <ActivityIndicator size="large" color={this.props.UserColor} />
                        </View>  
                }

            

                <Modal visible={this.state.ShowFilters} animationType="slide" transparent={true}>
                    <UserFilter UserColor={this.props.UserColor} AppliedFilter={this.ApplyFilter} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    UserContainer:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#FAFAFA'
    },
    UserCard:{
        flexDirection:'row',
        width:'98%',
        height:150,
        marginVertical:5,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        borderRadius:5
    },
    CardLeftContainer:{
        height:'100%',
        width:'30%',
        alignItems:'center',
        justifyContent:'center'
    },
    AccuracyNo:{
        position:'absolute',
        zIndex:1,
        borderRadius:100,
        paddingHorizontal:10,
        paddingVertical:5,
        fontSize:12,
        backgroundColor:'#00e0ff',
        color:'white'
    },
    ProfilePic:{
        resizeMode:'stretch',
        width:80,
        height:80
    },
    AccuracyText:{
        textAlign:'center',
        borderRadius:10,
        backgroundColor:'#00e0ff',
        color:'white',
        marginTop:-10
    },
    CardTopRightContainer:{
        height:'100%',
        width:'70%'
    },
    CardTopRight:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingVertical:10
    },
    CardTopRightLeft:{
        width:'50%',
        alignItems:'center'
    },
    CardTopRightRight:{
        width:'50%',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingHorizontal:10
    },
    UserName:{
        marginVertical:0,
        fontSize:13
    },
    MobileNo:{
        marginTop:0,
        marginBottom:0
    },
    PackagesOuter:{
        borderColor:'black',
        borderWidth:1,
        padding:10,
        borderRadius:5
    },
    PackageText:{
        fontSize:12,
        marginBottom:0
    },
    CardBottomRightContainer:{
        flex:1,
        width:"100%",
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        alignSelf:'stretch'
    },
    CardBottom:{
        width:'33%',
        borderRightColor:'#e7edf3',
        borderRightWidth:1
    },
    CardBottomRight:{
        width:'33%'
    },
    CardBottomTextHead:{
        fontSize:14,
        marginBottom:0,
        textAlign:'center'
    },
    CardBottomText:{
        fontSize:15,
        marginBottom:0,
        textAlign:'center'
    },
    CardBottomProfitContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    CardBottomProfitText:{
        fontSize:14,
        marginBottom:0,
        textAlign:'center',
        color:'green'
    },
    CardBottomProfitNo:{
        fontSize:15,
        marginBottom:0,
        textAlign:'center',
        color:'green'
    }

})

export default Users;