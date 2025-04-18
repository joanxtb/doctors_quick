import React from 'react';
import { Doctor } from '../../model/entities';

interface DoctorListItemProps {
    doctor: Doctor,
    onBook: (Doctor) => void;
}


const DoctorListItem: React.FC<DoctorListItemProps> = ({ doctor, onBook }) => {

    const cardStyle: React.CSSProperties = {        
        background: `url(${doctor.photo}) left center / 120px no-repeat white`,
        overflow: 'hidden',
        border: '0px',
        height: 120,
    };

    return (
        <div className="col-md-6 col-sm-12 col-lg-4 p-0" role="listitem">
            <figure aria-label={`book ${doctor.name} ${doctor.lastname}`} className="card p-2 m-1" style={cardStyle}>
                <section className="d-flex flex-column h-100" style={{ marginLeft: 130 }}>
                    <span className="black font-14 line1 anton">{`${doctor.name} ${doctor.lastname}`}</span>
                    <span className="gray font-12 line1">{`${doctor.specialty}`}</span>
                    <span className="gray font-10">{`${doctor.location}`}</span>
                    <div className="d-flex flex-row mt-auto">

                        {/* RATING */}
                        {Array.from({ length: 5 }).map((x, index) => {
                            return (
                                <i key={index} className={`fas fa-star font-6 ${doctor.rating < index + 1 ? 'black' : 'yellow'} align-self-center`} />
                            );
                        })}

                        {/* Book button */}
                        <button role="button" aria-label={`book an appointment with ${doctor.name} ${doctor.lastname}`} onClick={() => onBook(doctor)} style={{ borderRadius: 12, height: 24 }} className={`btn btn-sm btn-${doctor.available ? 'info' : 'link red'} ms-auto font-6 py-0 px-2`}>{doctor.available ? 'Book' : 'Not available'}</button>
                    </div>
                </section>
            </figure>
        </div>
    );
};

export default DoctorListItem;