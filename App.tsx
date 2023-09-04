
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { defaultStats } from './constant/stats';
import { createQuizTable, getAllStats, addStats } from './database/sqlite/quiz_repo';
import ScreenStackNavigation from './navigations/ScreenStackNavigation';

export default function App() {

  const [fontsLoaded] = useFonts({
    'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
    'PointRegular': require('./assets/fonts/ToThePointRegular-n9y4.ttf'),
    'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf')
  });

  useEffect(() => {

    createQuizTable().then((res) => {
      console.log("table: ", res)
    })
  
    getAllStats().then((res) => {
      if(res.length == 0){
        addStats(defaultStats).then((res) =>{
          console.log("add: ", res)
        })
      } 
    })
    
    
    },[])
    
  if (!fontsLoaded) {
    return null;
  }
  

  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <ScreenStackNavigation/>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
