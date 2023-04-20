import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNShake from 'react-native-shake';
import { Styles } from '../stylesheet';

const styles = StyleSheet.create(Styles)

export default function Shake() {
    const [steps, setSteps] = useState(0)
    useEffect(() => {
        const subscription = RNShake.addListener(() => {
            countStep()
        })

        return () => {
            console.log('unsubscib');
            subscription.remove()
        }
    }, [steps])

    const countStep = () => {
        console.log('device is shaken');
        console.log(steps);
        let count = steps + 1
        console.log(count);
        setSteps(steps + 1)
    }

    return (
        <View>
            <View style={{...styles.padding50, marginTop:20, alignSelf:'center', justifyContent:'center', backgroundColor:'#000', borderRadius:100}}>
                <Text style={{color:'#fff'}}>Steps</Text>
                <Text style={{color:'#fff', textAlign:'center'}}>{steps}</Text>
            </View>
            <Button title='Add step' onPress={() => setSteps(steps + 1)} />
        </View>
    )
}