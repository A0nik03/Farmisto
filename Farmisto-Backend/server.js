const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const FarmerRoutes = require('./routes/UserRoutes');
const UserRoutes = require('./routes/UserRoutes');
const MongooseConnect = require('./config/Db');
const {fetchLocation, fetchNearbyFarmers }= require('./controllers/GeoController');
dotenv.config();

MongooseConnect();

app.use(cors())
app.use(express.json());   
app.use(express.urlencoded({ extended: false }));

app.use('/farmer', FarmerRoutes);
app.use('/user', UserRoutes);
app.use('/api/geocode',fetchLocation)
app.use('/api/geoNearby',fetchNearbyFarmers)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});