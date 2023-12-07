const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const filename = file.originalname;
        // const extension = path.extname(file.originalname);
        cb(null, `${timestamp}-${filename}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3 //3Mb batas maksimum file yang di upload
    }
});
module.exports = upload;