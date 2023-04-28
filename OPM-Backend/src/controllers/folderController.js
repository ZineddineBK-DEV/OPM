const Folder = require('../models/folderModel');

// exports.createFolder = async (req, res) => {
//   try {
//     const folder = Folder(req.body);
//     await folder.save();
//     res.status(200).json({err: false, message: "Successful operation !", rows: folder});
//   } catch (error) {
//     res.status(500).json({ err: true, message: error.message });
//   }
// };




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
      const folder = await Folder.findById(req.body._id);
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
       req.body._id ,
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
