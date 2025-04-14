const express = require("express");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();
const { Admin, Course } = require('../db/index');

const jwt = require('jsonwebtoken');
const jwtPassword = "hulalala";

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username: username,
        password: password
    })
        .then(() => {
            res.json({
                message: 'Admin created successfully.'
            })
        })
        .catch((err) => {
            res.send(err);
        })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({
        username, password
    }).then(() => {
        const token = jwt.sign({ username, password }, jwtPassword);

        res.json({
            token: token
        })
    })
        .catch((e) => {
            res.send(e);
        })
});


router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    Course.create({
        title: req.body.title,
        description: req.body.description,
        imageLink: req.body.imageLink,
        price: req.body.price,
    })
        .then((course) => {
            res.json({
                message: 'Course created successfully',
                courseId: course._id
            })
        })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
        .then((data) => {
            res.send(data);
        })
});

module.exports = router;