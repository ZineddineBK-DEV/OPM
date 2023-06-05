const WorkOrder = require('../models/workOrderModel');

const checkSLA = async (id) => {
  try {
    // Get work order
    const workOrder = await WorkOrder.findById(id);
    if (workOrder.status == "In progress")
    {
      workOrder.status = "Expired";
      await workOrder.save();
    }
    console.log('SLA check completed successfully.', workOrder);
  } catch (error) {
    console.error('Error occurred while checking SLA:', error);
  }
};

module.exports = checkSLA;