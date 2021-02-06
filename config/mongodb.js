const mongoose = require("mongoose");

const mongodb = async () => {
    await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    return mongoose;
};

module.exports = mongodb;
