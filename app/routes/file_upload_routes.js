var multer = require('multer');
var path   = require('path');

let location = path.join(__dirname, './../../uploads');
let storege = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null,location);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() +  file.originalname  );
    
  }
})
var upload = multer({  
  storage: storege,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024
  }
});

module.exports = function(app, db) {

    //used for upload single image
    app.post("/uploadProfile", upload.single("s_profile") , function(req, res) {
        console.log(req.file);
        res.send(req.file);
    });

    //used for upload multiple  images
    app.post('/uploadImages',upload.any() , function(req,res,next){
        console.log(req.files);
        res.send(req.files);
    });

    //used for display images  images
    app.get('/getImages',function(req,res){
        res.sendFile(path.resolve("uploads/s_profile-15494566998743.jpg"));
  });
};

