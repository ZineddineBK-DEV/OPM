const WorkOrder = require('../models/workOrderModel');
const Contract = require('../models/contractModel');
const Client = require('../models/clientModel');

const checkSLA = async (clientId) => {
  try {
    // Get work order 
    const client = await Client.findById(clientId);
    const contract = await Contract.findById(client.contractId);
    await delay(contract.sla);
    const workOrder = await WorkOrder.findOne({ clientId: clientId });
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

function delay(hours) {
  const milliseconds = hours * 60 * 60 * 1000; // Convert hours to milliseconds
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
module.exports = checkSLA;