import React, { useEffect, useState } from 'react';
import Logo from '../components/globals/logo';
import {
    Popover, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown,
    DropdownToggle,
    DropdownMenu, Button,
    DropdownItem, Toast, ToastBody
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { FETCH_DOCTORS_ASYNC } from '../redux/doctors/doctorsSlice';
import { ADD_BOOKING } from '../redux/bookings/bookingsSlice';
import { Doctor } from '../model/entities';
import moment from 'moment';
import DoctorListItem from '../components/properties/doctor_list_item';
import _ from 'lodash';

const Home = () => {

    // STATE
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
        dispatchAsync(FETCH_DOCTORS_ASYNC());
    }, []);

    // REDUX
    const Doctors = useSelector((state: RootState) => state.Doctors.value);
    //                                                      ^ Reducer
    const dispatchAsync = useDispatch<AppDispatch>();
    const dispatch = useDispatch();
    const specialties = _.chain(Doctors || []).map(u => u.specialty).uniq().value();
    //    

    // INTERACTIONS
    const handleChange = e => setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const onSelectSpecialty = e => setState(prevState => ({ ...prevState, selected_specialty: e, pick_specialty: false }));
    const onToggleAvailability = () => setState(prevState => ({ ...prevState, only_available: !prevState.only_available }));
    const book_doc = doctor => setState(prevState => ({ ...prevState, doctor }));
    const onBook = () => {
        // persist the new booking
        dispatch(ADD_BOOKING({
            id: moment().format(),
            date: state.selected_date,
            time: state.selected_time,
            doctor: state.doctor
        }));

        // refresh ui properly
        setState(prevState => ({ ...prevState, doctor: null, selected_date: null, selected_time: null, toast: true }));
        setTimeout(() => { setState(prevState => ({ ...prevState, toast: false, })); }, 1500); // toast!
    }

    // RENDER
    return (<>
        <title>Find your doctor</title>

        <div className="d-flex flex-column px-4">

            {/* LOGO */}
            <Logo className="font-80 align-self-center mt-4 white fas fa-stethoscope" />
            <h2 className="white mt-4 align-self-center anton">Find your doc!</h2>

            {/* TOAST */}
            {state.toast && <Toast className="ease" style={{ position: 'fixed', top: 30, right: 30, zIndex: 10, overflow: 'hidden' }} role="alert">
                <ToastBody className="bg-success white">
                    <i className="fas fa-check me-2" />You've booked doctor successfully!
                </ToastBody>
            </Toast>}

            {/* Global search and Filters */}
            <div className={`w-100 mt-4 align-self-center`} >
                <div className={`black-input d-flex`}>
                    <i className="fas fa-search font-16 white align-self-center ps-3" />
                    <input role="searchbox" className="w-100 p-3 white poppins" value={state.search} type="text" name="search" placeholder="Search" onChange={handleChange} aria-label={`search doctors by name or specialty`} />
                    <button aria-label="filter specialties" onClick={() => setState(prevState => ({ ...prevState, pick_specialty: !prevState.pick_specialty }))} id="btn-specialties" style={{ minWidth: 150 }} className="text-right btn-link font-10 white pe-3">{state.selected_specialty || 'All Specialties'} <i className="fas fa-chevron-down font-8" /></button>

                    <Popover placement="bottom" isOpen={state.pick_specialty} target={`btn-specialties`} className="bg-gray-2">
                        <PopoverBody className="d-flex flex-column justify-content-center">
                            <button onClick={() => onSelectSpecialty(null)} className="btn btn-link btn-sm white text-left">All Specialties</button>
                            {specialties.map((s, i) => <button onClick={() => onSelectSpecialty(s)} className="btn btn-link btn-sm white text-left" key={i}>{s}</button>)}
                        </PopoverBody>
                    </Popover>
                </div>
                <div className="d-flex">
                    <button aria-label="show only available doctors" className="btn btn-link white ms-auto" onClick={onToggleAvailability}>Only available doctors<i className={`ms-2 fas fa${state.only_available ? '-check' : ''}-square`} /></button>
                </div>
            </div>

            <section className="container mt-4">
                <div className="row" role="list">
                    {Doctors && Doctors.filter(c => `${c.name}-${c.lastname}-${c.specialty}`.toLowerCase().includes(state.search.toLowerCase())
                        && (state.selected_specialty ? c.specialty === state.selected_specialty : true)
                        && (state.only_available ? c.available === true : true)).map((doctor, i) => (
                            <DoctorListItem doctor={doctor} key={i} onBook={book_doc} />
                        ))}
                </div>
            </section>
        </div>

        {/* Book Modal */}
        <Modal isOpen={state.doctor !== null ? true : false} centered={true}>
            <ModalHeader toggle={() => book_doc(null)} style={{ background: `url(${state.doctor?.photo}) no-repeat left center white`, backgroundSize: '60px', paddingLeft: 70 }}>
                <div className="d-flex flex-column">
                    <span className="line1 font-16 anton">{`${state.doctor?.name} ${state.doctor?.lastname}`}</span>
                    <span className="font-8 line1">{`${state.doctor?.specialty}`}</span>
                </div>
            </ModalHeader>
            <ModalBody className="p-3">

                <h1 className="text-center line1 m-0">Book {state.doctor?.name}</h1>

                <Dropdown className="mx-auto align-self-center w-50 mt-4" isOpen={state.selecting_date} toggle={() => setState(prevState => ({ ...prevState, selecting_date: !prevState.selecting_date }))} direction="down">
                    <DropdownToggle
                        color={state.selected_date ? 'info' : 'link'}
                        className={`bordered w-100`}>{state.selected_date || 'Select your date'}</DropdownToggle>
                    <DropdownMenu className="w-100">
                        <DropdownItem header>Available dates</DropdownItem>
                        {/* MOCK DATES */}
                        {Array.from({ length: 6 }).map((x, index) => {
                            const date = moment().add(index, 'days').format('MMM Do YYYY');
                            return (
                                <DropdownItem key={index} onClick={() => setState(prevState => ({
                                    ...prevState, selected_date: date
                                }))}>
                                    {date}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>

                <div className="d-flex flex-wrap mt-4 justify-content-center">
                    {/* MOCK TIMES */}
                    {Array.from({ length: 18 }).map((_, index) => {
                        let time = moment('00:00AM', 'hh:mmA').add(7, 'hours').add(30 * index, 'minutes');
                        return (
                            <Button
                                aria-label={`book ${state.doctor?.name} at ${time.format('hh:mmA')}`}
                                color={state.selected_time === time.format('hh:mmA') ? 'info' : 'link'}
                                key={index}
                                onClick={() => setState(prevState => ({ ...prevState, selected_time: time.format('hh:mmA') }))}
                                className={`m-1 bordered`}
                            >{time.format('hh:mmA')}</Button>
                        );
                    })}
                </div>
            </ModalBody>
            {state.selected_date && state.selected_time && <ModalFooter className="p-0">
                <Button color="info" className="btn-block w-100 bordered" onClick={onBook}>CONFIRM</Button>
            </ModalFooter>}
        </Modal>

    </>
    )
}

export default Home;
