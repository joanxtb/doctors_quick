import React, { useEffect, useState } from 'react';
import Logo from '../components/globals/logo';
import { Toast, ToastBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { ADD_BOOKING, FETCH_BOOKINGS_ASYNC } from '../redux/bookings/bookingsSlice';
import { Doctor } from '../model/entities';
import moment from 'moment';
import BookingListItem from '../components/properties/booking_list_item';
import _ from 'lodash';

const Bookings = () => {

    const [state, setState] = useState({
        spinner: false,
        search: '',
        pick_specialty: false,
        selected_specialty: null,
        only_available: false,
        doctor: null as null | Doctor,
        selecting_date: false,
        selected_date: null as null | string,
        selected_time: null as null | string,
        toast: false
    });

    // MOUNT
    useEffect(() => {
        // This is redux code        
        dispatchAsync(FETCH_BOOKINGS_ASYNC());
    }, []);    

    // REDUX
    const Bookings = useSelector((state: RootState) => state.Bookings.value); // <- Array?
    //                                                      ^ Reducer
    const dispatchAsync = useDispatch<AppDispatch>();
    //    

    // INTERACTIONS
    const handleChange = e => setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const onBook = () => {
        // persist the new booking
        ADD_BOOKING({
            id: moment().format(),
            date: state.selected_date,
            time: state.selected_time,
            doctor: state.doctor
        });

        // refresh ui properly
        setState(prevState => ({ ...prevState, doctor: null, selected_date: null, selected_time: null, toast: true }));
        setTimeout(() => { setState(prevState => ({ ...prevState, toast: false, })); }, 1500); // toast!
    }

    // RENDER
    return (<>
        <title>My appointments</title>

        <div className="d-flex flex-column px-4" style={{ zIndex: 1 }}>

            {/* LOGO */}
            <Logo className="font-80 align-self-center mt-4 white fas fa-stethoscope" />
            <h2 className="white mt-4 align-self-center anton">My appointments</h2>

            {/* TOAST */}
            {state.toast && <Toast style={{ position: 'fixed', top: 30, zIndex: 10 }}>
                <ToastBody className="bg-success white">
                    <i className="fas fa-check me-2" />You've booked doctor successfully!
                </ToastBody>
            </Toast>}

            {/* Global search and Filters */}
            <div className={`w-100 mt-4 align-self-center`} >
                <div className={`black-input d-flex`}>
                    <i className="fas fa-search font-16 white align-self-center ps-3" />
                    <input className="w-100 p-3 white poppins" value={state.search} type="text" name="search" placeholder="Search" onChange={handleChange} />
                </div>
            </div>

            <section className="container mt-4">
                <div className="row">
                    {Bookings && Bookings.filter(c => `${c.doctor.name}-${c.doctor.lastname}-${c.doctor.specialty}`.toLowerCase().includes(state.search.toLowerCase())).map((booking, i) => (
                        <BookingListItem booking={booking} key={i} />
                    ))}
                </div>
            </section>
        </div>
    </>

    )
}

export default Bookings;
