import pool from "../db.js";

class BookingsController{
    async addBooking(req, res){
        try {
            const { clientname, clientphonenumber, clientemail, sessiontypeid, bookingdate, note, handled } = req.body

            const newBooking = await pool.query('INSERT INTO Bookings(clientname, clientphonenumber, clientemail, sessiontypeid, bookingdate, note, handled) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [clientname, clientphonenumber, clientemail, sessiontypeid, bookingdate, note, handled])

            if(newBooking.rowCount > 0)
                res.status(200).json(newBooking.rows[0])
            else
                res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }

    async getBooking(req, res){
        try {
            const bookingId = req.params.id

            const booking = await pool.query('SELECT * FROM Bookings WHERE bookingid = $1', [bookingId])

            if(booking.rowCount > 0)
                res.status(200).json(booking.rows[0])
            else
                return res.status(404).json('Booking not found')
        } catch (e) {
            console.log(e)
        }
    }

    async getBookings(req, res){
        try {
            const bookings = await pool.query('SELECT * FROM Bookings')
            res.status(200).json(bookings.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async updateBooking(req, res){
        try {
            const bookingId = req.params.id

            const booking = await pool.query('SELECT * FROM Bookings WHERE bookingid = $1', [bookingId])

            const { clientname, clientphonenumber, clientemail, sessiontypeid, bookingdate, note, handled } = req.body

            if(booking.rowCount === 0)
                return res.status(404).json('Booking not found')

            const updatedBooking = await pool.query('UPDATE Bookings SET clientname = $1, clientphonenumber = $2, clientemail = $3, sessiontypeid = $4, bookingdate = $5, note = $6, handled = $7 WHERE bookingid = $8', [clientname, clientphonenumber, clientemail, sessiontypeid, bookingdate, note, handled, bookingId])

            if(updatedBooking.rowCount > 0)
                res.status(200).json('Booking was updated successfully')
            else
                return res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }

    async deleteBooking(req, res){
        try {
            const bookingId = req.params.id

            const booking = await pool.query('SELECT * FROM Bookings WHERE bookingid = $1', [bookingId])

            if(booking.rowCount === 0)
                return res.status(404).json('Booking not found')

            const deletedBooking = await pool.query('DELETE FROM Bookings WHERE bookingid = $1', [bookingId])

            if(deletedBooking.rowCount > 0)
                res.status(200).json('Booking was deleted successfully')
            else
                return res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }
}

export default new BookingsController