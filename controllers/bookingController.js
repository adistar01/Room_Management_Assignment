const pool = require("../config/db");

const bookingController = async(req, res)=>{
    const id = req.params.id;
    const {email, dateBook, capacity} = req.body;
    try{
        const getRoom = await pool.query("SELECT * FROM room WHERE room_id = $1;",[id]);
        if(capacity > getRoom.rows[0].capacity){
            return res.json({
                "error": "Not enough capacity"
            })
        }
        // const getReservations = await pool.query("SELECT * FROM booking WHERE room_id = $1;",[id]);
        const availability = await pool.query("SELECT * FROM booking WHERE tab_id = $1 AND $2 = ANY(book);", [id, dateBook]);
        if(availability.rows.length!=0){
            return res.json({
                "error": "Sorry room unavailable for the date"
            })
        }
        const makeReservation = await pool.query("INSERT INTO booking(user_email, tab_id, book) VALUES ($1, $2, $3);",[email, id, [dateBook]]);
        return res.json({
            "Booked": true,
            "Room_id": id
        })
    }catch(e){
        console.log(e);
        return res.json({
            "error":e
        })
    }
}

module.exports = bookingController;