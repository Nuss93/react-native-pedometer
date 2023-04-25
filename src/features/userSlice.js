import { createSlice } from "@reduxjs/toolkit";

// Slice to store user's location and city
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        location: null,
        city: '',
    },
    reducers: {
        updateLocation: (state, param) => {
            const { payload } = param;
            state.location = { lat: payload.lat, lng: payload.lng}
            state.city = payload.city
        },
    }
})

export const { updateLocation } = userSlice.actions
export default userSlice.reducer