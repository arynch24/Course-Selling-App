const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

const jwt =require('jsonwebtoken');
const jwtPassword = "hulalala";

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username,password
    })
    .then(()=>{
        const token = jwt.sign({username,password},jwtPassword);
        res.json({
            token:token
        })
    })
    .catch(()=>{
        res.json({
            message: "Incorrect email and pass"
        })
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push":{
            purchasedCourse : courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user);

    console.log(user.purchasedCourse);
    
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router