import React from 'react'
import { View,StyleSheet,ScrollView,TouchableOpacity,TextInput,FlatList,Picker} from 'react-native';
import { connect }from 'react-redux'
import {get_package_addCall,get_similar_package,verbose} from '../../Utils/api.js'
import {setLogin} from '../../store/Actions/ActionLogin'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import MwisrSelector from '../../Components/MwisrSelector'
import CollapsibleCard from '../../Components/CollapsibleCard'
import { FontAwesome } from '@expo/vector-icons';
import Card from '../../Components/Card'
import CustomButton from '../../Components/Button'

class AddCall extends React.Component{
    constructor()
    {
        super();
        this.state={
            IsQuickAddCall:true,
            SelectPackagePart:1,
            PackageSearchText:"",
            SelectedBasePackageId:null,
            Packages:[],
            SelectedPackages:[],
            SelectedPackageIndex:null,
            SimilarPackages:[]
        }
        console.disableYellowBox = true;
    }


    changeAddCallType=(value)=>{
        this.setState({IsQuickAddCall:value})
        //Reset Whole State after Changing Add Call Type
    }

    componentDidMount()
    {
        get_package_addCall(this.props.loginState.AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({Packages:result.Data})
            }
            else
            {
                verbose(false,"Error Fetching Packages",result.DisplayMsg)
            }
        })
    }

    getSimilarPackage=()=>
    {
        let payload={
            forMarketExchangeCodes:this.state.Packages[this.state.SelectedPackageIndex].ForExchanges,
            forMarketSegmentId:this.state.Packages[this.state.SelectedPackageIndex].MarketSegmentId
        }

        get_similar_package(this.props.loginState.AuthHeader,payload).then(result =>{
            console.log("Similar Package",result)
            if(result.IsSuccess)
            {
                this.setState({SimilarPackages:result.Data})    
            }
            else
            {
                verbose(false,"Error Fetching Similar Packages",result.DisplayMsg)
            }
        })
    }

    onPackageSelected=(Id)=>{
        if(this.state.SelectedBasePackageId === null)
        {
            let temp=[];
            temp.push(Id)
            this.setState({SelectedBasePackageId:Id})
            this.setState({SelectedPackages:temp})
        }
    }

    ChangePackageSearchText=(e)=>{
        this.setState({PackageSearchText:e})
    }

   

    render()
    {
        let ShowPackages=this.state.Packages.map((result,index) => {
            return(
                result.PackageName.includes(this.state.PackageSearchText) ?
                <TouchableOpacity style={{width:'100%'}} onPress={()=>this.onPackageSelected(result.PackageId)}>
                <View style={{flexDirection:'row',width:'100%',padding:5}}>
                <NormalText style={{width:'85%',color:`${this.state.SelectedPackages.includes(result.PackageId) ? 'grey':'black'}`,marginBottom:0,fontSize:14}}>{result.PackageName}</NormalText>
                    <View style={{width:'15%',alignItems:'center'}}>
                        {this.state.SelectedPackages.includes(result.PackageId) ? 
                        <FontAwesome name="check" size={15} color="grey" />:null}
                    </View>
                </View>
                </TouchableOpacity>:null
            )
        })
        return(
            <Container style={styles.CustomContainer}>
                <ScrollView>
                    <View style={styles.IsQuickAddCallContainer}>
                        <MwisrSelector onSelect={this.changeAddCallType} Selected={this.state.IsQuickAddCall ? true: false} Text={'Quick Add Call'} value={true}/>
                        <MwisrSelector onSelect={this.changeAddCallType} Selected={this.state.IsQuickAddCall ? false: true} Text={'Advanced Add Call'} value={false}/>
                    </View>
                    
                    {this.state.Packages.length > 0 ? 
                    <View style={styles.AddContainer}>
                      
                            <Card style={styles.CustomCard}>
                                {this.state.SelectPackagePart === 1 ? 
                                  <TouchableOpacity style={{width:'100%'}} onPress={()=> this.setState({SelectPackagePart:2})}>
                                    <View style={styles.SelectPackageContainer}>
                                        <View style={{width:'15%'}}>
                                            <FontAwesome name="search" size={20} color="black" />
                                        </View>   
                                        <View style={{width:'75%',alignItems:'flex-start'}}>
                                            <NormalText style={{fontSize:14,marginBottom:0}}>Select A Package ...</NormalText>            
                                        </View>
                                        <View style={{width:'10%',alignItems:'center'}}>
                                            <FontAwesome name="caret-down" size={20} color="black" />    
                                        </View>
                                    </View>
                                    </TouchableOpacity>:
                                    <View style={{width:'100%'}}>
                                        <View style={styles.SelectPackageContainer}>
                                            <View style={{width:'15%',justifyContent:'center',borderBottomWidth:1}}>
                                                <FontAwesome name="search" size={20} color="black" />
                                            </View>   
                                            <View style={{width:'85%',alignItems:'flex-start'}}>
                                                <TextInput placeholder="Search for Package ..." onChangeText={this.ChangePackageSearchText} style={{borderBottomWidth:1,borderBottomColor:'grey',height:45,width:'100%'}} />            
                                            </View>
                                        </View>
                                        <View style={{width:'100%',padding:10,maxHeight:150,marginTop:0}}>
                                            <ScrollView style={{width:'100%'}}>
                                               {ShowPackages}
                                            </ScrollView>
                                        </View>
                                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly'}}>
                                            <TouchableOpacity style={{width:'40%'}}>
                                                <CustomButton style={{width:'100%'}}>
                                                    <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Reset</NormalText>
                                                </CustomButton>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{width:'40%'}}>
                                                <CustomButton style={{width:'100%'}}>
                                                    <NormalText style={{marginBottom:0,color:'white',fontSize:14}}>Submit</NormalText>
                                                </CustomButton>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    }    
                            </Card>
                    </View>:null}

                </ScrollView>
                
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustomContainer:{
        alignItems:'center',
        justifyContent:'flex-start',
        padding:10,
        backgroundColor:'#EAEBF0'
    },
    IsQuickAddCallContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginBottom:10,
        height:50
    },
    AddContainer:{
        flex:1,
        width:'100%',
        alignItems:'center',
    },
    CustomCard:{
        width:'100%',
        alignItems:'center',
        padding:10
    },
    SelectPackageContainer:{
        flexDirection:'row'
    },
    PackagePicker:{
        borderRadius:10,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        marginTop:10,
        height:40,
        justifyContent:'center',
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

export default connect(mapStateToProps,mapDispatchToProps)(AddCall);