const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({

  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  dob: {type: String, required: true},
  mobile_number : {type : String , required :true},
  alternate_number: {type: String, required: true},
  state : {type: String, required: true},
  postcode : {type: String, required: true},
  address1 : {type: String, required: true},
  address2 : {type: String, required: true},
  landmark : {type: String, required: true},
  instruction : {type: String, required: true},
  addressType : {
    type : String ,
    enum : ['HOME','OFFICE_COMMERCIAL'],
    required : true
  },



})

const Address = mongoose.model("address", addressSchema);

module.exports={
   Address
  };
