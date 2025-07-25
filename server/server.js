const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const Spot = require('./models/spots.model');

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/spots.routes')(app);
require('./routes/users.routes')(app);
require('./routes/car.routes')(app);
require('./routes/request.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

setInterval(async () => {
    try {
        await Spot.expireInactiveSpots();
        console.log('Expired inactive spots.');
    } catch (err) {
        console.error('Error expiring spots:', err.message);
    }
}, 600000);
