import React from 'react'
import { View,TouchableOpacity } from 'react-native';
import BoldText from './BoldText';
import NormalText from './NormalText';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

class UserFilter extends React.Component{
    constructor()
    {
        super();
        this.state={
            AccuracyFilter:null,
            ProfitFilter:null,
            ROIFilter:null,
            Accuracy:[
                {
                    Name:"Show All",
                    Key:null
                },
                {
                    Name:"Between 0,25",
                    Key:"0,25"
                },
                {
                    Name:"Between 25-50",
                    Key:"25,50"
                },
                {
                    Name:"Between 50-75",
                    Key:"50,75"
                },
                {
                    Name:"Less Than 75",
                    Key:"0,75"
                },
                {
                    Name:"Between 75-100",
                    Key:"75,100"
                }
            ],
            Profit:[
                {
                    Name:"Show All",
                    Key:null
                },
                {
                    Name:"Below 5000",
                    Key:"0,5000"
                },
                {
                    Name:"Between 5000-10000",
                    Key:"5000,10000"
                },
                {
                    Name:"Between 10000-25000",
                    Key:"10000,25000"
                },
                {
                    Name:"More than 25000",
                    Key:"25000"
                }
            ],
            ROI:[
                {
                    Name:"Show All",
                    Key:null
                },
                {
                    Name:"Between 0-25",
                    Key:"0,25"
                },
                {
                    Name:"Between 25-50",
                    Key:"25,50"
                },
                {
                    Name:"Below 50",
                    Key:"0,50"
                },
                {
                    Name:"Between 50-75",
                    Key:"50,75"
                },
                {
                    Name:"Less Than 75",
                    Key:"0,75"
                },
                {
                    Name:"Between 75-100",
                    Key:"75,100"
                },
                {
                    Name:"More Than 100",
                    Key:"100"
                },
            ]
        }
    }

    sendBackFilters=()=>{
        let SendFilters={
            AccuracyFilter:this.state.AccuracyFilter,
            ProfitFilter:this.state.ProfitFilter,
            ROIFilter:this.state.ROIFilter
        }

        this.props.AppliedFilter(SendFilters)
    }

    showAccuracyFilter=(itemData)=>(
        <View style={{width:'32%',margin:2,borderColor:this.props.UserColor,borderWidth:1,alignItems:'center',padding:5,borderRadius:5,backgroundColor:this.state.AccuracyFilter ===  itemData.item.Key ? this.props.UserColor:'white'}}>
            <TouchableOpacity onPress={()=>this.setState({AccuracyFilter:itemData.item.Key})}>
                <NormalText style={{marginBottom:0,color:this.state.AccuracyFilter === itemData.item.Key ? 'white':this.props.UserColor}}>{itemData.item.Name}</NormalText>
            </TouchableOpacity>
        </View>
    )

    showProfitFilter=(itemData)=>(
        <View style={{width:'49%',margin:2,borderColor:this.props.UserColor,borderWidth:1,alignItems:'center',padding:5,borderRadius:5,backgroundColor:this.state.ProfitFilter ===  itemData.item.Key ? this.props.UserColor:'white'}}>
            <TouchableOpacity onPress={()=>this.setState({ProfitFilter:itemData.item.Key})}>
                <NormalText style={{marginBottom:0,color:this.state.ProfitFilter === itemData.item.Key ? 'white':this.props.UserColor}}>{itemData.item.Name}</NormalText>
            </TouchableOpacity>
        </View>
    )

    showROIFilter=(itemData)=>(
        <View style={{width:'32%',margin:2,borderColor:this.props.UserColor,borderWidth:1,alignItems:'center',padding:5,borderRadius:5,backgroundColor:this.state.ROIFilter ===  itemData.item.Key ? this.props.UserColor:'white'}}>
            <TouchableOpacity onPress={()=>this.setState({ROIFilter:itemData.item.Key})}>
                <NormalText style={{marginBottom:0,color:this.state.ROIFilter === itemData.item.Key ? 'white':this.props.UserColor}}>{itemData.item.Name}</NormalText>
            </TouchableOpacity>
        </View>
    )

    render()
    {
        return(
            <View style={{flex:1,marginTop:60,backgroundColor:'white',borderTopLeftRadius:25,borderTopRightRadius:25,elevation:1,padding:15}}>
                
                <View style={{flexDirection:'row'}}>
                    <View style={{width:'50%',alignItems:'flex-start'}}>
                        <BoldText style={{fontSize:20}}>Filters</BoldText>
                    </View>
                    <View style={{width:'50%',alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>this.sendBackFilters()}>
                            <View style={{width:100,marginTop:10,alignItems:'center',padding:10,borderRadius:10,backgroundColor:this.props.UserColor}}>
                                <NormalText style={{marginBottom:0,color:'white',fontSize:12}}>Apply Filters</NormalText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                

                <NormalText style={{fontSize:18}}>Accuracy</NormalText>
                    <View style={{marginBottom:15}}>
                        <FlatList
                            keyExtractor={(item,data)=>item.Key}
                            data={this.state.Accuracy}
                            renderItem={this.showAccuracyFilter}
                            numColumns={3}/>
                            
                    </View>
                  

                <NormalText style={{fontSize:18}}>Profit</NormalText>
                    <View style={{marginBottom:15}}>
                        <FlatList
                            keyExtractor={(item,data)=>item.Key}
                            data={this.state.Profit}
                            renderItem={this.showProfitFilter}
                            numColumns={2}/>
                            
                    </View>
            
                    

                <NormalText style={{fontSize:18}}>ROI</NormalText>
                    <View style={{marginBottom:15}}>
                        <FlatList
                            keyExtractor={(item,data)=>item.Key}
                            data={this.state.ROI}
                            renderItem={this.showROIFilter}
                            numColumns={3}/>
                            
                    </View>

        </View>
        )
    }
}


export default UserFilter;