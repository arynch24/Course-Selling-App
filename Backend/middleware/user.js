const jwt = require('jsonwebtoken');
const jwtPassword = "hulalala";

function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    try {
        const user = jwt.verify(jwtToken, jwtPassword);

        if (user.username) {
            next();
        }
        else {
            res.send("You are not authenticated");
        }
    }
    catch{
        res.json({
            message:"Invalid user details."
        })
    }
}

module.exports = userMiddleware;