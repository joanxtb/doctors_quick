export type Doctor = {
    id: number;
    name: string;
    lastname: string;
    specialty: string;
    location: string;
    available: boolean;
    rating: number,
    photo: string;    
};

export type Booking = {
    id: string;
    date: string,
    time: string,
    doctor: Doctor
}