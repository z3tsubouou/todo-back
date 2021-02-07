const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

//routes
const userRoute = require("./routes/UserRoutes");

app.use("/user", userRoute);

app.listen(8000, () => console.log("server running on: 8000"));
