// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path = require("path");


// const  MONGO_URL = ("mongodb://127.0.0.1:27017/wonderlust");

// main()
// .then(() => {
//     console.log("connected to DB");
// }).catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }


// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));


// app.get("/", (req, res) => {
//     res.send("Hi i am root");
// });

// app.get("/listings", async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// });
// // then acces listing listing.js in app.js and create new route testlisting in which add the info.. 
// // app.get("/testListing", async (req, res) => {
// //     let sampleListing = new Listing({
// //         title: "My New Villa",
// //         description: "By the beach",
       
// //         price: 1500,
// //         location: "Goa",
// //         country: "India",
// //     });

// //     await sampleListing.save();
// //     console.log("sample was saved");
// //     res.send("successful testing");
// // });

// app.listen(8080, () => {
//     console.log("server is listening to port 8080");
// });


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.get("/", (req, res) => {
    res.send("Hi I am root");
});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});


// new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
});

// show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});


// create route 
app.post("/listings", async (req, res) => {
    // if not used listings[] in (new.ejs) 
    // let {title, description, image, price, country, location} = req.body;
    let listing = req.body.listing;
    console.log(listing); 
});

// Edite Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//  update route 
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${ id }`);
});


// delete route 
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// then acces listing listing.js in app.js and create new route testlisting in which add the info.. 
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1500,
//         location: "Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});