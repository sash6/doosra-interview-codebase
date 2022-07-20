import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    driver: {
        type: String,
        required: true,
    },
    rider: {
        type: String,
        required: true,
    },
    start_time: Date,
    end_time: Date,

})

export default mongoose.model('trip', tripSchema);
