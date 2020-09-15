import React from 'react'
import { View, StyleSheet } from 'react-native'
import Card from '../Components/Card'
import NormalText from './NormalText'
import {getPackageFontColor} from '../Utils/api'
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'

class MiniPackage extends React.Component{

    constructor(){
        super()
        this.state={
            Date:"23-01-2021"
        }
    }

    onChangeDate=(date,Id)=>{
        this.setState({Date:date})
        this.props.onDateChange(date,Id)
    }

    render()
    {
        // console.log("13",this.props.Package)
        return(
            
            <View style={{...styles.MiniCard,...this.props.style}}>
                <View style={{width:'90%'}}>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:12}}>Package : {this.props.Package.PackageName}</NormalText>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:12}}>Exchanges : {this.props.ForTele ? this.props.Package.Exchanges:this.props.Package.ForExchanges}</NormalText>
                    <NormalText style={{marginBottom:5,color:'black',fontSize:12}}>Type : {this.props.ForTele ? this.props.Package.SegmentName : this.props.Package.PackageTypeName}</NormalText>
                    {this.props.ShowDate ?
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:-10}}>
                        <NormalText style={{marginBottom:0,color:'black',fontSize:12,marginRight:10}}>Valid Till : {this.state.Date}</NormalText>
                            
                                
                                <DatePicker
                                    style={{width: 200}}
                                    date={"23-10-2021"}
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
                                        height: 0,
                                        width: 0,
                                        marginRight: -30
                                    }
                                    }}
                                    onDateChange={(date) => this.onChangeDate(date,this.props.Package.PackageId)}
                                />
                   
                    </View>:null}
                    
                </View>
                <View style={{width:'10%',alignItems:'center',justifyContent:'flex-start'}} >
                    {this.props.ShowClose ?                     
                    <TouchableOpacity onPress={()=>this.props.onClosePress(this.props.Package.PackageId)}>
                        <FontAwesome name="close" size={12} color="black" />
                    </TouchableOpacity>:null}
                </View>
            </View>
        )
        
    }
}

const styles=StyleSheet.create({
    MiniContainer:{
        width:'100%'
    },
    MiniCard:{
        width:'100%',
        borderLeftWidth:5,
        borderLeftColor:'#16d39a',
        elevation:1,
        padding:5,
        flexDirection:'row',
        backgroundColor:'white'
    }
})


export default MiniPackage


// <DatePicker
// style={{width: 200}}
// date={"23-10-2021"}
// mode="date"
// placeholder="select date"
// format="DD-MM-YYYY"
// minDate="01-05-2016"
// maxDate="01-05-2020"
// confirmBtnText="Confirm"
// cancelBtnText="Cancel"
// customStyles={{
// dateIcon: {
//     position: 'absolute',
//     left: 0,
//     top: 4,
//     marginLeft: 0
// },
// dateInput: {
//     marginLeft: 36,
//     borderWidth:0
// }
// // ... You can check the source to find the other keys.
// }}
// onDateChange={(date) => {}}
// />