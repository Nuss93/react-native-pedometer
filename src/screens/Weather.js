import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import BottomTabNav from '../components/BottomTabNav'
import { useDispatch, useSelector } from 'react-redux';
import { checkLocation, getCity } from '../features/userSlice';
import { Styles } from '../stylesheet';
import { getWeather } from '../features/weatherSlice';

const styles = StyleSheet.create(Styles);
export default function Weather() {
  const {location, city} = useSelector((state) => state.user)
  const {data, loading} = useSelector((state) => state.weather)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWeather(location))
  }, [])
  
  console.log('soi', data, loading);
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
        <View style={{flex:1, alignItems:'center', backgroundColor:'#fff', ...styles.padding50}}>
          <Text>{city}</Text>
          <Text>{loading === 'idle' && data.length  !== 0 ? data.current_weather.temperature : 'loading'}</Text>
          {/* <Text>{data.current_weather.temperature}</Text> */}
        </View>

        <BottomTabNav />
    </SafeAreaView>
  )
}