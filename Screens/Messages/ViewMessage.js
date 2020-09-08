import React from 'react'
import {StyleSheet,View,TouchableOpacity,Modal} from 'react-native'
import Container from '../../Components/Container'
import NormalText from '../../Components/NormalText'
import Card from '../../Components/Card'
import { FontAwesome } from '@expo/vector-icons';
import MessageFilter from '../../Components/MessageFilter'

class ViewMessage extends React.Component {
    constructor()
    {
        super();
        this.state={
            ShowReceived:false,
            ShowFilterModal:false
        }
    }

    ChangeMessageTab=()=>{
        this.setState({ShowReceived:!this.state.ShowReceived})
    }

    closeFilterModal=()=>{
        this.setState({ShowFilterModal:false})
    }

    render()
    {
        return(
            <Container style={styles.ViewMessageContainer}>
                <View style={styles.TabContainer}>
                    <View style={!this.state.ShowReceived ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.ChangeMessageTab()}>
                            <NormalText style={!this.state.ShowReceived ? styles.TabsTextSelected:styles.TabsText}>Sent Messages</NormalText>
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.ShowReceived ? styles.TabsSelected:styles.Tabs}>
                        <TouchableOpacity onPress={()=>this.ChangeMessageTab()}>
                            <NormalText style={this.state.ShowReceived ? styles.TabsTextSelected:styles.TabsText}>Received Messages</NormalText>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MessageContainer}>
                    <Card style={styles.MessageCard}>
                        {!this.state.ShowReceived ?
                        <>
                            <>
                            <View style={styles.SentMessage}>
                                <NormalText style={{color:'white',marginBottom:0}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</NormalText>
                            </View>
                                <NormalText style={{color:'grey',alignSelf:'flex-end'}}>28 Aug 2020 9:53 AM</NormalText>
                            </>

                            <>
                            <View style={styles.SentMessage}>
                                <NormalText style={{color:'white',marginBottom:0}}>Vestibulum ac libero nec justo dapibus varius. Donec sollicitudin a lacus ac blandit. In hac habitasse platea dictumst. Proin maximus tempus posuere.</NormalText>
                            </View>
                                <NormalText style={{color:'grey',alignSelf:'flex-end'}}>28 Aug 2020 9:53 AM</NormalText>
                            </>

                            <>
                            <View style={styles.SentMessage}>
                                <NormalText style={{color:'white',marginBottom:0}}>Donec velit magna, bibendum non felis id, bibendum ullamcorper purus. In hendrerit massa felis, vitae commodo arcu feugiat vel. Duis eget augue erat. Morbi massa augue, mollis pulvinar ornare cursus, lobortis ac nunc. Nam augue enim, tristique et est et, tristique convallis mi.</NormalText>
                            </View>
                                <NormalText style={{color:'grey',alignSelf:'flex-end'}}>28 Aug 2020 9:53 AM</NormalText>
                            </>
                        </>:
                         <>
                         <>
                         <View style={styles.ReceivedMessage}>
                             <NormalText style={{color:'white',marginBottom:0}}>Vestibulum dolor nunc, tempus at volutpat a, porttitor non urna. </NormalText>
                         </View>
                             <NormalText style={{color:'grey',alignSelf:'flex-start'}}>28 Aug 2020 9:53 AM</NormalText>
                         </>

                         <>
                         <View style={styles.ReceivedMessage}>
                             <NormalText style={{color:'white',marginBottom:0}}>Curabitur sapien tellus, bibendum non vestibulum vitae, congue et nulla. Etiam gravida pharetra dolor. Cras vel neque sed augue sodales efficitur. Sed nec nisl mi. </NormalText>
                         </View>
                             <NormalText style={{color:'grey',alignSelf:'flex-start'}}>28 Aug 2020 9:53 AM</NormalText>
                         </>

                         <>
                         <View style={styles.ReceivedMessage}>
                             <NormalText style={{color:'white',marginBottom:0}}>Vivamus dignissim rhoncus accumsan. In leo lorem, porta nec orci vitae, mollis dictum elit. Nulla suscipit dapibus turpis in tincidunt. Aliquam blandit dui sit amet elit finibus sagittis. Pellentesque lobortis non turpis vitae porttitor. Maecenas dapibus, eros et eleifend mattis, quam justo elementum velit, ac ultricies orci dui vitae quam. </NormalText>
                         </View>
                             <NormalText style={{color:'grey',alignSelf:'flex-start'}}>28 Aug 2020 9:53 AM</NormalText>
                         </>

                         <>
                         <View style={styles.ReceivedMessage}>
                             <NormalText style={{color:'white',marginBottom:0}}>Vestibulum pulvinar sem vel dui luctus, in tincidunt lectus pharetra. Nulla id dolor velit. Nam sodales congue ipsum, in eleifend lectus ornare a. </NormalText>
                         </View>
                             <NormalText style={{color:'grey',alignSelf:'flex-start'}}>28 Aug 2020 9:53 AM</NormalText>
                         </>
                     </>}

                        <View style={{width:'100%',height:'100%',position:'absolute',elevation:6,alignItems:'flex-end',justifyContent:'flex-end',zIndex:1}}>
                            <TouchableOpacity onPress={()=>this.setState({ShowFilterModal:true})}>
                                <View style={{width:60,height:60,borderRadius:100,backgroundColor:'#F0B22A',alignItems:'center',justifyContent:'center'}}>
                                    <FontAwesome name="filter" size={28} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Modal visible={this.state.ShowFilterModal} animationType="slide" transparent={true}>
                            <MessageFilter 
                                closeFilter={this.closeFilterModal}/>
                        </Modal>
                    </Card>
                </View>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    ViewMessageContainer:{
        justifyContent:'flex-start',
        backgroundColor:'#EAEBF0'
    },
    TabContainer:{
        width:'100%',
        height:35,
        backgroundColor:'white',
        flexDirection:'row',
        elevation:3  
    },
    Tabs:{
        width:'50%',
        alignItems:'center',
        justifyContent:'center'
    },
    TabsSelected:{
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#F0B22A',
        borderBottomWidth:3
    },
    TabsText:{
        fontSize:10,
        color:'black',
        marginBottom:0
    },
    TabsTextSelected:{
        fontFamily:'open-sans-bold',
        fontSize:11,
        color:'black',
        marginBottom:0
    },
    MessageContainer:{
        padding:5,
        flex:1,
        width:'100%',
    },
    MessageCard:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-start',
        padding:5
    },
    SentMessage:{
        width:'75%',
        alignSelf:'flex-end',
        backgroundColor:'grey',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        padding:5
    },
    ReceivedMessage:{
        width:'75%',
        alignSelf:'flex-start',
        backgroundColor:'#f5bb18',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        padding:5
    }
})

export default ViewMessage