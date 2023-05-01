// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");

// const storage = new GridFsStorage({
//     url: "mongodb+srv://root:root@opmcluster.dvzi5iq.mongodb.net/OPM?retryWrites=true&w=majority",
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${file.originalname}`;
//             return filename;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${file.originalname}`,
//         };
//     },
// });

// module.exports = multer({ storage });