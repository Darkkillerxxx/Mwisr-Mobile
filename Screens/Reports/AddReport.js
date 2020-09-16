import React from 'react'
import {View,StyleSheet,TouchableOpacity,TextInput, ScrollView,Picker} from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import Card from '../../Components/Card'
import CustomButton from '../../Components/Button'
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker'
import {get_coverage_types,get_research_houses,get_report_types,get_sector,get_market_caps,get_package_addCall,get_symbol,get_symbol_details} from '../../Utils/api'
import { connect }from 'react-redux'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import MwisrSelector from '../../Components/MwisrSelector'

class AddReports extends React.Component{
    constructor(){
        super()
        this.state={
            FileName:"",
            FileContent:"",
            Authors:[
                {
                    AuthorId: 0,
                    AuthorName: "",
                    EMailId: ""
                }
            ],
            Keywords:[],
            KeywordText:"",
            ReportsCreationDate:"",
            ReportEndDate:"",
            ReportName:"",
            ResearchHouse:[],
            SelectedResearchHouse:"",
            CoverageTypes:[],
            SelectedCoverageType:"",
            ReportType:[],
            SelectedReportType:"",
            SectorTypes:[],
            SelectedSectorType:"",
            MarketCaps:[],
            SelectedmarketCaps:"",
            PackageList:[],
            SelectedPacakgeId:"",
            Exchanges:[],
            SelectedExchange:"",
            MarketSegmentId:"",
            Legs:[ 
                {
                AnalystId: 9,
                MasterScripCode: 0,
                Symbol: null,
                MarketExchangeCode: null,
                MarketSegmentId: 10,
                Derivate: null,
                ExpiryDate: null,
                StrikePrice: null,
                ExpiryDateList:[],
                SuggestionsList:[],
                CallType: 1,
                DurationFrom: "2018-11-24",
                DurationTo: "2018-11-30",
                CMPPrice: null,
                Target: null,
                StopLoss:null,
                TipId: 0,
                IsExternal: false,
                ReceivedSymbol:[]
                }
        ]
        }

        console.disableYellowBox=true
    }

    onCreatedDateChange=(Date)=>{
        this.setState({ReportsCreationDate:Date},()=>{
            console.log(this.state.ReportsCreationDate)
        })
    }

    onEndDateChange=(Date)=>{
        this.setState({ReportEndDate:Date},()=>{
            console.log(this.state.ReportsCreationDate)
        })
    }

    SelectFile = async() => {
        let doc =  await DocumentPicker.getDocumentAsync({})
        this.setState({FileName:doc.name})   
        let baseContents = await FileSystem.readAsStringAsync(doc.uri,{encoding:FileSystem.EncodingType.Base64})
        this.setState({FileContent:baseContents})
    }


    
    AddKeywords=(Keyword,IsAdd)=>{
        let tempKey=this.state.Keywords
        if(Keyword !== "")
        {
            if(IsAdd)
            {
                tempKey.push(Keyword)
                console.log(tempKey)
            }
            else
            {
                let index = tempKey.indexOf(Keyword)
                tempKey.splice(index,1)
            }
        }
        this.setState({Keywords: tempKey})
    }


    AddAuthors=()=>{
        let Authors={
            AuthorId: 0,
            AuthorName: "",
            EMailId: ""
        }
        
        let temp=this.state.Authors

        temp.push(Authors)
        this.setState({Authors:temp})
    }

    RemoveAuthors=()=>{
        let temp=this.state.Authors
        temp.pop()
        this.setState({Authors:temp})

    }

    onAuthorsNameChange=(e,index)=>{
        let temp=this.state.Authors
        temp[index].AuthorName=e
        this.setState({Authors:temp})
    }

    onAuthorsEmailChange=(e,index)=>{
        let temp=this.state.Authors
        temp[index].EMailId=e
        this.setState({Authors:temp})
    }

    onLegsEdit=(index,type,val)=>{
        let Legs=this.state.Legs
        switch(type)
        {
            case 0 : 
                Legs[index].CallType = val

            case 1:
                Legs[index].Symbol=val
                if(val.length > 2)
                {
                    this.getSymbol(val,index)
                }
                break;

            case 2:
                Legs[index].Target=val
                break;
        
            case 3:
                Legs[index].StopLoss=val
                break;
            
            case 4:
                Legs[index].CMPPrice=val
                break;
            
            case 5:
                Legs[index].DurationFrom=val
                break;

            case 6:
                Legs[index].DurationTo=val
                break;

            default:
                break
        }

        this.setState({Legs:Legs},()=>{
            console.log(this.state.Legs)
        })

    }

    uploadReport=()=>{
        let payload={
            FileName: this.state.FileName,
            FileNameAlias: this.state.FileName,
            FileVersion: null,
            PackageId: this.state.SelectedPacakgeId,
            OverWriteThisVersion: false,
            ReportName: this.state.ReportName,
            ReportContent:this.state.FileContent,
            ContentType: "Binary",
            RecommendationType: "",
            CoverageType: this.state.SelectedCoverageType,
            Segment: "Equity",
            ReportType: this.state.SelectedReportType,
            SectorId: this.state.SelectedSectorType,
            ResearchHouse: this.state.SelectedResearchHouse,
            ReportDuration: "2018-06-15",
            MarketCapitalization: this.state.SelectedmarketCaps,
            CompanyName: "",
            Tags:this.state.KeywordText.toString() ,
            ReportCreationDate: this.state.ReportsCreationDate,
            "Authors": [
                {
                    "AuthorId": 1645,
                    "AuthorName": "Optional",
                    "EMailId": "Optional"
                }
            ],
            "Advisory": [
                {
                    "AnalystId": 9,
                    "MasterScripCode": 0,
                    "Symbol": undefined,
                    "MarketExchangeCode": undefined,
                    "MarketSegmentId": 10,
                    "Derivate": undefined,
                    "ExpiryDate": undefined,
                    "StrikePrice": undefined,
                    "CallType": 1,
                    "DurationFrom": "2018-11-24",
                    "DurationTo": "2018-11-30",
                    "CMPPrice": 1200,
                    "Target": 1300,
                    "StopLoss": 1000,
                    "TipId": 0,
                    "IsExternal": false
                }
            ]
        }
    }

    componentDidMount(){
        const {AuthHeader}=this.props.loginState

        get_coverage_types(AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({CoverageTypes:result.Data},()=>{
                    this.setState({SelectedCoverageType:this.state.CoverageTypes[0].Name})
                })
            }
        })

        get_research_houses(AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({ResearchHouse:result.Data},()=>{
                    this.setState({SelectedResearchHouse:this.state.ResearchHouse[0].Name})
                })
            }
        })

        get_report_types(AuthHeader).then(result=>{
            if(result.IsSuccess)
            {
                this.setState({ReportType:result.Data},()=>{
                    this.setState({SelectedReportType:this.state.ReportType[0].Name})
                })
            }
        })

        get_sector(AuthHeader).then(result => {
            if(result.IsSuccess)
            {
                this.setState({SectorTypes:result.Data},()=>{
                    this.setState({SelectedSectorType:this.state.SectorTypes[0].Id})
                })
            }
        })

        get_market_caps(AuthHeader).then(result => {
            if(result.IsSuccess)
            {
                this.setState({MarketCaps:result.Data},()=>{
                    this.setState({SelectedMarketCap:this.state.MarketCaps[0].Name})
                })
            }
        })

        get_package_addCall(AuthHeader).then(result => {
            if(result.IsSuccess)
            {
                this.setState({PackageList:result.Data},()=>{
                    this.setState({SelectedPackage:this.state.PackageList[0].PackageId},()=>{
                        this.GetExchanges(this.state.PackageList[0].ForExchanges)
                    })
                })
            }
        })
    }

    GetExchanges=(Exchange)=>{
        let exchanges=Exchange.split(',')
        this.setState({Exchanges:exchanges},()=>{
            this.setState({SelectedExchange:exchanges[0]})
            this.setState({MarketSegmentId:this.state.PackageList[0].MarketSegmentId})
        })
    }

    AddRemoveMoreLegs=(isAdd,index)=>{
        let TempLegs=this.state.Legs
        if(isAdd)
        {
            TempLegs.push({
                AnalystId: 9,
                MasterScripCode: 0,
                Symbol: null,
                ReceivedSymbol:[],
                MarketExchangeCode: null,
                MarketSegmentId: 10,
                Derivate: null,
                ExpiryDate: null,
                ExpiryDateList:[],
                SuggestionsList:[],
                StrikePrice: null,
                CallType: 1,
                DurationFrom: "",
                DurationTo: "",
                CMPPrice: null,
                Target: null,
                StopLoss:null,
                TipId: 0,
                IsExternal: false
                })
        }
        else
        {
            TempLegs.splice(index,1)
        }

        this.setState({Legs:TempLegs})
    }

    changePackage=(val)=>{
        let Package=val.split(',')
        this.setState({SelectedPacakgeId:Package[0]})
        this.setState({MarketSegmentId:Package[1]})
    }

    getSymbol=(symbol,index)=>{
        let legs=this.state.Legs
        let payload={
            exchanges:this.state.SelectedExchange,
            segmentIds:this.state.MarketSegmentId,
            symbolLike:symbol
        }
        console.log(payload)
        get_symbol(this.props.loginState.AuthHeader,payload).then(res=>{
           legs[index].ReceivedSymbol=res
        })

        this.setState({Legs:legs},()=>{
            if(this.state.MarketSegmentId !== 1)
            {
                this.GetSymbolDetails(symbol,index)
            }
        })
    }

    GetSymbolDetails=(Symbol,index)=>{
        let TempLegs=this.state.Legs
        let Det_Payload={
            exchanges:this.state.SelectedExchange,
            segmentIds:this.props.MarketSegmentId,
            symbolLike:Symbol
        }

        get_symbol_details(this.props.AuthHeader,Det_Payload).then(result => {
            if(result.length > 0)
            {
                let TempExpiry=[];
                result.forEach(element=>{
                   TempExpiry.push(this.ExpiryDateForAddCall(element.ExpiryDate))
                 })
                  
                 let sortedArray  = TempExpiry.sort((a,b) => moment(a) - moment(b))
                 TempExpiry=this.ExpiryDateToNormal(sortedArray)

                 TempLegs[index].ExpiryDateList=TempExpiry
                 this.setState({Legs:TempLegs},()=>{
                    //  this.onExpiryChange(this.state.ReceivedDates[0])
                 })
            }
        })
    }

    ExpiryDateForAddCall=(date)=>{
        let tempDate=date.split('-')
        let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let month=""
        months.forEach((element,index) => {
          if(element === tempDate[1])
          {
            month=index;
          }
          
        });
        // console.log("373",`20${tempDate[2]}-${month+1 < 10 ? `0${month+1}`:`${month+1}`}-${tempDate[0]}`)
           return `20${tempDate[2]}-${month+1 < 10 ? `0${month+1}`:`${month+1}`}-${tempDate[0]}`
      }

      ExpiryDateToNormal=(dateArray)=>{
        let TempExpiry=[]
            dateArray.forEach(element=>{
                let arr=element.split("-")
                let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                TempExpiry.push(`${arr[2]}-${months[parseInt(arr[1])-1]}-${arr[0].substring(2)}`)
            })

            return TempExpiry
        }
    

    render(){

     let ShowAuthors=this.state.Authors.map((result,index)=>(
         
                <View style={styles.AuthorContainer}>
                     <View style={styles.AuthorInputs}>
                         <NormalText style={styles.SelectorName}>Author Name</NormalText>
                         <View style={styles.TextInputContainer}>
                             <TextInput onChangeText={(e)=>this.onAuthorsNameChange(e,index)} style={{height:35}} />
                         </View>       
                     </View>
                     <View style={styles.AuthorInputs}>
                         <NormalText style={styles.SelectorName}>Author Email</NormalText> 
                         <View style={styles.TextInputContainer}>
                             <TextInput onChangeText={(e)=>this.onAuthorsEmailChange(e,index)} style={{height:35}} />
                         </View>       
                     </View>
               
             </View>
        ))

        let ShowKeywords=this.state.Keywords.map((result)=>(
            <View style={styles.Keywords}>
                <NormalText style={{marginBottom:0,color:'white',fontSize:12}}>{result}</NormalText>
                <TouchableOpacity onPress={()=>this.AddKeywords(result,false)}>
                    <FontAwesome name="close" size={12} color="white" />
                </TouchableOpacity>                            
            </View>
        ))

        let ShowResearchHouse=this.state.ResearchHouse.map((result)=>(
            <Picker.Item key={result.Id} value={result.Name} label={result.Name}/>
        ))

        let ShowCoverageTypes=this.state.CoverageTypes.map((result)=>(
            <Picker.Item key={result.Id} value={result.Name} label={result.Name}/>
        ))

        let ShowReportType=this.state.ReportType.map((result)=>(
            <Picker.Item key={result.Id} value={result.Name} label={result.Name}/>
        ))

        let ShowSectorType=this.state.SectorTypes.map((result)=>(
            <Picker.Item key={result.Id} value={result.Id} label={result.Name}/>
        ))

        let ShowMarketCaps=this.state.MarketCaps.map((result)=>(
            <Picker.Item key={result.Id} value={result.Name} label={result.Name}/>
        ))

        let ShowPackageList=this.state.PackageList.map(result =>(
            <Picker.Item key={result.PackageId} value={`${result.PackageId},${result.MarketSegmentId}`} label={result.PackageName}/>
        ))

        let ShowExchanges=this.state.Exchanges.map(result =>(
            <Picker.Item key={result} value={result} label={result}/>
        ))



        let ShowLegs=this.state.Legs.map((result,index) =>(
            <Card style={styles.CustomCard}>
                <View style={{width:'100%',marginVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>
                    <MwisrSelector onSelect={()=>this.onLegsEdit(index,0,1)} Selected={this.state.Legs[index].CallType === 1 ? true : false} Text="BUY" width={100}/>
                    <MwisrSelector onSelect={()=>this.onLegsEdit(index,0,2)} Selected={this.state.Legs[index].CallType === 2 ? true : false} Text="SELL" width={100}/>
                </View>

                <View style={{width:'100%',marginVertical:5}}>
                    <NormalText style={{marginBottom:10,fontSize:14}}>Symbol Name</NormalText>
                    <View style={styles.KeywordTextInput}>
                        <TextInput onChangeText={(e)=> this.onLegsEdit(index,1,e) } style={{height:35}}/>
                    </View>
                        {result.ReceivedSymbol.length > 0 ? 
                        <View style={styles.Suggestions}>
                            <ScrollView nestedScrollEnabled={true} style={{width:'100%'}}>
                            {this.state.Legs[index].ReceivedSymbol.map(result => (
                                <TouchableOpacity>
                                    <NormalText>{result.Symbol}</NormalText>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                        </View>:null}
               
                </View>

                <View style={{width:'100%',marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                    {this.state.MarketSegmentId !== "1" ?
                    <View style={{width:'45%'}}>
                        <NormalText style={{marginBottom:10,fontSize:14}}>Expiry Date</NormalText>
                        <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                            <Picker selectedValue={result.ExpiryDate} onValueChange={(val)=>this.setState({SelectedCoverageType:val})}>
                                {result.ExpiryDateList.map((result,index)=>{
                                    return(
                                        <Picker.Item key={index} label={result} key={result}/>
                                    )
                                })}
                            </Picker>
                        </View>
                    </View>:null}

                    <View style={{width:`${this.state.MarketSegmentId === "1" ? "100%":"45%"}`}}>
                        <NormalText style={{marginBottom:10,fontSize:14}}>Enter CMP Price</NormalText>
                        <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                            <TextInput onChangeText={(e)=> this.onLegsEdit(index,4,e) } style={{height:35}}/>
                        </View>
                    </View>
                </View>

                <View style={{width:'100%',marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:'45%'}}>
                        <NormalText style={{marginBottom:10,fontSize:14}}>Enter Target</NormalText>
                        <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                            <TextInput onChangeText={(e)=>this.onLegsEdit(index,2,e)} style={{height:35}}/>
                        </View>
                    </View>

                    <View style={{width:'45%'}}>
                        <NormalText style={{marginBottom:10,fontSize:14}}>Enter StopLoss</NormalText>
                        <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                            <TextInput onChangeText={(e)=>this.onLegsEdit(index,3,e)} style={{height:35}}/>
                        </View>
                    </View>
                </View>

                <View style={{width:'100%',marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:'45%'}}>
                        <NormalText style={{marginBottom:10,fontSize:14}}>Call Start Date</NormalText>
                        <View style={{...styles.KeywordTextInput,...{flexDirection:'row',alignItems:'center'}}}>
                                 <DatePicker
                                        style={{width: 50}}
                                        date={this.state.Legs[index].DurationFrom}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-05-2016"
                                        maxDate="01-05-2025"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        hideText={true}
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                                width:20,
                                                height:20,
                                                marginTop:5
                                            },
                                            dateInput: {
                                                width: 250,
                                                height:35,
                                                borderRadius:5
                                            }
                                            }}
                                        onDateChange={(date) => this.onLegsEdit(5,index,date)}
                                    />
                                    <NormalText style={{marginBottom:0,fontSize:14}}>{this.state.Legs[index].DurationFrom}</NormalText> 
                        </View>
                    </View>

                    <View style={{width:'45%'}}>
                        <NormalText style={{marginBottom:10,fontSize:14}}>Call End Date</NormalText>
                        <View style={{...styles.KeywordTextInput,...{flexDirection:'row',alignItems:'center'}}}>
                                    <DatePicker
                                        style={{width: 50}}
                                        date={this.state.Legs[index].DurationTo}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-05-2016"
                                        maxDate="01-05-2025"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        hideText={true}
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                                width:20,
                                                height:20,
                                                marginTop:5
                                            },
                                            dateInput: {
                                                width: 250,
                                                height:35,
                                                borderRadius:5
                                            }
                                            }}
                                        onDateChange={(date) =>this.onLegsEdit(6,index,date)}
                                    />
                                    <NormalText style={{marginBottom:0,fontSize:14}}>{this.state.Legs[index].DurationTo}</NormalText> 
                        </View>
                    </View>
                </View>

                <View style={{width:'100%',alignItems:'flex-end',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>this.AddRemoveMoreLegs(false,index)}>
                        <CustomButton style={{width:140,borderRadius:5}}>
                            <NormalText style={{...styles.SelectorName,...{color:'white',fontSize:12}}}>Remove This Leg</NormalText>
                        </CustomButton>
                    </TouchableOpacity>
                </View>
            </Card>
        ))

        return(
            <Container style={styles.CustomContainer} >
                <ScrollView style={{width:'100%'}}>
                    
                <Card style={{...styles.CustomCard,...{justifyContent: 'flex-start',alignItems: 'center',flexDirection: 'row'}}}>
                    <View> 
                    <NormalText style={{marginBottom:0,marginLeft:10,fontSize:14}}>Upload File</NormalText>
                        <TouchableOpacity onPress={()=>this.SelectFile()}>
                            <CustomButton style={{width:100,borderRadius:5}}>
                                <NormalText style={{marginBottom:0,color:'white'}}>Select File</NormalText>
                            </CustomButton>
                        </TouchableOpacity>
                    </View>
                    <NormalText style={{marginBottom:0,marginLeft:10,marginTop:25}}>{this.state.FileName === "" ? "No FIle Has Been Selected":this.state.FileName}</NormalText>
                </Card>                
                    
                    
{/* --------------------------------------------------Add Keyword-------------------------------------------------------------------                     */}
                    
                  
                    <Card style={styles.CustomCard}>
                        <View style={styles.KeywordContainer}>
                            <View style={{width:'80%'}}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Add Keywords</NormalText>
                                <View style={styles.KeywordTextInput}>
                                    <TextInput onChangeText={(e)=> this.setState({KeywordText:e},()=>console.log(this.state.KeywordText))} style={{height:35}}/>
                                </View>
                            </View>
                            <View style={styles.KeywordButtonContainer}>
                                <TouchableOpacity onPress={()=>this.AddKeywords(this.state.KeywordText,true)}>
                                    <CustomButton style={{width:55,borderRadius:5}}>
                                        <NormalText style={{marginBottom:0,color:'white'}}>ADD</NormalText>
                                    </CustomButton>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.KeywordsContainer}>
                            {ShowKeywords}
                        </View>
                        <View style={{...styles.KeywordsContainer,...{justifyContent:'space-between'}}}>
                            <View style={styles.DatesContainer}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Report Start Date</NormalText>
                                <View style={styles.DatePickerContainer}>
                                    <DatePicker
                                        style={{width: 50}}
                                        date={this.state.ReportsCreationDate}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-05-2016"
                                        maxDate="01-05-2025"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        hideText={true}
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                                width:20,
                                                height:20,
                                                marginTop:5
                                            },
                                            dateInput: {
                                                width: 250,
                                                height:35,
                                                borderRadius:5
                                            }
                                            }}
                                        onDateChange={(date) => this.onCreatedDateChange(date)}
                                    />
                                    <NormalText style={{marginBottom:0,fontSize:14}}>{this.state.ReportsCreationDate}</NormalText>   
                                </View>
                            </View>
                            <View style={styles.DatesContainer}>
                            <NormalText style={{marginBottom:10,fontSize:14}}>Report Start Date</NormalText>
                            <View style={styles.DatePickerContainer}>
                                    <DatePicker
                                        style={{width: 50}}
                                        date={this.state.ReportEndDate}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-05-2016"
                                        maxDate="01-05-2025"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        hideText={true}
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                                width:20,
                                                height:20,
                                                marginTop:5
                                            },
                                            dateInput: {
                                                width: 250,
                                                height:35,
                                                borderRadius:5
                                            }
                                            }}
                                        onDateChange={(date) => this.onEndDateChange(date)}
                                    />
                                    <NormalText style={{marginBottom:0,fontSize:14}}>{this.state.ReportEndDate}</NormalText>   
                                </View>
                            </View>
                        </View>
                    </Card>

{/* ----------------------------------------------------Authors------------------------------------------- */}
                    
                  
                    <Card style={styles.CustomCard}>
                        {ShowAuthors}
                        <View style={styles.CustomButtonContainer}>
                        {this.state.Authors.length > 1 ? 
                        <TouchableOpacity onPress={()=>this.RemoveAuthors()}>
                            <CustomButton style={{width:120}}>
                                <NormalText style={{...styles.SelectorName,...{color:'white',fontSize:12}}}>Remove Authors</NormalText>
                            </CustomButton>
                        </TouchableOpacity>
                        :null}
                        <TouchableOpacity onPress={()=>this.AddAuthors()}>
                            <CustomButton style={{width:120}}>
                                <NormalText style={{...styles.SelectorName,...{color:'white',fontSize:12}}}>Add More Authors</NormalText>
                            </CustomButton>
                        </TouchableOpacity>
                        </View>
                    </Card>


{/* ----------------------------------------------------Report Details------------------------------------------- */}

                    <Card style={styles.CustomCard}>
                        <View style={{width:'100%',marginVertical:5}}>
                            <NormalText style={{marginBottom:10,fontSize:14}}>Report Name</NormalText>
                            <View style={styles.KeywordTextInput}>
                                <TextInput onChangeText={(e)=>{}} style={{height:35}}/>
                            </View>
                        </View>

                        <View style={{width:'100%',marginVertical:5}}>
                            <NormalText style={{marginBottom:10,fontSize:14}}>Coverage By</NormalText>
                            <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                               <Picker selectedValue={this.state.SelectedResearchHouse} onValueChange={(val)=>this.setState({SelectedResearchHouse:val})}>
                                    {ShowResearchHouse}
                               </Picker>
                            </View>
                        </View>

                        <View style={{width:'100%',marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{width:'45%'}}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Coverage Types</NormalText>
                                <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                                    <Picker selectedValue={this.state.SelectedCoverageType} onValueChange={(val)=>this.setState({SelectedCoverageType:val})}>
                                       {ShowCoverageTypes}     
                                    </Picker>
                                </View>
                            </View>

                            <View style={{width:'45%'}}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Coverage Types</NormalText>
                                <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                                    <Picker selectedValue={this.state.SelectedReportType} onValueChange={(val)=>this.setState({SelectedReportType:val})}>
                                        {ShowReportType} 
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        <View style={{width:'100%',marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{width:'45%'}}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Sector Types</NormalText>
                                <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                                    <Picker selectedValue={this.state.SelectedCoverageType} onValueChange={(val)=>this.setState({SelectedCoverageType:val})}>
                                       {ShowSectorType}
                                    </Picker>
                                </View>
                            </View>

                            <View style={{width:'45%'}}>
                                <NormalText style={{marginBottom:10,fontSize:14}}>Market Caps</NormalText>
                                <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                                    <Picker selectedValue={this.state.SelectedReportType} onValueChange={(val)=>this.setState({SelectedReportType:val})}>
                                       {ShowMarketCaps}
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        <View style={{width:'100%',marginVertical:5}}>
                            <NormalText style={{marginBottom:10,fontSize:14}}>Select Package</NormalText>
                            <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                               <Picker selectedValue={`${this.state.SelectedPacakgeId},${this.state.MarketSegmentId}`} onValueChange={(val)=>this.changePackage(val)}>
                                   {ShowPackageList}
                               </Picker>
                            </View>
                        </View>

                        <View style={{width:'100%',marginVertical:5}}>
                            <NormalText style={{marginBottom:10,fontSize:14}}>Select Exchange</NormalText>
                            <View style={{...styles.KeywordTextInput,justifyContent:'center'}}>
                               <Picker selectedValue={this.state.SelectedResearchHouse} onValueChange={(val)=>this.setState({SelectedResearchHouse:val})}>
                                    {ShowExchanges}
                               </Picker>
                            </View>
                        </View>
                    </Card>

{/* ----------------------------------------------------Call Legs------------------------------------------- */}


                    <View style={{width:'100%',alignItems:'flex-end',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>this.AddRemoveMoreLegs(true,null)}>
                            <CustomButton style={{width:120}}>
                                <NormalText style={{...styles.SelectorName,...{color:'white',fontSize:12}}}>Add More Script</NormalText>
                            </CustomButton>
                        </TouchableOpacity>
                    </View>

                   {ShowLegs}

                    <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity>
                            <CustomButton style={{width:120}}>
                                <NormalText style={{...styles.SelectorName,...{color:'white',fontSize:12}}}>Add Report</NormalText>
                            </CustomButton>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustomContainer:{
        justifyContent: 'flex-start',
        backgroundColor:'#E9EAEF',
        padding:10
    },

    Selector:{
        width:'100%',
        borderTopWidth:1,
        borderColor:'grey'
    },
    SelectorNameContainer:{
        width:100,
        alignItems:'center',
        backgroundColor:'#E9EAEF',
        marginTop:-10,
        alignSelf:'center'
    },
    SelectorName:{
        marginBottom:0,
        fontSize:14
    },
    CustomCard:{
        width:'100%',
        marginVertical:10,
        padding:10,
        borderRadius:5
    },
    AuthorContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    AuthorInputs:{
       width:'48%',
       alignItems:'flex-start'
    },
    TextInputContainer:{
        width:'90%',
        height:35,
        borderWidth:1,
        borderColor:'#CBCFD6',
        marginVertical:5
    },
    CustomButtonContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    KeywordContainer:{
        width:'100%',
        flexDirection:'row',
        padding:5,
        justifyContent:'space-between',
        marginBottom:15
    },
    KeywordTextInput:{
        width:'100%',
        height:35,
        borderWidth:1,
        borderColor:'#CBCFD6',
        borderRadius:0
    },
    KeywordButtonContainer:{
        width:'20%',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    KeywordsContainer:{
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:10
    },
    Keywords:{
        width:'30%',
        height:35,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f5bb18',
        borderRadius:5,
        justifyContent:'space-evenly'
    },
    DatesContainer:{
        width:'45%',
        overflow:'hidden'

    },
    DatePickerContainer:{
        width:'100%',
        borderWidth:1,
        borderColor:"#CBCFD6",
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'flex-start',
        height:35
    },
    Suggestions:{
        width:'100%',
        height:75,
        marginVertical:10
    }
})


const mapStateToProps= state =>{
    return{
        loginState:state.login.login
    }
}

const mapDispatchToProps = dispatch =>{
    return{
       
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddReports);