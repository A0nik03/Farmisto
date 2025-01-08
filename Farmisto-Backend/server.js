const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const FarmerRoutes = require('./routes/FarmerRoutes copy');
const UserRoutes = require("./routes/userRoutes")
const CartRoutes=require("./routes/cartRoutes");
const MongooseConnect = require('./config/Db');
const {fetchLocation, fetchNearbyFarmers }= require('./controllers/GeoController');
dotenv.config();

MongooseConnect();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/farmer', FarmerRoutes);
app.use('/user', UserRoutes);
app.use("/cart",CartRoutes);
app.use('/api/geocode',fetchLocation)
app.use('/api/geoNearby',fetchNearbyFarmers)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});