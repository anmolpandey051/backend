import multer from "multer";

const storage = multer.diskStorage({ // created an object that has properties as functions
    destination: function (req, file, cb) { // first object property 
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) { // second object property
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage
})