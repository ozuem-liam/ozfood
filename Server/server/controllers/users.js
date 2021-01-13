const User = require('../models/user');
const config = require("../config/auth.config");
let Role = User.role;
const db = require('../models/index')

const bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");

// console.log(`what is ${Op}`);

 

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

//     login(req, res) {
//         const {emailaddress,password} = req.body
        
//         User.findOne({emailaddress})
//         .then((user) => {
//              if(user) {
//             user.matchPassword(password).then(res.json(user))
//     } else {
//         return res.status(401)
//     };
//   }
// }


     login(req, res) {
        const {emailaddress,password} = req.body;
         User.findOne({emailaddress})
           .then(user => {
             if (!user) {
               return res.status(404).send({ message: "User Not found." });
             }
     
             let passwordIsValid = bcrypt.compareSync(
               req.body.password,
               user.password
             );
     
             if (!passwordIsValid) {
              return res.status(401).send({
                 accessToken: null,
                 message: "Invalid Password!"
              });
            }
     
             let token = jwt.sign({ id: user.id }, config.secret, {
               expiresIn: 86400 // 24 hours
             });
      
             let authorities = [];
             user.getRoles().then(roles => {
               for (let i = 0; i < roles.length; i++) {
                 authorities.push("ROLE_" + roles[i].name.toUpperCase());
               }
               res.status(200).send({
                 id: user.id,
                 username: user.username,
                 emailaddress: user.emailaddress,
                 roles: authorities,
                accessToken: token
               });
             });
           })
           .catch(err => {
             res.status(500).send({ message: err.message });
           });
       }
};








    // login(req, res) {
    //     const { emailaddress, password } = req.body;
        
    //    return createdUser
    //     .findOne({
    //         where: {
    //             emailaddress
    //         }
    //     })
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(401).send({
    //                 message: message.notFound
    //             });
    //         } else if (emailaddress === process.env.USER_EMAIL
    //             && bcrypt.compareSync(password, User.password)) {
    //                 // create Token
    //                 const adminToken = jwt.sign(
    //                     {
    //                         username: process.env.ADMIN_NAME,
    //                         role: 'admin',
    //                         id: User.id
    //                     },
    //                     app.get('secret'),
    //                     {
    //                         expiresIn: 60 * 60 * 72 // token expires 72 hours
    //                     }
    //                 );
    //                 return res.status(200).send({
    //                     message: 'Welcome admin',
    //                     username: User.username,
    //                     token: adminToken
    //                 });
    //             } else if (bcrypt.compareSync(password, user.paassword)) {
    //                 // Create Token
    //                 const userToken = jwt.sign(
    //                     {
    //                         username: User.username,
    //                         role: 'user',
    //                         id: User.id
    //                     },
    //                     app.get('secret'),
    //                     {
    //                         expiresIn: 60 * 60 * 24 // token expires after 24 hours
    //                     }
    //                 );
    //                 return res.status(200).send({
    //                     message: 'Successfully logged in',
    //                     username: User.username,
    //                     token: userToken
    //                 });
    //             }
    //             res.status(401).send({
    //                 message: message.incorrectPassword
    //             });
    //     })
    //     .catch((error) => {
    //         res.status(500).send ({
    //             message: 'So sorry! An error occured and you cannot login', error
    //         });
    //     });
    // }


// login(req, res) {
//     const emailaddress = createdUser.find(emailaddress => user.emailaddress = req.body.emailaddress)
//     if (emailaddress == null) {
//         return res.status(400).send('Cannot find user')
//     }
//     try {
//         if (bcrypt.compare(req.body.password, user.password)) {
//             res.send('Login was successful')
//         } else {
//             res.send('Login not allowed')
//         }
//     } catch {
//         res.status(500).send()
//     }
// }