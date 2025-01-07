const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const MongooseConnect = require('./config/Db');
const {fetchLocation, fetchNearbyFarmers }= require('./controllers/GeoController');
dotenv.config();

MongooseConnect();

app.use(cors())
app.use(express.json());   
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/api/geocode',fetchLocation)
app.use('/api/geoNearby',fetchNearbyFarmers)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});