import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ToastAndroid, TextInput, StatusBar } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamProps } from '../constant/stack_navigation';
import { animatedBG, topicData } from '../constant';
import LottieView from 'lottie-react-native';
import { useIsFocused } from "@react-navigation/native";
import { colorRandomizer } from '../services/ColorRandomizer';
import { LinearGradient } from "expo-linear-gradient";
import LocalStorage from '../services/localStorage';
import LeaderBoards from '../database/firebase/leaderboards_repo';


const HomeScreen = ({navigation, route}:StackScreenProps<StackParamProps, "HomeScreen">) => {

  const isFocused = useIsFocused()

  const [id, setId] = useState(0)
  const [username, setUsername] = useState("")
  const [userStorage, setUserStorage] = useState("")
  const [exist, setExist] = useState(true)
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    setId(0)
    setUsername("")
  },[isFocused])

  useEffect(() => {

    LocalStorage.getItem("username").then((res) => {
      if(res !== ""){
        setUserStorage(res as string)
      }
    }) 
  },[useIsFocused, username])

  useEffect(() => {

    LeaderBoards.checkUsername(username).then((res) => {
      setExist(res as boolean)
    })
  },[username])

  
  const handleTopic = (id:number) => {
    setId(id)
  }

const handleToast = (text:string) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
}

 const handleStart = () => {

  if(id != 0){

    if(username !== "" || userStorage !== "" ){

      if(!exist){

      LocalStorage.setItem("username", username).then((res) => {

        if(res) {
          return navigation.navigate("QuizScreen", {
            topicID:id
          })
        } else {

          handleToast(String(res))
        }
      })
    } else {

      handleToast("Username Already Exist!")
    }
      
    }else {
      handleToast("Enter Username!")
    }
    
  
  } else {
    handleToast('Select Topic First!')
  }
 }

 const handleStats = () => {

  return navigation.navigate("StatsScreen")
 }

 const startAnimation = () => {
  if (animationRef.current) {
    animationRef.current.play();
  }
};
useEffect(() => {
  startAnimation();
}, []);

  return (
    <>
    <View style={style.container}>
      
       {id != 0? (
         <LottieView
         ref={animationRef}
         source={animatedBG[id-1]}  
         style={style.animatedBG}
         loop={true}
         autoPlay
       />
      ) : (
        <LottieView
         ref={animationRef}
         source={require('../assets/background/background.json')}  
         style={style.background}
         loop={true}
         autoPlay
       />
      )}
     
      <View>
        <Image 
        style={style.imgStyle}
        source={require('../assets/background/giphy.gif')}
        />
      </View>
      
      <View style={{width:"100%", 
      
      justifyContent:"center", 
      alignItems:"center",
      marginBottom:10,
      }}>

        {userStorage == "" ?
        <TextInput style={{borderWidth: 1,
    
        borderColor: exist? "red": "gray",
        padding: 5,
        marginVertical: 5,
        borderRadius: 5,
        height: 50,
        paddingVertical: 5,
        fontSize:20,
        width:200,
        textShadowColor: 'green',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust the opacity (0.5 in this case)
        textShadowOffset: { width: 2, height: 2 }, 
        textShadowRadius: 5, 
        fontFamily:"RobotoBold"}}  
        onChangeText={text => setUsername(text)}
        placeholder="Username" />:
        <Text style={{fontSize:30,
          fontFamily:"RobotoBold",
          textShadowColor: "white",
          shadowOpacity: 0.5,
          textShadowOffset: { width: 2, height: 2 }, 
          textShadowRadius: 5,
        }}>Hello {userStorage}!</Text>
        }
      </View>

      <View style={style.quizBG}>
        
        
      
        {topicData.map((i) => (
          <LinearGradient 
          key={i.id}
          colors={id == i.id? ["#001C30", "#001C30"]:[colorRandomizer(), colorRandomizer()]}
          style={{
            width:100,
            borderRadius: 50,
            borderWidth: id == i.id ? 2 : 0,
            borderColor: id == i.id ? "#16FF00" : "",
          }}
          start={{y: 0.0, x: 0.0}}
          end={{y: 1.0, x: 0.0}}>
         
          <TouchableOpacity key={i.id} 
          onPress={() => handleTopic(i.id)}
          style={style.topicBtn} 
          >
            <Text style={style.topicText}>{i.name}</Text>
          </TouchableOpacity>
        </LinearGradient>

          
        ))}
       
      </View>

      <View style={style.btnContainer}>
      <TouchableOpacity style={[style.btnStyle,{backgroundColor:"#379237"}]}onPress={() => handleStart()}>
          <Text style={[style.btnTextStyle,{color:"white"}]}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[style.btnStyle, {backgroundColor:"#0C356A"}]} onPress={() => handleStats()}>
          <Text style={[style.btnTextStyle, {color:"white"}]}>Stats</Text>
      </TouchableOpacity>
      </View> 
      
    </View>
    </>
    
  )
}

const style = StyleSheet.create({
  quizBG: {
    flexDirection:"row",
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    width:"100%",
    paddingBottom:20,
    alignItems:"center",
    gap:10
  },
  background: {
    height:400,
    width:"100%",
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
   },
  animatedBG :{
    height:500,
    width:"100%",
    position: 'absolute',
    backgroundColor:"white",
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topicBtn : {
    // backgroundColor:"blue",
    
    borderBottomColor:"gray",
    height:45,
    justifyContent:"center",
    alignItems:"center",
    width:100,
    borderRadius:10
  },
  topicText: {
    fontFamily:"RobotoBold",
    fontSize:15,
    color:"white",
    textShadowColor:"black"
  },
  container : {
    flex: 1,
    width:"100%",
    backgroundColor:"white",
  },
  imgStyle: {
    height:250,
    width:"100%",
    resizeMode:"contain"
  },
  btnStyle:{
    padding:5,
    height:50,
    width:110,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
  },
  btnTextStyle: {
    fontFamily:"RobotoBold",
    fontSize:25,
    color:"green"
  },
  btnContainer : {
    top:30,
    display:"flex",
    width:"100%",
    gap:10,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  }

})

export default HomeScreen