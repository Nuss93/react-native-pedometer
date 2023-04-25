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
      display = <ScrollView style={{flex:1, backgroundColor:'#fff', ...styles.padding30}}>
        <View style={{...styles.weatherCard_header, justifyContent:'space-between', flexDirection:'row'}}>
          <View>
            <Text style={{...styles.fontLarge, ...styles.fontBold, color:'#fff'}}>{city}</Text>
            <Text style={{...styles.fontMedium,color:'#fff'}}>{codes[data.current_weather.weathercode]}</Text>
          </View>
          <View>
            <Text style={{...styles.fontLarge,color:'#fff'}}>{data.current_weather.temperature}˚</Text>
          </View>
        </View>

        {/* Today's hourly forecast */}
        <Text style={{...styles.fontMedium, ...styles.fontBold, marginBottom:5, marginTop:20}}>Today's forecast</Text>
        <ScrollView horizontal={true} style={{flex:1,}} showsVerticalScrollIndicator={true}>
          {data.hourly.time.slice(0,23).map((element,index) => {
            let currentTime = new Date(element).toLocaleTimeString('en-MY',{timeStyle:'short'})
            let currentCode = weathercodes[data.hourly.weathercode[index]]
            let currentTemperature = data.hourly.temperature_2m[index]
            return (
              <View key={index} style={{...styles.weatherCard_hourly}}>
                <Text style={{...styles.fontBold,color:'#000'}}>{currentTime}</Text>
                <Text style={{...styles.fontBold, ...styles.fontLarge,color:'#000'}}>{currentTemperature}˚</Text>
                <Text style={{...styles.fontBold, color:'#000'}}>{currentCode}</Text>
              </View>
            )
          })}
        </ScrollView>

        {/* Next week's forecast */}
        <Text style={{...styles.fontMedium, ...styles.fontBold, marginBottom:5, marginTop:20}}>The next week</Text>
        {data.daily.time.map((element,index) =>{
            let currentTime = new Date(element).toLocaleDateString('en-MY', {month:'2-digit', day:'2-digit'})
            let currentDay = new Date(element).toLocaleDateString('en-MY', {weekday:'short'})
            let currentCode = weathercodes[data.daily.weathercode[index]]
            let currentTemperature = data.daily.temperature_2m_max[index]

            return (
              <View key={index} style={{...styles.weatherCard_daily}}>
                <View style={{flex:1}}>
                  <Text style={{...styles.fontMedium}}>{currentDay}</Text>
                  <Text style={{...styles.fontSmall, ...styles.fontBold}}>{currentTime}</Text>
                </View>
                <View style={{flex:2.5}}>
                  
                  <Text style={{...styles.fontLarge, ...styles.fontBold, textAlign:'right',color:'#000'}}>{currentTemperature}˚</Text>
                  <Text style={{...styles.fontMedium, textAlign:'right', color:'#000'}}>{currentCode}</Text>
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