import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllStats } from '../database/sqlite/quiz_repo'
import { Stats } from '../constant/stats'
import topic_btn_data from '../constant/topic_btn_data'

const YourStats = () => {

    const [stats, getStats] = useState<Stats[]>([])

    useEffect(() => {

        getAllStats().then((res) => {
            getStats(res)
        })

    },[])

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
            <Text style={{marginLeft:20, fontFamily:"RobotoBold", fontSize:17, color:"white"}}>Category</Text>
            <Text style={{marginRight:20, fontFamily:"RobotoBold", fontSize:17,color:"white"}}>Top Score</Text>
        </View>
      {stats.map((i, index) => {

        return (
            <View key={i.id} style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                padding:10
            }}>
                 <Text style={{marginLeft:20, fontFamily:"RobotoRegular", fontSize:17}}>{topic_btn_data?.[index].name}</Text>
                 <Text style={{marginRight:50,fontFamily:"RobotoRegular", fontSize:17}}>{i.points}</Text>
            </View>
        )
      })

      }
      <TouchableOpacity style={{
         padding:2,
         height:30,
         width:55,
         borderRadius:5,
         borderWidth:1,
         marginTop:5,
         marginRight:20,
         borderColor:"red",
         justifyContent:"center",
         alignItems:"center",
         backgroundColor:"white",
         alignSelf:"flex-end"
      }}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    main: {
        
        width:"100%",
        height:"100%"
    }
})

export default YourStats