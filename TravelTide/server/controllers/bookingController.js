import Booking from '../models/Booking.js'

// create new booking
export const createBooking = async (req, res) => {
    // const { id: userID, username } = req.user; // Extract userId and userEmail from the request

    // if (!userID || !username) {
    //     return res.status(403).json({ success: false, message: "You're not authorized to access!!" });
    // }

    // const newBooking = new Booking({
    //     ...req.body,
    //     userID,
    //     username
    // }); this part was not allowing the bookings to be made...
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({ success: true, message: 'your tour is booked', data: savedBooking })
    } catch (err) {
        res.status(500).json({ success: false, message: 'internal server error adi' })
    }
};

// get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success: true,
            message: 'booking found',
            data: book
        })
    } catch (err) {
        res.status(404).json({ success: false, message: 'booking not found' })
    }
}

// get all bookings
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find() // it was .find(id),since we are getting all the bookings so no need to use id as it will only give one booking as a result
        res.status(200).json({
            success: true,
            message: 'bookings found',
            data: books
        })
    } catch (err) {
        res.status(500).json({ success: false, message: 'internal server error' })
    }
}


// reschedule booking 
export const rescheduleBooking = async (req, res) => {
    try {
        await Booking.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'Booking rescheduled' });    
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// cancel booking
export const cancelBooking = async (req, res) => { 
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Booking canceled' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' }); 
    }
}