import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StackParamProps } from '../constant/stack_navigation'
import HomeScreen from '../screens/HomeScreen'
import QuizScreen from '../screens/QuizScreen'
import ResultScreen from '../screens/ResultScreen'
import StatsScreen from '../screens/StatsScreen'

const Stack = createStackNavigator<StackParamProps>()

const ScreenStackNavigation = () => {

  return (

    <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown:false}}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='QuizScreen' component={QuizScreen} initialParams={{topicID:0}}/>
            <Stack.Screen name='ResultScreen' component={ResultScreen} initialParams={{
              answer:[],
              points:0
            }}/>
            <Stack.Screen name='StatsScreen' component={StatsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ScreenStackNavigation