const Contract = require('../models/contractModel');

//create contract
exports.createContract = async (req, res) => {
  try {
    const contract = Contract(req.body);
    await contract.save();
    res.status(201).json({ message: 'Contract created successfully' , contract});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Get all contracts
exports.getAllContracts = async (req, res) => {
  try {
    const contract = await Contract.find();
    res.json(contract);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single contract
exports.getContractById = async (req, res, next) => {
    try {
      const contract = await Contract.findById(req.body.contractId );
      if (!contract) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(contract);
    } catch (err) {
      next(err);
    }
  };

// Update a contract 
exports.updateContract = async (req, res) => {
  try {
    const { contractId, terms, type, startDate, endDate, sla } = req.body;
    const updatedContract = await Contract.findByIdAndUpdate(
      contractId ,
      { terms, type, startDate, endDate, sla },
      { new: true }
    );
    if (!updatedContract) {
      return res.status(404).send({ message: "Contract not found" });
    }
    res.status(200).send(updatedContract);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Delete a contract
exports.deleteContract = async (req, res, next) => {
  try {
    const contract = await Contract.findOneAndDelete({ email: req.body.contractId });
    if (!contract) {
      return res.status(404).json({ message: 'contract not found' });
    }

    res.status(200).json({ message: 'Contract deleted', contract });
  } catch (err) {
    next(err);
  }
};
