import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import BottomTabNav from '../components/BottomTabNav'
import { Styles } from '../stylesheet';
import StepTracker from '../components/StepTracker';
import Shake from '../components/Shake';
import { useSelector } from 'react-redux';
import { checkLocation, getCity } from '../features/userSlice';


const styles = StyleSheet.create(Styles)
export default function Home() {
  const {location, city} = useSelector((state) => state.user)
  
  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#000'}}>
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <View style={{...styles.padding50}}>
            <Text>Hello user</Text>
            {location ? <Text>{location.lat}, {location.lng}</Text> : null}
            {location ? <Text>{city}</Text> : null}
          </View>

          {/* <StepTracker /> */}
          <Shake />
        </View>

        <BottomTabNav />
    </SafeAreaView>
  )
}