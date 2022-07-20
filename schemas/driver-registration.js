import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    age: Number,
    license: {
        type: String,
        unique: true,
        required: true
    },
    adhaar: {
        type: String,
        unique: true,
        required: true
    },
    availability: {
        type: String,
        default: 'off'
    },
    location: {
        type: [Number],
        default: [0, 0]
    },
})

export default mongoose.model('driver', driverSchema);