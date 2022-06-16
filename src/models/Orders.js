import mongoose from "mongoose";
import autopopulate from 'mongoose-autopopulate';

const Orders = mongoose.model("Orders", mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    description: String,
    date: Date,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        autopopulate: true
    }],
    price: Number,
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        autopopulate: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        autopopulate: true
    }
}).plugin(autopopulate))



export default Orders;