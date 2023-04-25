import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getWeather = createAsyncThunk('weather/getWeather', async (coords) => {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true&timezone=auto&daily=rain_sum,temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode`).then(res => {
        return res.json()
    })
})
export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: [],
        current: [],
        loading: 'idle',
    },
    reducers: {},
    extraReducers: {
        [getWeather.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [getWeather.fulfilled]: (state, action) => {
            state.loading = 'idle';
            state.data = action.payload
        },
        [getWeather.rejected]: (state, action) => {
            state.loading = 'idle'
        },
    }
})

export default weatherSlice.reducer;