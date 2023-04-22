import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTabNav from '../components/BottomTabNav'
import { Styles, root } from '../stylesheet';
import StepTracker from '../components/StepTracker';
import Shake from '../components/Shake';
import { useDispatch, useSelector } from 'react-redux';
import { checkLocation, getCity } from '../features/userSlice';
import { getCurrentWeather, getWeather } from '../features/weatherSlice';
import ModalPopUp from '../components/ModalPopUp';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const styles = StyleSheet.create(Styles)
export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const {location, city} = useSelector((state) => state.user)
  const {data,loading} = useSelector((state) => state.weather)
  const parentSetModalVisible = () => {
    setModalVisible(!modalVisible)
  }
  
  const renderContent = () => {
    let display
    if(loading === 'idle' && data.length === 0) {
      display = <View style={{flex:1, backgroundColor: '#fff', alignItems: 'center', justifyContent:'center'}}>
        <Text>Loading</Text>
      </View>
    } else {
      display = <View style={{flex:1, backgroundColor:'#fff'}}>
        <View style={{...styles.padding50, paddingBottom: 20 }}>
          <Text style={{...styles.fontLarge, ...styles.fontBold}}>Hello user!</Text>
          <Text>How's your step goals today? Wanna go for a walk?</Text>
        </View>

        <View style={{...styles.padding30, paddingTop: 0, flexDirection:'row'}}>
          <Pressable onPress={() => {setModalVisible(!modalVisible)}} style={{flex:1, ...styles.homeCard}}>
            <Text>Set your goals</Text>
          </Pressable>
          <View style={{flex:1, ...styles.homeCard}}>
            <Text>Today's weather</Text>
          </View>
        </View>

        <ModalPopUp modalVisible={modalVisible} childSetModalVisible={parentSetModalVisible} />

        <View style={{backgroundColor: root.primary, borderTopColor: root.primary, borderTopWidth:20, borderTopLeftRadius:25, borderTopRightRadius:25, alignContent:'stretch', bottom:0, position:'absolute', width:'100%', paddingBottom:30}}>
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