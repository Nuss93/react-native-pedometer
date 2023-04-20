import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import BottomTabNav from '../components/BottomTabNav'

export default function App() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}><Text>Weather</Text></View>
        <BottomTabNav />
    </SafeAreaView>
  )
}