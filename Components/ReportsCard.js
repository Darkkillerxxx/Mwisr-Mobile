import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import NormalText from './NormalText';
import BoldText from './BoldText';
import { FontAwesome } from '@expo/vector-icons';
import {reportDate} from '../Utils/api'

class ReportsCard extends React.Component{
    constructor()
    {
        super();
        this.state={
            isCollapsed:true
        }
    }

    ManageDate=(Dte)=>{
        let TempDate=Dte.split('T')
        console.log(TempDate[0])
        return reportDate(TempDate[0])
    }

    render()
    {
        const {CMP,ReportName,PotentialUpsideROI,ROI,Profit,CoverageType,Target1,Target2,Target3,ReportCreationDate,BuySellColor,Symbol,ResearchHouseName}=this.props.report
        return(
            <View style={styles.ReportsCard}> 
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <View style={styles.Tags}>
                        <BoldText style={{marginBottom:0,fontSize:12,marginTop:0,color:'white'}}>{CoverageType}</BoldText>
                    </View>
                    <NormalText style={{marginBottom:0,color:'black',marginLeft:10,fontSize:13}}>{Target3 !== "0" ? Target3 :Target2 !==0 ? Target2:Target1 !== 0 ? Target1:null } ₹ </NormalText>
                    <NormalText style={{marginBottom:0,color:'black',marginLeft:10,fontSize:13}}>{this.ManageDate(ReportCreationDate)}</NormalText>
                </View>
                <View style={styles.CompressedContent}>
                    <View style={styles.CompressContnentLeft}>
                        <View style={BuySellColor === "Green" ?  styles.Buy:styles.Sell}>
                            <BoldText style={{marginVertical:0,fontSize:14,color:'white'}}>{BuySellColor === "Green" ? "BUY":"SELL"}</BoldText>
                        </View>
                        <View style={{width:'100%'}}>
                            <BoldText style={{fontSize:12,marginBottom:0,color:'black',marginVertical:0}}>{Symbol}</BoldText>
                            <BoldText style={{fontSize:12,color:'black',marginVertical:0}}>{ResearchHouseName}</BoldText>
                        </View>
                    </View>
                    <View style={styles.CompressContnentRight}>
                        <TouchableOpacity onPress={()=>this.setState({isCollapsed:!this.state.isCollapsed})}>
                            <FontAwesome name={this.state.isCollapsed ? "caret-down":"caret-up"} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {!this.state.isCollapsed ? 
                
                <View style={styles.ContentBottom}>
                    <View style={styles.ContnentBottomInner}>
                        <View style={styles.ContentBottomLeft}>
                            <NormalText style={{fontSize:14,color:'black'}}>Report Name</NormalText>
                        </View>
                        <View style={styles.ContentBottomRight}>
                            <View style={styles.ContentBottomRightFlex}>
                                <NormalText style={{fontSize:14,color:'black', textAlign:'right'}}>{ReportName}</NormalText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ContnentBottomInner}>
                        <View style={styles.ContentBottomLeft}>
                            <NormalText style={{fontSize:14,color:'black'}}>CMP</NormalText>
                        </View>
                        <View style={styles.ContentBottomRight}>
                            <View style={styles.ContentBottomRightFlex}>
                                <NormalText style={{fontSize:14,color:'black', textAlign:'right'}}>{CMP} ₹</NormalText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ContnentBottomInner}>
                        <View style={styles.ContentBottomLeft}>
                            <NormalText style={{fontSize:14,color:'black'}}>Profit</NormalText>
                        </View>
                        <View style={styles.ContentBottomRight}>
                            <View style={styles.ContentBottomRightFlex}>
                                <FontAwesome name="arrow-up" size={12} color="black" style={{marginTop:3,marginRight:5}} />
                                <NormalText style={{fontSize:14,color:'black', textAlign:'right'}}>{Profit} ₹</NormalText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ContnentBottomInner}>
                        <View style={styles.ContentBottomLeft}>
                            <NormalText style={{fontSize:14,color:'black'}}>ROI</NormalText>
                        </View>
                        <View style={styles.ContentBottomRight}>
                            <View style={styles.ContentBottomRightFlex}>
                                <FontAwesome name="arrow-up" size={12} color="black" style={{marginTop:3,marginRight:5}} />
                                <NormalText style={{fontSize:14,color:'black', textAlign:'right'}}>{ROI} %</NormalText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ContnentBottomInner}>
                        <View style={styles.ContentBottomLeft}>
                            <NormalText style={{fontSize:14,color:'black'}}>Potential Upside ROI</NormalText>
                        </View>
                        <View style={styles.ContentBottomRight}>
                            <View style={styles.ContentBottomRightFlex}>
                                <NormalText style={{fontSize:14,color:'black', textAlign:'right'}}>{PotentialUpsideROI} %</NormalText>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity>
                            <View style={styles.ViewReport}>
                                <NormalText style={{marginBottom:0,color:'white',fontSize:12}}>View Reports</NormalText>
                            </View>
                    </TouchableOpacity>
                </View>:null}
            </View>
        )
    }
}


const styles=StyleSheet.create({
    ReportsCard:{
        width:'97%',
        backgroundColor:'white',
        elevation:2,
        borderRadius:5,
        marginTop:10,
        padding:5
    },
    CompressedContent:{
        width:'100%',
        flexDirection:'row'
    },
    Buy:{
        width:50,
        height:50,
        backgroundColor:'#16d39a',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10
    },
    Sell:{
        width:50,
        height:50,
        backgroundColor:'#ff6961',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10
    },
    CompressContnentLeft:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'80%',
        overflow:'hidden'
    },
    CompressContnentRight:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    Tags:{
        backgroundColor:'#F0B22A',
        marginBottom:10,
        alignSelf:'flex-start',
        height:20,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    ContentBottom:{
        marginTop:10,
        borderWidth:1,
        borderBottomColor:'white',
        borderLeftColor:'white',
        borderRightColor:'white',
        borderTopColor:'grey',
        padding:5,
        alignItems:'flex-end'
    },
    ContentBottomLeft:{
        width:'50%',
        alignItems:'flex-start'
    },
    ContentBottomRight:{
        width:'50%',
        alignItems:'flex-end'
    },
    ContentBottomRightFlex:{
        flexDirection:'row',
        justifyContent:'flex-end'
       
    },
    ViewReport:{
        width:120,
        height:30,
        backgroundColor:'#F0B22A',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginTop:10
    },
    ContnentBottomInner:{
        flexDirection:'row'
    }
    
})

export default ReportsCard