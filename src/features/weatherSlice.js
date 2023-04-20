import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getWeather = createAsyncThunk('weather/getWeather', async (coords) => {
    // console.log(coords);
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true`).then(res => {return res.json()})
})
export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: [],
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
        }
    }
})

// export const { add, remove } = weatherSlice.actions
// export const getWeatherData = (state) => state.weather.data
export default weatherSlice.reducer;