import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StatusBar, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StackParamProps } from '../constant/stack_navigation';
import LottieView from 'lottie-react-native';
import { BackHandler } from 'react-native';
import { getStats, updateStats } from '../database/sqlite/quiz_repo';
import { useIsFocused } from "@react-navigation/native";
import topic_btn_data from '../constant/topic_btn_data';
import { Ionicons } from '@expo/vector-icons';
import { animatedBG } from '../constant';

const ResultScreen = ({navigation, route}:StackScreenProps<StackParamProps, "ResultScreen"> ) => {

  const isFocused = useIsFocused()
  const animationRef = useRef<LottieView>(null);

  const { answer, points, topicID } = route.params
  const [newHighScore, setNewHighScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("HomeScreen");
      return true; 
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => backHandler.remove();
  }, []);

  useEffect(() => {

    getStats(topicID).then((res) => {
      setHighScore(res?.[0].points)

      if(points > res?.[0].points){
        setNewHighScore(points)
        updateStats(topicID, points).then((res) => {
          console.log("high: ", res)
        })
      } else {
        setNewHighScore(0)
      }

      console.log("score: ", res)
    })
  },[isFocused])

  const startAnimation = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };


  useEffect(() => {
    startAnimation();
  }, []);
  
 
  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <LottieView
         ref={animationRef}
         source={animatedBG[topicID-1]} 
         style={{
          height:500,
          width:"100%",
          position: 'absolute',
          top: 120,
          left: 0,
          right: 0,
          bottom: 0,
         }}
         loop={true}
         autoPlay
       />
        <View style={{
          width:"100%",
          height:50,
          justifyContent:"center",
          alignItems:"center"
        }}>
          {newHighScore != 0 ? <Text style={{
            fontFamily:"RobotoBold",
            fontSize:20
          }}>
              New Highscore: {newHighScore}
          </Text> : <Text style={{
            fontFamily:"RobotoBold",
            fontSize:20
          }}>
               Highscore: {highScore}
          </Text>}
        </View>
      
      <View style={{paddingTop:50}}>
        
      <LottieView
        ref={animationRef}
        source={require('../assets/congratulation.json')} 
        style={{
          height:200,
          width:"100%",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,}}
        loop={true}
        autoPlay
      />
       <LottieView
        ref={animationRef}
        source={require('../assets/cup.json')}
        style={{
          height:200,
          width:"100%",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,}}
          loop={false}
          autoPlay
      />
      </View>
      <View style={{
       
        width:"100%", 
        height:80,
        justifyContent:"center",
        alignItems:"center",
        marginTop:125,
        }}>
          <Text style={{
            fontFamily:"RobotoBold",
            fontSize:30
          }}>{points}</Text>
{/* 
<Text style={{
            fontFamily:"RobotoBold",
            fontSize:30,
            color:"white",
            te
          }}>{topic_btn_data[topicID-1].name}</Text> */}

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
           fontSize: 35,
           fontFamily:"RobotoBold",
           textShadowOffset: { width: -1, height: 1 },
           textShadowRadius: 10,
           color:"black",
           textShadowColor:"green"
        }}>
          {topic_btn_data[topicID-1].name}
        </Text>
    </View>
      </View>
      
      <View style={{
        // backgroundColor:"green",
        width:"100%",
        marginTop:200,
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
      }}>
        <Pressable style={{
           width:"25%",
           backgroundColor:"#1565C0",
           justifyContent:"center",
           alignItems:"center",
           padding:10,
           borderRadius:10,
           flexDirection:"row"
        }} onPress={() => navigation.navigate('HomeScreen')}>
         
          <Ionicons name="arrow-back-outline" size={24} color="white" />
          <Text style={{
             fontFamily:"RobotoBold",
             fontSize:17,
             color:"white"
          }}>Back</Text>
        </Pressable>

      <Pressable onPress={() => navigation.navigate('StatsScreen')} style={{
        width:"25%",
        backgroundColor:"#1565C0",
        justifyContent:"center",
        alignItems:"baseline",
        padding:10,
        borderRadius:10,
        flexDirection:"row"
      }}>
        <Text style={{
           fontFamily:"RobotoBold",
           fontSize:17,
           color:"white"
        }}>Stats </Text>
        <Ionicons name="stats-chart" size={24} color="white" />
      </Pressable>
      </View>
      
     
      </SafeAreaView>
      </SafeAreaProvider>
    
  )
}

export default ResultScreen