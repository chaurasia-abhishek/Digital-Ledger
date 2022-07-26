const express = require('express')
const router = express.Router()
const user = require('../models/user')
const { body, validationResult, header } = require('express-validator'); //to set rules for new user registration
const bcrypt = require('bcryptjs');// to encrypt the password
const jwt = require('jsonwebtoken');// to encrypt and validate a authentication session
const jwt_string = 'heisagoodb$oy';//digital signature key for session authentication
const fetchUserId = require('../middleware/login')


//route:1 post /api/auth/signup
//login not required
//making the rules for new registration 

router.post('/signup', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must contain atleast five characters').isLength({ min: 5 })
],
    async (req, res) => {
        //validating the rules
        const error = validationResult(req)
        //if validation not meet
        if (!error.isEmpty())
            return res.status(400).json({ error: error.array() })
        //checking the email already registered if yes return founded object otherwise return NULL
        try {
            let newUser = await user.findOne({ email: req.body.email })
            if (newUser)
                return res.status(400).json({ error: `${req.body.email} is already registered, please try with another email address to register` })

            //encrypting password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //creating user profile into database
            newUser = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            //for response creating a json web token with digital signature key
            const data = {
                User: { id: newUser.id }
            }
            const authToken = jwt.sign(data, jwt_string)
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('internal server error')
        }
    })


//route:2 post /api/auth/login
//login not required
//if user trying to login 

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be empty').not().isEmpty()
], async (req, res) => {
    const error = validationResult(req);
    //is user entered valid input credentials
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })

    try {
        const { email, password } = req.body;

        //is user email exists in our database
        const User = await user.findOne({ email });
        if (!User)
            return res.status(400).json({ error: 'enter valid credential to login' })

        //is user password matches with our database
        const passwordCompare = await bcrypt.compare(password, User.password)
        if (!passwordCompare)
            return res.status(400).json({ error: 'enter valid credential to login' })

        //for response creating a json web token with digital signature key
        const data = {
            User: { id: User.id }
        }
        const authToken = jwt.sign(data, jwt_string)
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }
}
)

//route:3 post /api/auth/getuser
//login required
//get loggedin user jwt details and verifing it with the help of fetchUserId login middleware

router.post('/getuser', fetchUserId, async (req, res) => {
    try {
        //send resposnse to user with a valid auth-token
        const UserID = req.User.id
        const User = await user.findById(UserID).select('-password')
        res.json(User)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }
}
)
module.exports = router;