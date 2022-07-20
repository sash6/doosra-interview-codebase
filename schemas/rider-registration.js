import mongoose from "mongoose";

const riderSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    adhaar: String,
    location: {
        type: [Number],
        default: [0, 0]
    },
})

export default mongoose.model('rider', riderSchema);
