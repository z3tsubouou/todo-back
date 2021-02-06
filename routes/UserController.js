const {
    register,
    login,
    getTodo,
    addTodo,
    deleteTodo,
    endTodo,
    getAllUserData,
} = require("./UserService");

module.exports = {
    register: (req, res) => {
        register(req.body, (err, results) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            }
            return res.json({
                success: true,
                data: results,
            });
        });
    },
    login: (req, res) => {
        login(req.body, (err, results) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            }
            return res.json({
                success: true,
                data: results,
            });
        });
    },
    getTodo: (req, res) => {
        getTodo(req.body, (err, results) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            }
            return res.json({
                success: true,
                data: results,
            });
        });
    },
    addTodo: (req, res) => {
        addTodo(req.body, (err, results) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            }
            return res.json({
                success: true,
                data: results,
            });
        });
    },
    deleteTodo: (req, res) => {
        deleteTodo(req.body, (err, results) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            }
            return res.json({
                success: true,
                data: results,
            });
        });
    },
    endTodo: (req, res) => {
        endTodo(req.body, (err, results) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            }
            return res.json({
                success: true,
                data: results,
            });
        });
    },
    getAllUserData: (req, res) => {
        getAllUserData((err, results) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            }
            return res.json({
                success: true,
                data: results,
            });
        });
    },
};
