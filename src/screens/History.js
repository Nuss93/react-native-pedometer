import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import BottomTabNav from '../components/BottomTabNav'

export default function History() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}><Text>History page is under construction</Text></View>
        <BottomTabNav />
    </SafeAreaView>
  )
}