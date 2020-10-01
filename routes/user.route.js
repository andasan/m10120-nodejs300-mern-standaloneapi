const router = require('express').Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req,res)=> {
    res.json({
        msg: "Hello Node"
    });
});

module.exports = router;