import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import LeaderBoards from '../database/firebase/leaderboards_repo'
import { CheckNetworkConnectivity } from '../services/netInfo'
import { HighScoreProps } from '../constant/highscore'


const GlobalStats = () => {
    const [isOnline, setIsOnline] = useState(false)
    const [data, setData] = useState<HighScoreProps[] | undefined>([])
    useEffect(() => {

        CheckNetworkConnectivity().then((res) => {
         setIsOnline(res)
        })
     
        if(isOnline){
         LeaderBoards.getHighScore().then((res) => {
            setData(res)
         })

         
        }
        
       },[isOnline])
     
       
  return (
    <View style={style.main}>

        <View style ={{
            paddingTop:5,
            paddingBottom:5,
            width:"100%",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            backgroundColor:"green"
        }}>
            <Text style={{marginRight:20, fontFamily:"RobotoBold", fontSize:17,color:"white"}}>Username</Text>
            <Text style={{marginLeft:20, fontFamily:"RobotoBold", fontSize:17, color:"white"}}>Category</Text>
            <Text style={{marginRight:20, fontFamily:"RobotoBold", fontSize:17,color:"white"}}>Top Score</Text>
        </View>
        
        
                {data?.map((list) => {
                    return (
                        <View key={list.id} style={{
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between",
                            padding:10
                        }}>
                            <Text style={{marginLeft:20, fontFamily:"RobotoRegular", fontSize:17}}>{list.username}</Text>
                            <Text style={{marginLeft:20, fontFamily:"RobotoRegular", fontSize:17}}>{list.topic}</Text>
                            <Text style={{marginRight:20, fontFamily:"RobotoRegular", fontSize:17}}>{list.score}</Text>
                        </View>
                    )
                })}
               
    </View>
  )
}

const style = StyleSheet.create({
    main: {
        
        width:"100%",
        height:"100%"
    }
})

export default GlobalStats