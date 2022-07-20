import express from 'express';
import mongoose from 'mongoose';
import driverModel from './schemas/driver-registration.js';
import riderModel from './schemas/rider-registration.js';
import tripModel from './schemas/trip.js';

const app = express();

app.use(express.json());

const port = 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("DB connected succeddfully!");
});


// driver api's

app.post('/register-driver', (req, res) => {
    driverModel.create(req.body, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
})

app.patch('/availability', (req, res) => {
    const { id, availability } = req.body;
    driverModel.updateOne({ _id: id }, { availability }, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
})

app.patch('/driver-location', (req, res) => {
    const { id, location } = req.body;
    driverModel.updateOne({ _id: id }, { location }, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
})

app.get('/all-drivers', (req, res) => {
    driverModel.find({}, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
})

//rider api's

app.post('/register-rider', (req, res) => {
    riderModel.create(req.body, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
})

app.get('/all-riders', (req, res) => {
    riderModel.find({}, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
})

app.patch('/rider-location', (req, res) => {
    const { id, location } = req.body;
    riderModel.updateOne({ _id: id }, { location }, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
})

//trip api's

app.post('allocate-trip', async (req, res) => {
    const { rider, location, start_time } = req.body; //rider location

    await driverModel.find({ availability: "on" }, (drivers, err) => {
        if(err) res.status(400).send(err);
        let min_dis = 999999;
        let nearest_driver = '';
        drivers.forEach((driver) => {
            const x_coord = driver[1] - driver[0];
            const y_coord = location[1] - location[0];
            const distance = Math.sqrt((x_coord * x_coord) + (y_coord * y_coord));
            if (distance < min_dis) {
                min_dis = distance;
                nearest_driver = driver.name;
            }
        });
        res.status(200).send({ driver: nearest_driver, nearest_distance: min_dis });
    });

    const tripObj = {
        driver: nearest_driver,
        rider: rider,
        start_time,
        end_time: null,
    }

    tripModel.create(tripObj, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
});

app.patch('start-trip', (req, res) => {
    const { id, start_time } = req.body;
    tripModel.updateOne({ _id: id }, { start_time }, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
});

app.patch('end-trip', (req, res) => {
    const { id, end_time } = req.body;
    tripModel.updateOne({ _id: id }, { end_time }, (data, err) => {
        if (!err) res.status(200).send(data);
        res.status(400).send(err);
    });
});