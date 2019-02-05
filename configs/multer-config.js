const multer = require('multer');
const path = require('path');

const disk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.uid}-${file.fieldname}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: disk });

module.exports = upload;
