import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const routes = [
    {
        name: 'History',
        icon: 'cog',
        navigate: 'History'
    },
    {
        name: 'Home',
        icon: 'home',
        navigate: 'Home'
    },
    {
        name: 'Weather',
        icon: 'weather-cloudy',
        navigate: 'Weather'
    }
]

// Component that renders the bottom tab navigator
export default function BottomTabNav() {
    const route = useRoute()
    const navigation = useNavigation()

    return (
        <View style={{backgroundColor:'#000', padding:20, paddingBottom:0, width:'100%', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
            {routes.map((data,index) => (
                <TouchableOpacity key={index} style={{ alignItems:'center', justifyContent:'center' }} onPress={() => {
                    navigation.replace(data.navigate)
                }}>
                    <MaterialIcons name={data.icon} color={route.name === data.name ? '#C69749' : '#fff'} size={25} />
                    <Text style={{color: route.name === data.name ? '#C69749' : '#fff'}}>{data.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}