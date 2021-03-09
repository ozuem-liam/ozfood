
const messages = require("../utils/messages");

const validateId = require("../utils/validateId");

const User = require("../models").User;

const config = require("../config/auth.config");


const bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");
const { token } = require("morgan");
const app = require("../../app");


// console.log(`what is ${Op}`);


// const bcrypt = require('bcrypt.js'); 

module.exports = {
     create(req, res) {
     
        const {firstname,lastname,username,emailaddress,password} = req.body;
       
        const createdUser = {
            firstname,
            lastname,
            username,
            emailaddress,
            password,
        }

       User.findOne({
        where: { 
          emailaddress
        }
        }).then(user => {
          return res.status(400).send("Email already exists!")
        }).catch(err => res.status(500));

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

        return createdUser;
        
    },


     async login(req, res) {
        const {emailaddress, password} = req.body;
        try {
          const user = await User.findOne({
            where: {
              emailaddress
            }
          })
          let passwordIsValid = bcrypt.compareSync(
              password,
              user.password
            );
    
            if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
          }

          let token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
              expiresIn: 86400 // 24 hours
            });
          res.send({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            emailaddress: user.emailaddress,
            token
          });
          app.post('/api/v1/login', 
          passport.authenticate('local', { failureRedirect: '/api/v1/login' }),
          function(req, res) {
          res.redirect('/api/v1/signup');
        });
        } catch (err) {
          console.log(err)
        }
        // const users = await User.find({})
        // res.send(users)
        //  User.find({}).then(users => {
        //   res.send(users)
        //  })
            //  if (!user) {
            //    return res.status(404).send({ message: "User Not found." });
            //  }
             
     
            //  let passwordIsValid = bcrypt.compareSync(
            //    password,
            //    user.password
            //  );
     
            //  if (!passwordIsValid) {
            //   return res.status(401).send({
            //      accessToken: null,
            //      message: "Invalid Password!"
            //   });
            // }
     
            //  let token = jwt.sign({ id: user.id }, config.secret, {
            //    expiresIn: 86400 // 24 hours
            //  });
      
            //  let authorities = [];
            //  user.getRoles().then(roles => {
            //    for (let i = 0; i < roles.length; i++) {
            //      authorities.push("ROLE_" + roles[i].name.toUpperCase());
            //    }
            //    res.status(200).send({
            //      id: user.id,
            //      username: user.username,
            //      emailaddress: user.emailaddress,
            //      roles: authorities,
            //     accessToken: token
            //    });
            //  });
          //  })
          //  .catch(err => {
          //    res.status(500).send({ message: err.message });
          //  });
      
       },

        //---------------------------------------------------------------------------
        // Update password
        //---------------------------------------------------------------------------
  //        /**
  //  *
  //  * Updates user password
  //  * @param {string} req
  //  * @param {string} res
  //  * 
  //  * @returns {object} req, res
  //  */
  updatePassword(req, res) {
    const userReturnId = validateId.validate(req.body.userId);
    console.log(userReturnId);
    if (isNaN(userReturnedId)) {
      return res.status(400).send({
        message: messages.invalidId 
      });
    }
  }, 

  async getAll(req, res) {
    const {firstname,lastname,username,emailaddress} = req.body

    const allUsers = {
      firstname,
      lastname,
      username,
      emailaddress,
  }
  await User.get({}, (err, users) => {
    if (!err) {
      res.send(users);
    } else {
      console.log('Error', err);
    }
  });

  }
};






