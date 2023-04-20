import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import BottomTabNav from '../components/BottomTabNav'
import { useDispatch, useSelector } from 'react-redux';
import { checkLocation, getCity } from '../features/userSlice';
import { Styles } from '../stylesheet';
import { getWeather } from '../features/weatherSlice';
import weathercodes from '../static/weathercode';

const styles = StyleSheet.create(Styles);
export default function Weather() {
  const {location, city} = useSelector((state) => state.user)
  const {data, loading} = useSelector((state) => state.weather)
  const codes = weathercodes

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('location', location);
    dispatch(getWeather(location))
  }, [])
  
  // console.log('woi', data, loading);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
        <ScrollView style={{flex:1, backgroundColor:'#fff', ...styles.padding50}}>
          <Text>{city}</Text>
          <Text>{loading === 'idle' && data.length  !== 0 ? data.current_weather.temperature : 'loading'}</Text>
          {loading === 'idle' && data.length  !== 0 ? <Text>{codes[data.current_weather.weathercode]}</Text> : null}

          {/* Hourly forecast */}
          <Text style={{marginBottom:5, marginTop:20}}>Today's forecast</Text>
          {loading === 'idle' && data.length !== 0 ?
            <ScrollView horizontal={true} style={{flex:1,}} showsVerticalScrollIndicator={true}>
              {data.hourly.time.slice(0,23).map((element,index) => {
                let currentTime = new Date(element).toLocaleTimeString('en-MY',{timeStyle:'short'})
                let currentCode = weathercodes[data.hourly.weathercode[index]]
                let currentTemperature = data.hourly.temperature_2m[index]
                return (
                  <View key={index} style={{...styles.weatherCard_hourly}}>
                    <Text style={{color:'#fff'}}>{currentTime}</Text>
                    <Text style={{color:'#fff'}}>{currentTemperature}</Text>
                    <Text style={{color:'#fff'}}>{currentCode}</Text>
                  </View>
                )
              })}
            </ScrollView> : null
          }

          {/* Daily forecast */}
          <Text style={{marginBottom:5, marginTop:20}}>The next week</Text>
          {loading === 'idle' && data.length  !== 0 ?
            data.daily.time.map((element,index) =>{
              let currentTime = new Date(element).toLocaleDateString('en-MY')
              let currentCode = weathercodes[data.daily.weathercode[index]]
              let currentTemperature = data.daily.temperature_2m_max[index]
              return (
                <View key={index} style={{...styles.weatherCard_daily}}>
                  <Text style={{color:'#000'}}>{currentTime}</Text>
                  <Text style={{color:'#000'}}>{currentTemperature}</Text>
                  <Text style={{color:'#000'}}>{currentCode}</Text>
                </View>
              )
            }) : null
          }
        </ScrollView>

        <BottomTabNav />
    </SafeAreaView>
  )
}
const style = {
  weatherCard: {
    backgroundColor:'#282A3A',
  }
}