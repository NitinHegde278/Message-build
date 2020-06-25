const multer = require('multer')
const path = require('path')
const fs = require("fs");
const pool = require('../routes/dbconnection');
var cookieParser = require('cookie-parser');

//Set store engine
// var filename;
const storage = multer.diskStorage({
    destination: './public/videos',
    filename: (req, file, cb) => {
        
 
         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
       var filename= file.fieldname + '-' + Date.now() + path.extname(file.originalname)
         file.originalname = filename;

         }

}) 

const upload = multer({
    storage,
}).fields([{name:'uploads',maxCount:1},{name:'images',maxCount:1}]);

//chekcfile type

function checkFileType(file, cb) {
    //permetti extensions
    const filetypes = /.*mp4/;

    //check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    console.log("awdawdwadawdawd",extname)

    //check Mime 
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error solo Mp4')
    }

}

// Init Upload



module.exports = upload
