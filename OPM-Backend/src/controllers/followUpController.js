const FollowUp = require('../models/followUpModel');

exports.createFollowUp = async (req, res) => {
  try {
    const followUp = FollowUp(req.body);
    await followUp.save();
    res.status(200).json({err: false, message: "Successful operation !", rows: followUp});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all followUps
exports.getAllFollowUps = async (req, res) => {
  try {
    const followUp = await FollowUp.find();
    res.status(200).json({err: false, message: "Successful operation !", rows: followUp});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single followUp
exports.getFollowUpById = async (req, res) => {
    try {
      const followUp = await FollowUp.findById(req.params.id);
      if (!followUp) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      res.status(200).json({err: false, message: "Successful operation !", rows: followUp});
    } catch (err) {
      res.status(500).json({ err: true, message: error.message });
    }
  };

  // Get a follow up by ticket id
exports.gefollowUpByTicketId = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const followUp = await FollowUp.findOne({ ticketId });
    if (!followUp) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: followUp});
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a user still working on it username
exports.updateFollowUp = async (req, res) => {
  try {
    const { _id, title, ticketId, status } = req.body;
    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      { _id },
      { title, ticketId, status },
      { new: true }
    );
    if (!updatedFollowUp) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: updatedFollowUp });
  } catch (err) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};

// Delete a followUp
exports.deleteFollowUp = async (req, res) => {
  try {
    const followUp = await FollowUp.findByIdAndDelete(req.body._id);
    if (!followUp) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res.status(200).json({err: false, message: "Successful operation !", rows: followUp});
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};
