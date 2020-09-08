import React from 'react'
import {FontAwesome}  from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Login from '../Screens/Login/Login'
import Register from '../Screens/Register/Register'
import Home from '../Screens/Home/Home'
import OTP from '../Screens/OTP/OTP'
import Onboarding from '../Screens/Onboarding/Onboarding'
import AddCall from '../Screens/Calls/AddCall'
import AddPackage from '../Screens/Package/AddPackage'
import ViewPackage from '../Screens/Package/ViewPackages'
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from '../Components/CustomDrawer'
import Sub from '../Screens/Users/Sub'
import Analyst from '../Screens/Users/Analyst'
import Partner from '../Screens/Users/Partner'
import ViewCall from '../Screens/Calls/ViewCalls'
import CallDetails from '../Screens/Calls/CallDetails'
import { sub } from 'react-native-reanimated';
import ViewReports from '../Screens/Reports/ViewReports'
import AssignPackage from '../Screens/Package/AssignPackage'
import PackagePermission from '../Screens/Permissions/PackagePermission'
import AddUser from '../Screens/Users/AddUser'
import UserPermission from '../Screens/Permissions/UserPermission'
import UserDetails from '../Screens/Users/UserDetails'
import PackageDetails from '../Screens/Package/PackageDetails'
import Owners from '../Screens/Users/Owners'
import Customer from '../Screens/Users/Customer'
import AssignUsers from '../Screens/Package/AssignUsers'
import AddReports from '../Screens/Reports/AddReport'
import Notifications from '../Screens/Settings/Notifications'
import AddOns from '../Screens/Subscription/AddOns'
import Credits from '../Screens/Subscription/Credits'
import AssignPackageChannel from '../Screens/Telegram/AssignPackageChannel'
import ViewMessage from '../Screens/Messages/ViewMessage'
import ConfigTele from '../Screens/Telegram/ConfigTele'


const Drawer=createDrawerNavigator({
    Home:createBottomTabNavigator({
            Home:{
                screen:Home,
                navigationOptions:{
                    tabBarIcon:(tabIcon)=>{
                        return <FontAwesome name="home" size={25} color={tabIcon.tintColor} />
                    }
                }
            },
            AddCall:{
                screen:AddCall,
                navigationOptions:{
                    tabBarLabel:'Add Call',
                    tabBarIcon:(tabIcon)=>{
                        return <FontAwesome name="phone" size={25} color={tabIcon.tintColor} />
                    }
                }
            },
            AddPackage:{
                screen:AddPackage,
                navigationOptions:{
                    tabBarLabel:'Add Package',
                    tabBarIcon:(tabIcon)=>{
                        return <FontAwesome name="dropbox" size={25} color={tabIcon.tintColor} />
                    }
                }
            },
            AddReports:{
                screen:AddReports,
                navigationOptions:{
                    tabBarLabel:'Add Reports',
                    tabBarIcon:(tabIcon)=>{
                        return <FontAwesome name="file-o" size={23} color={tabIcon.tintColor} />
                    }
                }
            }
        },{
            tabBarOptions:{
                activeTintColor:"#f5bb18"
            }
        }),

    Package:{
        screen:AddPackage
    },
    Call:{
        screen:AddCall
    },
    ViewPackage:{
        screen:ViewPackage
    },
    Sub:{
        screen:Sub
    },
    Analyst:{
        screen:Analyst
    },
    Partner:{
        screen:Partner
    },
    ViewCalls:{
        screen:ViewCall
    },
    CallDetails:{
        screen:CallDetails
    },
    ViewReports:{
        screen:ViewReports
    },
    AssignPackage:{
        screen:AssignPackage
    },
    PackagePermission:{
        screen:PackagePermission
    },
    AddUser:{
        screen:AddUser
    },
    UserPermission:{
        screen:UserPermission
    },
    UserDetails:{
        screen:UserDetails
    },
    PackageDetails:{
        screen:PackageDetails
    },
    Owners:{
        screen:Owners
    },
    Customer:{
        screen:Customer
    },
    AssignUsers:{
        screen:AssignUsers
    },
    Notifications:{
        screen:Notifications
    },
    AddOns:{
        screen:AddOns
    },
    Credits:{
        screen:Credits
    },
    AssignPackageChannel:{
        screen:AssignPackageChannel
    },
    ViewMessage:{
        screen:ViewMessage
    },
    ConfigTele:{
        screen:ConfigTele
    }
},{
    contentComponent:CustomDrawer,
    drawerWidth:250
})

const MwisrNavigation=createSwitchNavigator({

    PreDB:createStackNavigator({
        Login:{
            screen:Login
        },
        Register:{
            screen:Register
        },
        OTP:{
            screen:OTP
        },
        Onboarding:{
            screen:Onboarding
        }
    },{
        headerMode:"none"
    }),
    ProDB:Drawer
})


// const ProDBStack=createStackNavigator({
//     Home:{
//         screen:Home,
//     },
//     Package:{
//         screen:AddPackage
//     },
//     Call:{
//         screen:AddCall
//     }
// })





export default createAppContainer(MwisrNavigation)