var nodemailer = require("nodemailer");
var validation    =     require("validator");
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "vishal.natrixsoftware@gmail.com",
        pass: "Vishal@2018"
    }
});

var multer = require('multer');
var path   = require('path');

let location = path.join(__dirname, './../../mailUploadedData');

var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null,location);
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() +  file.originalname  );
      
    }
  })
});


module.exports = function(app, db) {

     //google send mail api 
    app.get('/sendMail',upload.any(),function(req,res){

        const attachments = req.files.map((file)=>{
            console.log(file)
            return { filename: file.originalname,   content: file.mimetype, path: file.path };
          });
          
        var mailOptions={
            to : req.body.to,
            subject :  req.body.subject ,
            // text : req.body.dicription,
            html: "<b>"+req.body.dicription+"</b>",
            attachments: attachments
            
        }
    

        console.log( req.files);
        if(!validation.isEmail(req.body.to)) {
            //True or false return by this function.
            res.send("Email is Bad");
        }
        else if(!validation.isAlpha(req.body.subject)) {
            res.send("subject  allow is only alpha !");
        }
        else {
            smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                    console.log(error);
                res.end("error");
            }else{
                    console.log("Message sent: " + response);
                res.end("sent");
                }
            });
        }
    });   
};
