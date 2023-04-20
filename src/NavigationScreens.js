import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import History from './screens/History'
import WIP from './screens/WIP';
import { useDispatch, useSelector } from 'react-redux';
import { checkLocation, getCity, updateLocation } from './features/userSlice';
import Weather from './screens/Weather';

const Stack = createNativeStackNavigator();

export default function NavigationScreens() {
    const dispatch = useDispatch()
    // const location = useSelector(checkLocation), city = useSelector(getCity)
	const {location, city} = useSelector((state) => state.user)

    console.log(location);
	useEffect(() => {
		console.log(location, city);
		if(!location) {
			let url = 'https://ipapi.co/json'
			fetch(url)
			.then(result => result.json())
			.then(result => {
				console.log(result);
				let coords = {
					lat: result.latitude,
					lng: result.longitude,
					city: result.city
				}
				dispatch(updateLocation(coords))
			})
		}
		
	}, [location])
	

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Three stacks meant for the bottom navigator, doesnt need animations */}
                <Stack.Screen name='Home' component={Home} options={{animation: 'none'}} />
                <Stack.Screen name='History' component={History} options={{animation: 'none'}} />
                <Stack.Screen name='Weather' component={Weather} options={{animation: 'none'}} />

                {/* Other stacks go here */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}