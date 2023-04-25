import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTabNav from '../components/BottomTabNav'
import { Styles, root } from '../stylesheet';
import StepTracker from '../components/StepTracker';
import Shake from '../components/Shake';
import { useSelector } from 'react-redux';
import ModalPopUp from '../components/ModalPopUp';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import weathercodes from '../static/weathercode';

const styles = StyleSheet.create(Styles)
export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const codes = weathercodes
  const clearSkies = [0,1,2,3,45,48]
  const {data,loading} = useSelector((state) => state.weather)
  
  const parentSetModalVisible = () => {
    setModalVisible(!modalVisible)
  }
  
  // Conditional rendering logic for loader if data has not been completely fetched
  const renderContent = () => {
    let display
    if(data.length === 0) {
      display = <View style={{flex:1, backgroundColor: '#fff', alignItems: 'center', justifyContent:'center'}}>
        <Text>Loading</Text>
      </View>
    }
    if(loading === 'idle' && data.length !== 0) {
      display = <View style={{flex:1, backgroundColor:'#fff'}}>
        <View style={{...styles.padding50, paddingBottom: 20, paddingTop: 30 }}>
          <Text style={{...styles.fontLarge, ...styles.fontBold}}>Hello user!</Text>
          <Text>How's your step goals today? Wanna go for a walk?</Text>
        </View>

        <View style={{...styles.padding30, paddingTop: 0, flexDirection:'row'}}>
          <Pressable onPress={() => {setModalVisible(!modalVisible)}} style={{flex:1, ...styles.homeCard}}>
            <Text style={{...styles.fontMedium, ...styles.fontBold, marginBottom:8}}>Step goals</Text>
          </Pressable>
          <View style={{flex:1, ...styles.homeCard}}>
            <Text style={{...styles.fontMedium, ...styles.fontBold, marginBottom:8}}>Weather</Text>
            <Text style={{...styles.fontLarge, ...styles.fontBold}}>{data.current_weather.temperature}</Text>
            <Text style={{...styles.fontMedium, ...styles.fontLight, marginBottom:15}}>{codes[data.current_weather.weathercode]}</Text>

            {/* Text to display if the skies are clear or not. Will read from a preset array of weathercodes that indicate if the weather is good or not. */}
            <Text style={{textAlign:'center'}}>{clearSkies.includes(data.current_weather.weathercode) ? 'The weather is great for a walk!\nGet your steps in!' : 'Oh no! It is best to stay home today. Perhaps try walking in place?'}</Text>
          </View>
        </View>

        <ModalPopUp modalVisible={modalVisible} childSetModalVisible={parentSetModalVisible} />

        <View style={{...styles.homeBottomDrawer}}>
          <Shake />
        </View>
      </View>
    }
    return display;
  }
  
  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#000'}}>
        {renderContent()}
        <BottomTabNav />
    </SafeAreaView>
  )
}