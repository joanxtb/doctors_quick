import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash';
import { Doctor } from "../../model/entities";

interface DoctorsState {
    value: Array<Doctor>; // TODO: maybe here I need to create a "type" that maps the properties of a Property
}

const initialState: DoctorsState = {
    value: []
}

// MOCK VALUES
const specialties = ["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Caracas"];
const firstNamesMen = ["John", "Michael", "Chris", "David", "Daniel"];
const firstNamesWomen = ["Jane", "Emily", "Sarah", "Laura", "Sophia"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const availability = [true, true, true, true, false, true, true, true, true,];
const ratings = [0,1,2,3,4,5];
const mock_data = Array.from({ length: 30 }, (x, index) => {
    const isEven = index % 2 === 0;
    const gender = isEven ? "boy" : "girl";
    const photoId = 10 + (index % 21); // Generates numbers between 10 and 30

    return {
        id: index,
        name: isEven ? firstNamesWomen[index % firstNamesWomen.length] : firstNamesMen[index % firstNamesMen.length],
        lastname: lastNames[index % lastNames.length],
        specialty: specialties[index % specialties.length],
        location: cities[index % cities.length],
        available: _.sample(availability) ?? false,
        rating: _.sample(ratings),
        photo: `https://avatar.iran.liara.run/public/${gender}`
        //https://avatar.iran.liara.run/public/boy
        //photo: `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`
    };
});
//

const doctorsSlice = createSlice({
    name: 'DOCTORS',
    initialState,
    reducers: {
        // Non async functions basically, like direct mutations to the state        
        SET_LOCAL: (state) => {            
            state.value = [...state.value]; // <- force refresh?
        }
    },
    extraReducers: (builder) => {
        // asycn functions like calls to APIs
        builder.addCase(FETCH_DOCTORS_ASYNC.pending, () => {
            console.log('fetching doctos...');
        }).addCase(FETCH_DOCTORS_ASYNC.fulfilled, (state, action: PayloadAction<Array<Doctor>>) => {
            state.value = action.payload;
        });
    }
});

export const FETCH_DOCTORS_ASYNC = createAsyncThunk(
    // Kind of a saga?
    'DOCTORS/FETCH', async (/* arguments here for the API call */): Promise<Array<Doctor>> => {
        return mock_data
    });

// IMPORTANT: expose all the non-async reducers here
export const { SET_LOCAL } = doctorsSlice.actions;
export default doctorsSlice.reducer;
