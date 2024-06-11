const cloudinary = require('cloudinary').v2;

cloudinary.v2.uploader
.upload("/home/my_image.jpg")
.then(result=>console.log(result));