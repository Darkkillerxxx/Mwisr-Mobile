import React from 'react'
import { View, StyleSheet,TouchableOpacity,FlatList,ActivityIndicator,Image } from 'react-native';
import { connect }from 'react-redux'
import Container from '../../Components/Container';
import NormalText from '../../Components/NormalText';
import Card from '../../Components/Card';
import {FontAwesome}  from '@expo/vector-icons';
import * as Progress from 'react-native-progress'; 
import {get_packages,getPackageBackColor,getPackageFontColor} from '../../Utils/api'
import Packages from '../../Components/Pacakges'
import { enableScreens } from 'react-native-screens';

class ViewPackages extends React.Component{
    constructor()
    {
        super();
        this.state={
            SelectedTab:1,
            ReceivedPacakgeList:[],
            isLoading:false,
            ShowFilters:false,
            Segments:[
            {
                "SegmentId": 13,
                "SegmentName": "All",
                "Show":true
            },
            {
                "SegmentId": 1,
                "SegmentName": "Equity",
                "Show":false
            },
            {
                "SegmentId": 10,
                "SegmentName": "Equity Futures",
                "Show":false
            },
            {
                "SegmentId": 9,
                "SegmentName": "Equity Options",
                "Show":false
            },
            {
                "SegmentId": 4,
                "SegmentName": "Currency Futures",
                "Show":false
            },
            {
                "SegmentId": 12,
                "SegmentName": "Currency Options",
                "Show":false
            },
            {
                "SegmentId": 2,
                "SegmentName": "Commodity Futures",
                "Show":false
            },
            {
                "SegmentId": 11,
                "SegmentName": "Commodity Options",
                "Show":false
            }
          ]
        }
    }  

    MoveToPackageDetails=(OwnerId,PackageId,PackageName)=>{
        console.log(OwnerId,PackageId,PackageName)
        this.props.navigation.navigate("PackageDetails",{
            OwnerId:OwnerId,
            PackageId:PackageId,
            PackageName:PackageName
        })
    }

 
    ChangeTabs=(Tab)=>{
        this.setState({SelectedTab:Tab})
        // if(Tab === 1)
        // {
        //   this.setState({SelectedTab:1})
        //   this.setState({ isloading: true });
        //   this.getPackages("","", "","",true);
        // }
        // else if(Tab === 2)
        // {
        //   this.setState({SelectedTab:2})
        //   this.setState({ isloading: true });
        //   this.getPackages("","2", "","",true);
        // }
        // else if(Tab === 3)
        // {
        //   this.setState({SelectedTab:3})
        //   this.setState({ isloading: true });
        //   this.getPackages("","6", "","",true);
        // }
        // else if(Tab === 4)
        // {
        //   this.setState({SelectedTab:4})
        //   this.setState({ isloading: true });
        //   this.getPackages("","5", "","",true);
        // }
        // else if(Tab === 5)
        // {
        //   this.setState({SelectedTab:5})
        //   this.setState({ isloading: true });
        //   this.getPackages("","", true,"","");
        // }
      }

    render()
    {
        return(
            <Container style={styles.ViewPackageContainer}>
                <View style={styles.TabContainer}>
                    <View style={this.state.SelectedTab === 1 ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.ChangeTabs(1)}>
                            <NormalText style={styles.TabsText}>Own</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedTab === 2 ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.ChangeTabs(2)}>
                            <NormalText style={styles.TabsText}>Sub-Broker</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.SelectedTab === 3 ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.ChangeTabs(3)}>
                            <NormalText style={styles.TabsText}>Analyst</NormalText>
                        </TouchableOpacity>
                    </View>
                     <View style={this.state.SelectedTab === 4 ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.ChangeTabs(4)}>
                            <NormalText style={styles.TabsText}>Partner</NormalText>
                        </TouchableOpacity>
                    </View>
                     <View style={this.state.SelectedTab === 5 ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.ChangeTabs(5)}>
                            <NormalText style={styles.TabsText}>Assigned To Me</NormalText>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.PackageContainer}> 
                    <Packages SelectPackage={this.MoveToPackageDetails} Segments={this.state.Segments} SelectedTab={this.state.SelectedTab} />
                </View>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    ViewPackageContainer:{
        alignContent:'flex-start',
        justifyContent:'flex-start'
    },
    TabContainer:{
        width:'100%',
        height:35,
        backgroundColor:'#7fc3ff',
        flexDirection:'row'  
    },
    Tabs:{
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    TabsSelected:{
        width:'20%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'white',
        borderBottomWidth:3
    },
    TabsText:{
        fontSize:10,
        color:'white',
        marginBottom:0
    },
    PackageContainer:{
        flex:1,
        alignSelf:'stretch',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        paddingTop:10,
        backgroundColor:'#fafafa'
    },
    PackageCard:{
        width:'98%',
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
    },
    FilterContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:5
    },
    FilterBoxUnSelected:{
        width:'30%',
        borderColor:'#0f2346',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        borderRadius:5,
        margin:5    
    },
    FilterBoxSelected:{
        width:'30%',
        borderColor:'#0f2346',
        backgroundColor:"#0f2346",
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        borderRadius:5,
        margin:5 
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

export default connect(mapStateToProps,mapDispatchToProps)(ViewPackages);


          {/* <View style={{width:'100%',paddingHorizontal:10,marginTop:10}}>
                    <TouchableOpacity onPress={()=>this.setState({ShowFilters:!this.state.ShowFilters})}>  
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                            <NormalText style={{fontSize:15,marginHorizontal:5,marginBottom:0}}>Filters</NormalText>
                            {this.state.ShowFilters ? 
                            <FontAwesome name="caret-up" size={22} color="black" />:
                            <FontAwesome name="caret-down" size={22} color="black"/> } 
                        </View>
                    </TouchableOpacity>
                    
                    {this.state.ShowFilters ? 
                        <FlatList 
                        keyExtractor={(item,index)=>item.SegmentId.toString()}
                        data={this.state.Segments}
                        renderItem={this.showFilterBox}
                        numColumns={3} />  :null    
                    }
                    
                </View> */}

                   // SelectUnselectFilters=(id)=>{
    //     let TempSeg=this.state.Segments;
    //     if(id === 13)
    //     {
    //         console.log("Before",TempSeg[0].Show)
    //         TempSeg[0].Show=!TempSeg[0].Show
    //         console.log("After",TempSeg[0].Show)
    //         TempSeg.forEach(element=>{
    //             if(element.SegmentId !== 13)
    //             {
    //                 if(TempSeg[0].Show)
    //                 {
    //                     element.Show=false
    //                 }
    //                 else
    //                 {
    //                     element.Show=true
    //                 }
    //             }
                
    //         })

    //         this.setState({Segments:TempSeg})
    //     }
    //     else
    //     {
    //         TempSeg[0].Show=false
    //         TempSeg.forEach(element=>{
    //             if(element.SegmentId === id)
    //             {
    //                 element.Show = !element.Show
    //             }
    //         })
    //         this.setState({Segments:TempSeg})
    //     }
    // }

    // checkSelected=(id)=>{
    //     let Selected=false
    //     this.state.Segments.forEach(element => {
    //         // console.log("127 check filter",id === element.SegmentId)
    //         if(id === element.SegmentId)
    //         {
    //             if(element.Show)
    //             {
    //                 Selected=true
    //             }
    //         }
    //     })

    //     return Selected
    // }

    // showFilterBox=(itemData)=>{
    //     return(
    //         <View style={this.checkSelected(itemData.item.SegmentId) ? styles.FilterBoxSelected:styles.FilterBoxUnSelected}>
    //             <TouchableOpacity onPress={()=>this.SelectUnselectFilters(itemData.item.SegmentId)}>
    //                 <NormalText style={this.checkSelected(itemData.item.SegmentId) ? {marginBottom:0,color:'white'}:{marginBottom:0}}>{itemData.item.SegmentName}</NormalText>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }
