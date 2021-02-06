const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(express.json());

//routes
const userRoute = require("./routes/UserRoutes");

app.use("/user", userRoute);

app.listen(8000, () => console.log("server running on 8000"));
