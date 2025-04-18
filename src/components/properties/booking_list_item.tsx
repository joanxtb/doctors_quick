import React from 'react';
import { Booking } from '../../model/entities';

interface BookingListItemProps {
    booking: Booking,
    //onBook: (Doctor) => void;    
}

const BookingListItem: React.FC<BookingListItemProps> = ({ booking }) => {
    const { doctor } = booking;

    const cardStyle: React.CSSProperties = {
        background: `url(${doctor.photo}) left center / 120px no-repeat white`,
        overflow: 'hidden',
        border: 0,
        height: 120,
        borderTopLeftRadius: 60,
        borderBottomLeftRadius: 60,
    };

    return (
        <div className="col-md-6 col-sm-12 col-lg-4 p-0" role="listitem">
            <figure className="card p-2 m-1" style={cardStyle}>
                <section className="d-flex flex-column h-100" style={{ marginLeft: 130 }}>
                    <span className="black font-14 line1 anton">{`${doctor.name} ${doctor.lastname}`}</span>
                    <span className="gray font-12 line1">{`${doctor.specialty}`}</span>
                    <span className="gray font-10">{`${doctor.location}`}</span>
                    <div className="d-flex flex-row mt-auto">
                        <span className="gray font-10">{`${booking.date} @ ${booking.time}`}</span>
                    </div>
                </section>
            </figure>
        </div>
    );
};

export default BookingListItem;