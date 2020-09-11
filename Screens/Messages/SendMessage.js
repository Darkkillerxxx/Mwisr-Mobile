import React from 'react';
import { View,StyleSheet,TouchableOpacity,Picker,TextInput,ScrollView } from 'react-native';
import Container from '../../Components/Container'
import Card from '../../Components/Card'
import NormalText from '../../Components/NormalText'
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../../Components/Button'

class SendMessage extends React.Component{
    constructor()
    {
        super()
        this.state={
            SendType:0
        }
    }

    render()
    {
        return (
            <Container style={styles.CustomContainer}>
                <ScrollView style={{padding:5}}>
                    <Card style={styles.CustomCard}>
                        <NormalText style={{fontSize:14}}>Send Message To</NormalText>
                        <View style={styles.SelectorContainer}>
                        <TouchableOpacity onPress={()=>this.setState({SendType:0})} style={{width:'30%'}} > 
                            <View style={{...styles.Selector,...{backgroundColor:`${this.state.SendType === 0 ? "#f5bb18":'white'}`}}}>
                                <FontAwesome name="user" size={24} color={`${this.state.SendType === 0 ? 'white':"#f5bb18"}`} />
                                <NormalText style={{fontSize:14,marginBottom:0,color:`${`${this.state.SendType === 0 ? 'white':"#f5bb18"}`}`}}>Users</NormalText>
                            </View>
                        </TouchableOpacity>
                        
                            <TouchableOpacity onPress={()=>this.setState({SendType:1})} style={{width:'30%'}} > 
                                <View style={{...styles.Selector,...{backgroundColor:`${this.state.SendType === 1 ? "#f5bb18":'white'}`}}}>
                                    <FontAwesome name="dropbox" size={24} color={`${this.state.SendType === 1 ? 'white':"#f5bb18"}`} />
                                    <NormalText style={{fontSize:14,marginBottom:0,color:`${`${this.state.SendType === 1 ? 'white':"#f5bb18"}`}`}}>Packages</NormalText>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:'30%'}} onPress={()=>this.setState({SendType:2})}> 
                                <View style={{...styles.Selector,...{backgroundColor:`${this.state.SendType === 2 ? "#f5bb18":'white'}`}}}>
                                    <FontAwesome name="users" size={24} color={`${this.state.SendType === 2 ? 'white':"#f5bb18"}`} />
                                    <NormalText style={{fontSize:14,marginBottom:0,color:`${`${this.state.SendType === 2 ? 'white':"#f5bb18"}`}`}}>User Group</NormalText>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select Owners</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                            </Picker>
                        </View>

                        {this.state.SendType !== 1    ? 
                        <>
                            <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select User Type</NormalText>
                            <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                                <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                                </Picker>
                            </View>
                        </>:null}

                        {this.state.SendType !== 1 && this.state.SendType !== 2 ? 
                        <>
                        <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select User</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                            </Picker>
                        </View>
                        </>:null}

                        {this.state.SendType !== 0 && this.state.SendType !== 2  ? 
                        <>
                            <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Select Package</NormalText>
                            <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                                <Picker selectedValue={this.state.SelectedStrategyId} onValueChange={(val)=>this.setState({SelectedStrategyId:val})}  style={styles.CustomPicker}>
                                </Picker>
                            </View>
                        </>:null}

                        <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Compose Message</NormalText>
                        <View style={{width:'100%',borderWidth:1,borderColor:'#d3d7dc',borderRadius:5}}>
                            <TextInput numberOfLines={10} style={{width:'100%',height:100}}/>
                        </View>

                        <NormalText style={{fontSize:14,alignSelf:"flex-start",marginVertical:10}}>Send To Telegram</NormalText>
                    </Card>

                    <TouchableOpacity>
                        <CustomButton style={{alignSelf:'center',marginBottom:15}}>
                            <NormalText style={{fontSize:14,color:'white',marginBottom:0}}>Send Message</NormalText>
                        </CustomButton>
                    </TouchableOpacity>
                </ScrollView>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    CustomContainer:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#FAFAFA',
        padding:5
    },
    CustomCard:{
        padding:10,
        width:'95%',
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:'center'
    },
    SelectorContainer:{
        width:'100%',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginVertical:5,
        flexDirection:'row',
    },
    Selector:{
        height:85,
        padding:10,
        borderWidth:1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#f5bb18'
    },
    SelectedSelector:{
        backgroundColor:'#f5bb18'
    },
    CustomPicker:{
        borderRadius:20,
        borderColor:'#d3d7dc',
        borderWidth:1,
        width:'100%',
        marginVertical:2,
        height:30
    }
})

export default SendMessage