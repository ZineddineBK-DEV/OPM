const Folder = require('../models/folderModel');
const File = require('../models/fileModel');

// exports.createFolder = async (req, res) => {
//   try {
//     const folder = Folder(req.body);
//     await folder.save();
//     res.status(200).json({err: false, message: "Successful operation !", rows: folder});
//   } catch (error) {
//     res.status(500).json({ err: true, message: error.message });
//   }
// };

// Add file to the folder
 exports.addFile = async (req, res) => {
   try {
    const file = File(req.body);
    await file.save();
    const folder = await Folder.findOneAndUpdate(
      req.body.clientId,
      { $push: { listOfFiles: file } },
      { new: true }
     );
     res.status(200).json({ err: false, message: "Successful operation !", rows: folder });
   } catch (error) {
     res.status(500).json({ err: true, message: error.message });
   }
 };

// remove file to the folder
exports.removeFile = async (req, res) => {
  try {
   const folder = await Folder.findOneAndUpdate(
     req.body.clientId,
     { $pull: { listOfFiles: req.body.fileId } },
     { new: true }
    );
    res.status(200).json({ err: false, message: "Successful operation !", rows: folder });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all folders
exports.getAllFolders = async (req, res) => {
  try {
    const folder = await Folder.find();
    res.status(200).json({err: false, message: "Successful operation !", rows: folder});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single folder
exports.getFolderById = async (req, res) => {
    try {
      const folder = await Folder.findById(req.body.id);
      if (!folder) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      res.status(200).json({err: false, message: "Successful operation !", rows: folder});
    } catch (err) {
      res.status(500).json({ err: true, message: error.message });
    }
  };

// Update a user still working on it username
exports.updateFolder = async (req, res) => {
  try {
    const { _id, name, valid } = req.body;
    const updatedFolder = await Folder.findByIdAndUpdate(
      { _id },
      { name, valid },
      { new: true }
    );
    if (!updatedFolder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: updatedFolder });
  } catch (err) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};

// Delete a folder
exports.deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findByIdAndUpdate(
       req.body.id ,
      { valid: false },
      { new: true }
    );
    if (!folder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res.status(200).json({err: false, message: "Successful operation !", rows: folder});
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};
