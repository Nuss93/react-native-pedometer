import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weatherSlice'
import userReducer from '../features/userSlice'
import stepSlice from '../features/stepSlice'

export default configureStore({
  reducer: {
    weather: weatherReducer,
    user: userReducer,
    steps: stepSlice,
  },
})