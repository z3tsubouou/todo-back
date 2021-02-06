const { verify } = require("jsonwebtoken");
const { admin } = require("./authService");

module.exports = {
    checkAdminToken: (req, res, next) => {
        let token = req.get("Authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: "Invalid token",
                    });
                } else {
                    admin({ _id: req.body._id }, (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        if (results.admin == true) {
                            next();
                        } else {
                            res.json({
                                success: false,
                                message: "Access denied!",
                            });
                        }
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Access denied!",
            });
        }
    },
    checkUserToken: (req, res, next) => {
        let token = req.get("Authorization");
        console.log(token);

        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: "Invalid token",
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: false,
                message: "Access denied!",
            });
        }
    },
};
