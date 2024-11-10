const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },

    description: {  
        type: String,
    },

    image: {
        
        filename: { type: String, default: "listingimage" },
        url: { 
        type: String,
        default: "https://www.tripsavvy.com/thmb/_Rt3jkxaF5P_UrB2CewwHIquJ2U=/1920x1365/filters:fill(auto,1)/pacificterracehotel-bd2dcb7b9d5c4dda9adf004b4aa8b0a5.jpg",
        // if the image are set than condition v===" " is true then print default link, otherwise v value print.
        set: (v) => v===" " ? "https://www.tripsavvy.com/thmb/_Rt3jkxaF5P_UrB2CewwHIquJ2U=/1920x1365/filters:fill(auto,1)/pacificterracehotel-bd2dcb7b9d5c4dda9adf004b4aa8b0a5.jpg" : v,
        }
    },
    price: Number, 
    location: String,
    country: String,
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;