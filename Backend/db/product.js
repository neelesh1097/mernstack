const mongoose = require('mongoose')
const productsSchema =new mongoose.Schema({
    name:String,
    email:String,
    category:String,
    userid:String,
    price:String,
    company:String
})

module.exports = mongoose.model("products" ,productsSchema);