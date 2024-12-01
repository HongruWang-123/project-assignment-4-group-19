const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
   model:{
    type:String,
    required:[true,'please provide model name'],
    maxlength:50
   },
   category:{
    type:String,
    required:[true,'please provide computer category'],
    maxlength:50
   },
   specification:{
    type:String,
    default:'no specification'
   },
   price:{
    type:Number,
    required:true,
   },
   Image:{
    type:String,
    required:[true,'please provide image url'],
   },
   review:{
    type:String
   },
   stock: {
        type: Number,
        required: true,
        default: 5,
    },
   rate:{
    type:Number,
    set: v => Math.round(v),
    min:0,
    max:5
   },
},{timestamps:true})

module.exports = mongoose.model('product',productSchema);