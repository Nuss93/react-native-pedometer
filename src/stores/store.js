import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weatherSlice'
import userReducer from '../features/userSlice'

export default configureStore({
  reducer: {
    weather: weatherReducer,
    user: userReducer,
  },
})