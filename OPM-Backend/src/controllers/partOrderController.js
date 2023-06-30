const PartOrder = require('../models/partOrderModel');

// Create a new part order
exports.createPartOrder = async (req, res) => {
  try {
    const partOrder = new PartOrder(req.body);
    await partOrder.save();
    res.status(200).json({ err: false, message: "Successful operation!", rows: partOrder });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all part orders
exports.getAllPartOrders = async (req, res) => {
  try {
    const partOrders = await PartOrder.find();
    res.status(200).json({ err: false, message: "Successful operation!", rows: partOrders });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single part order by ID
exports.getPartOrderById = async (req, res) => {
  try {
    const partOrder = await PartOrder.findById(req.params.id);
    if (!partOrder) {
      res.status(404).json({ err: true, message: 'Part order not found' });
    } else {
      res.status(200).json({ err: false, message: "Successful operation!", rows: partOrder });
    }
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a part order
exports.updatePartOrder = async (req, res) => {
  try {
    const partOrder = await PartOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!partOrder) {
      res.status(404).json({ err: true, message: 'Part order not found' });
    } else {
      res.status(200).json({ err: false, message: "Successful operation!", rows: partOrder });
    }
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Delete a part order
exports.deletePartOrder = async (req, res) => {
  try {
    const partOrder = await PartOrder.findByIdAndDelete(req.params.id);
    if (!partOrder) {
      res.status(404).json({ err: true, message: 'Part order not found' });
    } else {
      res.status(200).json({ err: false, message: "Successful operation!", rows: partOrder });
    }
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};
