import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import BottomTabNav from '../components/BottomTabNav'
import { Styles } from '../stylesheet';
import StepTracker from '../components/StepTracker';
import Shake from '../components/Shake';
import { useDispatch, useSelector } from 'react-redux';
import { checkLocation, getCity } from '../features/userSlice';
import { getCurrentWeather } from '../features/weatherSlice';


const styles = StyleSheet.create(Styles)
export default function Home() {
  const {location, city} = useSelector((state) => state.user)
  const {current,loading} = useSelector((state) => state.weather)
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getCurrentWeather(location))
  }, [])
  
  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#000'}}>
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <View style={{...styles.padding50}}>
            <Text>Hello user</Text>
            {location ? <Text>{location.lat}, {location.lng}</Text> : null}
            {location ? <Text>{city}</Text> : null}
          </View>

          <View style={{...styles.padding30, flexDirection:'row'}}>
            <View style={{flex:1, ...styles.homeCard}}>
              <Text>Set your goals</Text>
            </View>
            <View style={{flex:1, ...styles.homeCard}}>
              <Text>Today's weather</Text>
            </View>
          </View>

          <View style={{backgroundColor:'#3e424b',borderTopColor:'#3e424b', borderTopWidth:20, borderTopLeftRadius:25, borderTopRightRadius:25, alignContent:'stretch', bottom:0, position:'absolute', width:'100%', paddingBottom:30}}>
            <Shake />
          </View>
        </View>

        <BottomTabNav />
    </SafeAreaView>
  )
}