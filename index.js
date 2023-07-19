const express = require('express');
const dotenv = require('dotenv');
const Router = require('./routes/route');
//const registerController = require('./controllers/registerController');

dotenv.config();

const app = express();
app.use(express.json());

app.use(Router);

const PORT  = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})