const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const FarmerRoutes = require('./routes/FarmerRoutes');
const UserRoutes = require('./routes/UserRoutes');
const MarketRoutes = require('./routes/MarketRoutes');
const CartRoutes = require('./routes/CartRoutes');
const {fetchLocation, fetchNearbyFarmers }= require('./controllers/GeoController');
const connectCloudinary=require("./config/cloudinary");
const MongooseConnect = require('./config/Db');
const fileUpload = require('express-fileupload');
dotenv.config();

connectCloudinary();
MongooseConnect();

app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/farmer', FarmerRoutes);
app.use('/farmerDash',MarketRoutes);
app.use('/user', UserRoutes);
app.use("/cart",CartRoutes);
app.use('/api/geocode',fetchLocation)
app.use('/api/geoNearby',fetchNearbyFarmers)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});