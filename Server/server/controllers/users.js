const User = require('../models').user;
const bcrypt = require('bcryptjs')


 

// const bcrypt = require('bcrypt.js'); 

module.exports = {
    create(req, res) {
        const {firstname,lastname,username,emailaddress,password} = req.body

        const createdUser = {
            firstname,
            lastname,
            username,
            emailaddress,
            password,
        }

        // hash password
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(createdUser.password, salt, (err, hash) => {
                    if(err) console.log(err.message);
                    //Set password to hashed 
                    createdUser.password = hash;
                    // console.log(createdUser.password)
                    User.create(createdUser)
                    .then(person => res.status(201).send(person))
                    .catch(error => res.status(400).send(error.message));
                })
                
            })

        // const hashPassword = async () => {
        //     const salt = await bcrypt.genSalt(10)
        //     const newHashedPassword = await bcrypt.hash(password,salt)
        //      hashedPassword = newHashedPassword.toString()
            
        //     console.log(hashedPassword)
        //     // return hashedPassword
        // }
        // hashPassword()
        // console.log('craeted ' + createdUser.password)
        // const newUser =  
        return createdUser
        
        
        
        
    },
};
