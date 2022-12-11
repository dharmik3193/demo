const express =  require("express");
require("./dbconnect/connect");
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");

app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.listen(port,() => {
    console.log("this site port number "+port);
});