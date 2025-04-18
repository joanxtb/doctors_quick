import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash';
import { Booking } from "../../model/entities";

interface BookingsState {
    value: Array<Booking>; // TODO: maybe here I need to create a "type" that maps the properties of a Property
}

const initialState: BookingsState = {
    value: []
}

const bookingsSlice = createSlice({
    name: 'BOOKINGS',
    initialState,
    reducers: {
        // Non async functions basically, like direct mutations to the state        
        ADD_BOOKING: (state, action) => {
            // action.payload has the new Booking
            // IOC real storage solution            
            localStorage.setItem('fyd.bookings', JSON.stringify([...state.value, action.payload]));
            state.value = [...state.value, action.payload];
        }
    },
    extraReducers: (builder) => {
        // asycn functions like calls to APIs
        builder.addCase(FETCH_BOOKINGS_ASYNC.pending, () => {
            console.log('fetching bookings...');
        }).addCase(FETCH_BOOKINGS_ASYNC.fulfilled, (state, action: PayloadAction<Array<any>>) => {            
            state.value = action.payload;
        });
    }
});

export const FETCH_BOOKINGS_ASYNC = createAsyncThunk(
    // Kind of a saga?
    'BOOKINGS/FETCH', async (/* arguments here for the API call */): Promise<Array<Booking>> => {
        return JSON.parse(localStorage.getItem('fyd.bookings') || '[]');
    });

// IMPORTANT: expose all the non-async reducers here
export const { ADD_BOOKING } = bookingsSlice.actions;
export default bookingsSlice.reducer;
