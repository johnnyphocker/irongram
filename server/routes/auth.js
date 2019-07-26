const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const User = require('../models/User');


router.get('/', (req, res) => {
    res.json({
        msg: 'Estás en la página principal'
    })
});

router.post('/signup', (req, res) => {
    const {password, email} = req.body;

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({password: hashPass, email});

    User.findOne({email})
        .then(user => {
            if(user) {
                return res.json({msg: 'Ya existe ese usuario'});
            }
            newUser.save()
                .then(userPost => {
                    res.json(userPost)
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));

});


router.post('/login', (req, res) => {
    const {password, email} = req.body;
    if (email === "" || password === "") {
        res.json({msg:'Ambos campos son necesarios!!'});
    }
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.json({msg: 'No existe ese usuario'});
            }
            if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                return res.json({id:user._id});
                //res.redirect("/");
            } else {
                return res.json({msg: 'Las contraseñas no son iguales'});
            }
        })
});




module.exports = router;