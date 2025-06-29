const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const Spot = require('./models/spots.model');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
