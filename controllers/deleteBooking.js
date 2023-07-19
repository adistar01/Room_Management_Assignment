const pool = require("../config/db");

const deleteBooking = async(req, res)=>{
    const {id} = req.params;
    const {custemail, delDate} = req.body;

    try{
        const deleteQuery = await pool.query("DELETE FROM booking WHERE tab_id = $1 AND user_email = $2 AND $3 = ANY(book);",[id, custemail, delDate]);
        // console.log(deleteQuery);
        if(deleteQuery.rowCount==0){
            return res.json({
                "error": "No such entry found !"
            })
        }
        return res.json({
            "success": "Entry deleted successfully"
        })
    }catch(e){
        console.log(e);
        return res.json(e);
    }

}

module.exports = deleteBooking;