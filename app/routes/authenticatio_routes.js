const jwt = require('jsonwebtoken')
const tokenList = {}
const config = require('../../config')
var validation    =     require("validator");

module.exports = function(app, db) {

    //login-authentication api using jwt tocken
    app.post('/authenticate', function(req, res) {  

        if(!validation.isEmail(req.body.s_username)) {
            //True or false return by this function.
            res.send("Email is Bad");
        }
        else{

        db.collection('student').findOne({ s_username: req.body.s_username}, function(err, user) {
          if (err) throw err;
          if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
          } 
          else {
                db.collection('student').findOne({s_password: req.body.s_password},function(err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                    }
                    else {
                    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
                    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
                    const response = {
                        "status": "Logged in",
                        "token": token,
                        "refreshToken": refreshToken,
                    }
                    tokenList[refreshToken] = response
                    res.status(200).json(response);
                } 
            })
          }
        });
        }
    });
};
