import { createSlice } from "@reduxjs/toolkit";

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
// export const checkLocation = (state) => state.user.location
// export const getCity = (state) => state.user.city
export default userSlice.reducer