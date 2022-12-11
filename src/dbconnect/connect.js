const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Dharmik:Dharmik%238814@atlascluster.hu6s2f8.mongodb.net/test").then(() => {
    console.log("mongodb is connected");
}).catch(() => {
    console.log("mongodb is not connected");
});