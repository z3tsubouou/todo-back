const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

app.use(cors({ origin: "*" }));
app.use(express.json());

//routes
const userRoute = require("./routes/UserRoutes");

app.use("/user", userRoute);

app.listen(process.env.PORT || 8000, () =>
    console.log(`server running on: ${process.env.PORT || 8000}`),
);
