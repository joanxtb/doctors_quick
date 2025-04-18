import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './doctors/doctorsSlice';
import bookingsReducer from './bookings/bookingsSlice';

const store = configureStore({
    reducer: {
        Doctors: doctorsReducer,
        Bookings: bookingsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
