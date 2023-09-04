import { View, Text, TouchableOpacity, StyleSheet, StatusBar,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamProps } from '../constant/stack_navigation'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import YourStats from '../components/YourStats';
import GlobalStats from '../components/GlobalStats';
import { useIsFocused } from "@react-navigation/native";
import { CheckNetworkConnectivity } from '../services/netInfo';

const StatsScreen = ({navigation, route}:StackScreenProps<StackParamProps, "StatsScreen"> ) => {

  const [clicked, setClicked] = useState(0)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {

   CheckNetworkConnectivity().then((res) => {
    setIsOnline(res)
   })
   
  },[useIsFocused, isOnline])


  return (
    <SafeAreaProvider>
      <SafeAreaView>
        
        <View style={style.main}>
          <View style={style.viewBoard}>
            <View style={style.topContent}>
              <TouchableOpacity style={[style.leftBtn,{backgroundColor: clicked == 0 ? "green": "lightgray"}]} onPress={() => setClicked(0)}>
              <Text style ={[style.topText,{color: clicked == 0? "white" : "black"}]}>Your Stat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[style.rightBtn,{backgroundColor: clicked == 1 ? "green": "lightgray"}]} onPress={() => setClicked(1)}>
              <Text style ={[style.topText,{color: clicked == 1? "white" : "black"}]}>Global Stat</Text>
              </TouchableOpacity>
              
            </View>
             <View style={style.contentBoard}>
              {clicked == 0 ? 
                <YourStats/> : isOnline?
                <GlobalStats/> : "Please Connect To Internet"
            }
             </View>
          </View>
        </View>
      </SafeAreaView>
        </SafeAreaProvider>
  )
}

const style = StyleSheet.create({
  contentBoard: {
    width:"100%",
    height:"91%",
    justifyContent:"center",
    alignItems:"center"
  },
  main: {
    width:"100%",
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
   viewBoard: {
    backgroundColor:"#EEEDED",
    width:"90%",
    height:"70%",
    borderRadius:5,
  },
  topContent: {
   width:"100%",
   borderTopLeftRadius:5,
   borderTopRightRadius:5,
   height:40,
   display:"flex",
   flexDirection:"row",
   justifyContent:"space-around",
   backgroundColor:"lightgray"
 },
 leftBtn : {
  width:"50%",
  height:40,
  borderTopLeftRadius:5,
  justifyContent:"center",
  alignItems:"center",
  borderRightWidth:0.5,
},
rightBtn : {
  width:"50%",
  height:40,
  borderTopRightRadius:5,
  justifyContent:"center",
  alignItems:"center",
  borderRightWidth:0.5,
},
topText :{
  fontFamily:"RobotoBold",
  fontSize:17
}
  
})

export default StatsScreen