import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNShake from 'react-native-shake';
import { Styles } from '../stylesheet';

const styles = StyleSheet.create(Styles)

export default function Shake() {
    const [steps, setSteps] = useState(0)
    useEffect(() => {
        // Subscribe to event listener when device is shaken
        const subscription = RNShake.addListener(() => {
            countStep()
        })

        return () => {
            subscription.remove()
        }
    }, [steps])

    // Adds step count to state when device is shaken
    // IMPROVEMENT: Can make data structure better to store start and end date for each step for easy data analytics
    const countStep = () => {
+        setSteps(steps + 1)
    }

    return (
        <View>
            <View style={{...styles.padding30, marginTop:20, alignSelf:'center', justifyContent:'center', backgroundColor:'#000', borderRadius:100}}>
                <Text style={{color:'#fff', ...styles.fontMedium, ...styles.fontBold}}>Steps</Text>
                <Text style={{color:'#fff', textAlign:'center', ...styles.fontLarge, ...styles.fontBold}}>{steps}</Text>
            </View>
            <TouchableOpacity style={{marginTop:30}} onPress={() => setSteps(steps + 1)} >
                <Text style={{textAlign:'center', color:'#fff'}}>Add Step</Text>
            </TouchableOpacity>
        </View>
    )
}