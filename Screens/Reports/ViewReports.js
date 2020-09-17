import React from 'react'
import { View, StyleSheet, FlatList,ActivityIndicator,Modal,Image } from 'react-native';
import Container from '../../Components/Container';
import ReportsCard from '../../Components/ReportsCard';
import {get_research_reports} from '../../Utils/api'
import { connect }from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import ReportFilter from '../../Components/ReportFilter'
import NormalText from '../../Components/NormalText'

class ViewReports extends React.Component{
    constructor()
    {
        super();
        this.state={
            Reports:[],
            isLoading:false,
            ShowFilterModal:false,
            Tags:"",
            MarketCapIds:"",
            ReportType:"",
            SegmentType:""
        }
    }


    componentDidMount()
    {
       this.FetchReports("")
    }
    
    ShowReports=(itemData)=>{
        return(
            <ReportsCard report={itemData.item}/>
        )
    }

    FetchReports=(SearchText)=>{
        const {AuthHeader,UserId}=this.props.loginState
        
        let payload={
            forUserId:this.props.UserId === undefined ? UserId : this.props.UserId,
            PackageIds:this.props.packageId === undefined ? "" : this.props.packageId,
            Tags:this.state.Tags,
            SectorIds:"",
            MasterScripCodeIds:"",
            CoverageTypeIds:"",
            MarketCapIds:this.state.MarketCapIds,
            SegmentIds:this.state.SegmentType,
            ResearchHousIds:"",
            AuthorIds:"",
            ReportTypeIds:"",
            Symbol:SearchText
        }
        console.log(payload)
        this.setState({isLoading:true})
        get_research_reports(AuthHeader,payload).then(result=>{
            
            if(result.IsSuccess)
            {
               this.setState({Reports:result.Data},()=>{
                   this.setState({isLoading:false})
                   this.setState({ShowFilterModal:false})
               })
            }
        })
    }

    CloseFilter=(SearchText,SelectedMarketCap,SelectedReportType,SelectedSegmentType,OwnerId)=>{
        this.setState({ShowFilterModal:!this.state.ShowFilterModal})
        this.setState({MarketCapIds:SelectedMarketCap})
        this.setState({ReportType:SelectedReportType})
        this.setState({SegmentType:SelectedSegmentType})
        this.FetchReports(SearchText)
    }

    render()
    {
        return(
            <Container style={styles.ViewReportsContainer}>
                {!this.state.isLoading ? 
                <View style={{width:'100%',flex:1,justifyContent:'flex-end',padding:10}}>
                    {this.state.Reports.length > 0 ? 
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.Reports}
                        renderItem={this.ShowReports}
                        showsVerticalScrollIndicator={true}
                    />:
                        <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('../../assets/Images/searching.png')} style={{width:125,height:125,resizeMode:'contain'}}/>
                            <NormalText style={{marginTop:10,marginBottom:0,fontSize:16}}>No Reports Were Found</NormalText>
                        </View>}

                    <View style={styles.FilterContainer}>
                        <TouchableOpacity onPress={()=>this.setState({ShowFilterModal:true})} >
                            <View style={styles.Filter}>
                                <FontAwesome name="filter" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                  </View>:
                  <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="#F0B22A" />
                  </View>
                }
                <Modal visible={this.state.ShowFilterModal} animationType="slide" transparent={true}>
                    <ReportFilter
                    closeFilter={this.CloseFilter} />
                </Modal>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    ViewReportsContainer:{
        backgroundColor:'#EBECF1',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    FilterContainer:{
        height:100,
        width:'100%',
        position:'absolute',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    Filter:{
        width:50,
        height:50,
        borderRadius:100,
        backgroundColor:'#F0B22A',
        alignItems:'center',
        justifyContent:'center'
    }
})

const mapStateToProps= state =>{
    return{
        loginState:state.login.login,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
   
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewReports);