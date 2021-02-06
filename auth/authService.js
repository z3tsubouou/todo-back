const mongoose = require("mongoose");
const mongodb = require("../config/mongodb");
const UserSchema = require("../schema/UserSchema");

module.exports = {
    admin: async (data, callback) => {
        const User = mongoose.model("user", UserSchema);
        if (!data._id) {
            return callback("Admin bish");
        } else {
            await mongodb().then(async (mongoose) => {
                try {
                    let usersProjection = {
                        __v: false,
                        _id: false,
                        name: false,
                        todo: false,
                        email: false,
                        password: false,
                    };

                    User.findOne({ _id: data._id }, usersProjection)
                        .then((user) => {
                            console.log(user);
                            return callback(null, {
                                admin: user.admin,
                            });
                        })
                        .catch((err) => {
                            return callback(err);
                        });
                } catch (err) {
                    mongoose.connection.close();
                    return callback(err);
                }
            });
        }
    },
};
