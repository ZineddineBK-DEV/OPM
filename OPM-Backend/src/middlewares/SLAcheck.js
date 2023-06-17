const WorkOrder = require('../models/workOrderModel');
const FollowUp = require('../models/followUpModel');

const checkSLA = async (id) => {
  try {
    // Get work order
    const workOrder = await WorkOrder.findById(id);
    if (workOrder.status == "In progress")
    {
      
      workOrder.status = "Expired";
      workOrder.isFollowUp = true;
      workOrder.title += " - 1";
      const followUp = FollowUp({title: workOrder.title, workOrderId: workOrder._id, });
      workOrder.followUpList.push(followUp);
      await followUp.save();
      await workOrder.save();
    }
  } catch (error) {
    console.error('Error occurred while checking SLA:', error);
  }
};

module.exports = checkSLA;