const jwtPassword = "hulalala";
const jwt = require('jsonwebtoken');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try {
        const admin = jwt.verify(jwtToken, jwtPassword);

        if (admin.username) {
            next();
        }
        else {
            res.json({
                message: "You are not authenticated."
            })
        }
    }
    catch(e){
        res.json({
            message:"Incorrect Input."
        })
    }
}

module.exports = adminMiddleware;