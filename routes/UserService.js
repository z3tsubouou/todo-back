const mongoose = require("mongoose");
const mongodb = require("../config/mongodb");
const UserSchema = require("../schema/UserSchema");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const salt = genSaltSync(10);

module.exports = {
    register: async (data, callback) => {
        const User = mongoose.model("user", UserSchema);
        if (!data.name || !data.email || !data.password) {
            return callback("Өгөгдөл буруу байна");
        } else {
            await mongodb().then(async (mongoose) => {
                try {
                    const user = {
                        name: data.name,
                        email: data.email,
                        admin: false,
                        password: hashSync(data.password, salt),
                    };
                    const success = await new User(user).save();
                    return callback(null, "success");
                } catch (err) {
                    mongoose.connection.close();
                    return callback(err);
                }
            });
        }
    },
    login: async (data, callback) => {
        const User = mongoose.model("user", UserSchema);
        if (!data.email || !data.password) {
            return callback("Өгөгдөл буруу байна");
        } else {
            await mongodb().then(async (mongoose) => {
                try {
                    User.findOne({ email: data.email })
                        .then((user) => {
                            const result = compareSync(
                                data.password,
                                user.password,
                            );

                            user.password = undefined;
                            user.todo = undefined;

                            if (result) {
                                const jsonToken = sign(
                                    { user },
                                    process.env.SECRET,
                                    {
                                        expiresIn: "1h",
                                    },
                                );
                                return callback(null, { user, jsonToken });
                            } else {
                                return callback(
                                    "Email эсвэл нууц үг буруу байна",
                                );
                            }
                        })
                        .catch((err) => {
                            return callback("Email эсвэл нууц үг буруу байна");
                        });
                } catch (err) {
                    mongoose.connection.close();
                    return callback(err);
                }
            });
        }
    },
    getTodo: async (data, callback) => {
        const User = mongoose.model("user", UserSchema);
        if (!data._id) {
            return callback("Өгөгдөл буруу байна");
        } else {
            await mongodb().then(async (mongoose) => {
                let usersProjection = {
                    __v: false,
                    password: false,
                    admin: false,
                    email: false,
                };
                try {
                    User.findOne({ _id: data._id }, usersProjection)
                        .then((user) => {
                            return callback(null, {
                                user,
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
    addTodo: async (data, callback) => {
        const User = mongoose.model("user", UserSchema);
        if (!data._id || !data.description) {
            return callback("Өгөгдөл буруу байна");
        } else {
            await mongodb().then(async (mongoose) => {
                try {
                    User.findOneAndUpdate(
                        { _id: data._id },
                        {
                            $push: {
                                todo: {
                                    description: data.description,
                                    end: false,
                                },
                            },
                        },
                        { safe: true, new: true },
                    )
                        .then(() => {
                            return callback(null, "success");
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
    deleteTodo: async (data, callback) => {
        const User = mongoose.model("user", UserSchema);
        if (!data._id) {
            return callback("Өгөгдөл буруу байна");
        } else {
            await mongodb().then(async (mongoose) => {
                try {
                    User.findOneAndUpdate(
                        { _id: data._id },
                        { $pull: { todo: { _id: data.todo_id } } },
                        { safe: true, multi: true },
                    )
                        .then((user) => {
                            return callback(null, "success");
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
    endTodo: async (data, callback) => {
        const User = mongoose.model("user", UserSchema);
        if (!data._id) {
            return callback("Өгөгдөл буруу байна");
        } else {
            await mongodb().then(async (mongoose) => {
                try {
                    User.findOneAndUpdate(
                        { "todo._id": data._id },
                        {
                            $set: {
                                "todo.$.end": true,
                            },
                        },
                        { safe: true, new: false },
                    )
                        .then((user) => {
                            return callback(null, "success");
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
    getAllUserData: async (callback) => {
        const User = mongoose.model("user", UserSchema);
        let usersProjection = {
            password: false,
        };
        await mongodb().then(async (mongoose) => {
            try {
                User.find({}, usersProjection)
                    .then((user) => {
                        return callback(null, {
                            user,
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
    },
};
