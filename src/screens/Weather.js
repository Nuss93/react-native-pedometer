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
  
  // Toggle between loader and display content once API has been fetched
  const renderContent = () => {
    let display
    if(loading === 'pending' || data.length === 0) {
      display = <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
        <View style={{flex:1, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
          <Text>loading</Text>
        </View>
      </SafeAreaView>
    }
    if(loading === 'idle' && data.length  !== 0) {
      display = <ScrollView style={{flex:1, backgroundColor:'#fff', ...styles.padding50}}>
        <View style={{...styles.weatherCard_header}}>
          <Text>{city}</Text>
          <Text>{data.current_weather.temperature}</Text>
          <Text>{codes[data.current_weather.weathercode]}</Text>
        </View>

        {/* Today's hourly forecast */}
        <Text style={{marginBottom:5, marginTop:20}}>Today's forecast</Text>
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
        </ScrollView>

        {/* Next week's forecast */}
        <Text style={{marginBottom:5, marginTop:20}}>The next week</Text>
        {data.daily.time.map((element,index) =>{
            let currentTime = new Date(element).toLocaleDateString('en-MY', {month:'2-digit', day:'2-digit'})
            let currentDay = new Date(element).toLocaleDateString('en-MY', {weekday:'short'})
            let currentCode = weathercodes[data.daily.weathercode[index]]
            let currentTemperature = data.daily.temperature_2m_max[index]

            return (
              <View key={index} style={{...styles.weatherCard_daily}}>
                <View style={{flex:1}}>
                  <Text>{currentDay}</Text>
                  <Text>{currentTime}</Text>
                </View>
                <View style={{flex:2.5}}>
                  
                  <Text style={{color:'#000'}}>{currentTemperature}</Text>
                  <Text style={{color:'#000'}}>{currentCode}</Text>
                </View>
              </View>
            )
          })}
      </ScrollView>
    }

    return display;
  }
  

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
        {renderContent()}
        <BottomTabNav />
    </SafeAreaView>
  )
}