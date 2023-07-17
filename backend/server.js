const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoute = require("./routes/userRoute.route");
const productRoute = require("./routes/productRoute.route");
const contactRoute = require("./routes/contactRoute.route");

const app = express();

const PORT = process.env.PORT

// MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false, limit: 1024 }));
app.use(bodyParser.json());
app.use(cors({
    origin:["http://localhost:3000", ""],
    credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Router
app.use("/api/users",userRoute);
app.use("/api/products", productRoute);
app.use("/api/contact", contactRoute)

// Error middleware needs to be before connect
app.use(errorHandler);

// Connect to DB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server running on port: ${PORT}`)
        })
    })
    .catch((err)=> console.log(err))
