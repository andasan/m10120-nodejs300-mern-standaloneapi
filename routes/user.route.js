const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

router.post('/register', async (req, res) => {
    try{
        let { email, password, confirmPassword, displayName } = req.body;

        if(!email || !password || !confirmPassword){
            return res.status(400).json({ msg: "Not all fields have been entered"});
        }
        if(password.length < 5){
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long."})
        }
        if(password !== confirmPassword){
            return res.status(400).json({ msg: "Passwords do not match."});
        }
    
        const existingUser = await User.findOne({ email: email });
        if(existingUser){
            return res.status(400).json({ msg: "An account with this email already exists."});
        }
    
        if(!displayName) displayName = email;
    
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            email: email,
            password: passwordHash,
            displayName: displayName
        });
    
        const savedUser = await newUser.save();
        res.json({ msg: 'Created new user', savedUser});
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req,res)=> {
    res.json({
        msg: "Hello Node"
    });
});

module.exports = router;