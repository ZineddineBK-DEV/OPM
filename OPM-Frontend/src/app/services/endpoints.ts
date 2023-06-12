import { environment } from "../../environments/environment";

//AUTH ENDPOINTS
export const SIGNIN_END_POINT: string = `${environment.apiUrl}/login`;
export const SIGNUP_END_POINT: string = `${environment.apiUrl}/register`;
export const USER_LOGOUT_END_POINT: string = `${environment.apiUrl}/logout`;

//employers
export const GET_USER_employers_END_POINT: string = `${environment.apiUrl}/employee/getAllEmployeesByAuthority`;
export const GET_USER_employers_BY_VALID_END_POINT: string = `${environment.apiUrl}/employee/getAllEmployeesByValid`;
export const PUT_USER_USER_employers_BY_VALIDE: string = `${environment.apiUrl}/employee/updateEmployee`;


//*****company******* */
export const GET_LIST_CLIENTS_BAY_Type : string = `${environment.apiUrl}/client/getAllClientsByValid`;
export const GET_LIST_CLIENTS_All : string = `${environment.apiUrl}/client/all`;
export const PUT_USER_USER_CLIENTS_BY_VALIDE: string = `${environment.apiUrl}/client/updateClient`;


//********admin********** */
export const GET_LIST_FOLDERS_All: string = `${environment.apiUrl}/folder/all`;
export const GET_LIST_Ticket_BY_CLIENTS: string = `${environment.apiUrl}/ticket/getTicketByClientId`;
export const GET_LIST_FILES_BY_CLIENTS: string = `${environment.apiUrl}/folder/getFilesByclientId`;
export const GET_LIST_Work_Orders_BY_CLIENTS: string = `${environment.apiUrl}/workOrder/getUnhandledWorkOrders`;

// ***********static for admi for users ************ */
export const GET_USER_COUNT_tickrt_END_POINT: string = `${environment.apiUrl}/ticket/countTIcketsByClientId`;
export const GET_USER_COUNT_files_BY_VALID_END_POINT: string = `${environment.apiUrl}/folder/countFilesByClientId`;
export const GET_USER_USER_COUNT_worekorder_BY_VALIDE: string = `${environment.apiUrl}/workOrder/countWorkOrderByClientId`;

// ********* worek order ******/

export const POST_WOREK_ORDER_ADMIN_END_POINT: string = `${environment.apiUrl}/workOrder/createWorkOrder`;
export const PUT_WOREK_ORDER_END_POINT: string = `${environment.apiUrl}/workOrder/updateWorkOrder`;
export const DELETE_USER_WORK_ORDER_END_POINT: string = `${environment.apiUrl}/workOrder/deleteWorkOrder`;
export const GET_USER_WORK_ORDER_BY_STATUS_END_POINT: string = `${environment.apiUrl}/workOrder/getWorkOrderByStatus`;
export const GET_ONE_WORK_ORDER_BY_ID_END_POINT: string = `${environment.apiUrl}/workOrder/getWorkOrderById`;
export const GET_ALL_UNHANDLE_WORK_ORDERS_BY_ID_END_POINT: string = `${environment.apiUrl}/workOrder/getUnhandledWorkOrders`;
export const GET_COUNTL_UNHANDLE_WORK_ORDERS_BY_ID_END_POINT: string = `${environment.apiUrl}/workOrder/countUnhandledWorkOrderByClientId`;

/*  http://127.0.0.1:3000/workOrder/countUnhandledWorkOrderByClientId/646b6c05d0fe94ab5386adc7
127.0.0.1:3000/workOrder/getWorkOrderByStatus/645f74880e0ab8ae87fed835
*/
// mnge ticket for worek order
export const POST_TICKET_ADMIN_END_POINT: string = `${environment.apiUrl}/workOrder/addTicket`;
export const POST_ADD_FILE_FOR_TICKET_ADMIN_END_POINT: string = `${environment.apiUrl}/ticket/ticketAddFile`;
export const DELETE_FILE_FOR_TICKET_ADMIN_END_POINT: string = `${environment.apiUrl}/ticket/ticketRemoveFile`;
export const POST_ADD_FILE_TICKET_ADMIN_END_POINT: string = `${environment.apiUrl}/ticket/ticketAddFile`;
export const PUT_TICKET_END_POINT: string = `${environment.apiUrl}/ticket/updateTicket`;

// worek order part techn
export const GET_WOREK_ORDER_FOR_Te_END_POINT: string = `${environment.apiUrl}/workOrder/getWorkOrderByEmployeeId`;
export const GET_WOREK_ORDER_FOR_TECH_BY_STATUS_END_POINT: string = `${environment.apiUrl}/workOrder/getWorkOrderByEmployeeIdByStatus`;
// 127.0.0.1:3000/workOrder/getWorkOrderByClientId
// 127.0.0.1:3000/workOrder/getWorkOrderByClientIdByStatus

export const GET_WOREK_ORDER_FOR_CLTe_END_POINT: string = `${environment.apiUrl}/workOrder/getWorkOrderByClientId`;
export const GET_WOREK_ORDER_FOR_CLT_BY_STATUS_END_POINT: string = `${environment.apiUrl}/workOrder/getWorkOrderByClientIdByStatus`;

//getWorkOrderByClientIdByStatus



// ******************************//
export const VERIFY_ACCOUNT_END_POINT: string = `${environment.apiUrl}/auth/user/validate`;
export const RESET_VERIFY_EMAIL_END_POINT: string = `${environment.apiUrl}/auth/user/verify/reset/email`;
export const RESET_VERIFY_CODE_END_POINT: string = `${environment.apiUrl}/auth/user/verify/reset/code`;
export const RESET_PASSWORD_END_POINT: string = `${environment.apiUrl}/auth/user/reset/password`;
export const GET_USER_REFRESH_TOKEN_END_POINT: string = `${environment.apiUrl}/auth/user/refresh`;

//DASHBOARD ENDPOINTS
export const USER_DASHBOARD_END_POINT: string = `${environment.apiUrl}/dashboard/get`;

//COMPANY ENDPOINTS
export const GET_USER_COMPANIES_END_POINT: string = `${environment.apiUrl}/company/get`;
export const GET_USER_SELECTED_COMPANY_END_POINT: string = `${environment.apiUrl}/company/get/selected`;
export const DELETE_USER_COMPANIES_END_POINT: string = `${environment.apiUrl}/company/delete`;
export const POST_USER_COMPANIES_END_POINT: string = `${environment.apiUrl}/company/add`;
export const PUT_USER_COMPANIES_END_POINT: string = `${environment.apiUrl}/company/update`;
export const SET_SELECTED_USER_COMPANIES_END_POINT: string = `${environment.apiUrl}/company/set/selection`;

//USER-INFO ENDPOINTS
export const USER_INFO_END_POINT: string = `${environment.apiUrl}/user/info`;

//EMPLOYEE ENDPOINTS
export const GET_USER_EMPLOYEES_END_POINT: string = `${environment.apiUrl}/employee/get`;
export const DELETE_USER_EMPLOYEES_END_POINT: string = `${environment.apiUrl}/employee/delete`;
export const POST_USER_EMPLOYEES_END_POINT: string = `${environment.apiUrl}/employee/add`;
export const PUT_USER_EMPLOYEES_END_POINT: string = `${environment.apiUrl}/employee/update`;

//ACCOUNTING PLAN ENDPOINTS
export const GET_USER_ACCOUNTING_PLAN_SOURCES_END_POINT: string = `${environment.apiUrl}/accounting/plan/get/sources`;
export const GET_USER_ACCOUNTING_PLAN_END_POINT: string = `${environment.apiUrl}/accounting/plan/get`;
export const GET_USER_ACCOUNTING_LIST_PLAN_END_POINT: string = `${environment.apiUrl}/accounting/plan/list_acc_selectop`;
export const IMPORT_USER_ACCOUNTING_PLAN_END_POINT: string = `${environment.apiUrl}/accounting/plan/import`;
export const EXPORT_USER_ACCOUNTING_PLAN_END_POINT: string = `${environment.apiUrl}/accounting/plan/export`;
export const UNLINK_USER_ACCOUNTING_PLAN_END_POINT: string = `${environment.apiUrl}/accounting/plan/unlink`;
export const DELETE_USER_ACCOUNTING_PLAN_ROW_END_POINT: string = `${environment.apiUrl}/accounting/plan/delete/row`;
export const POST_USER_ACCOUNTING_PLAN_ROW_END_POINT: string = `${environment.apiUrl}/accounting/plan/add/row`;
export const PUT_USER_ACCOUNTING_PLAN_ROW_END_POINT: string = `${environment.apiUrl}/accounting/plan/update`;
export const POST_USER_ACCOUNTING_PLAN_END_POINT: string = `${environment.apiUrl}/accounting/plan/add`;


//TAXES ENDPOINTS

export const DELETE_USER_TAXES_END_POINT: string = `${environment.apiUrl}/tax/delete`;
export const POST_USER_TAXES_END_POINT: string = `${environment.apiUrl}/tax/add`;
export const PUT_USER_TAXES_END_POINT: string = `${environment.apiUrl}/tax/update`;

//CUSTOMERS ENDPOINTS
export const GET_USER_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/customer/get`;
export const DELETE_USER_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/customer/delete`;
export const POST_USER_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/customer/add`;
export const PUT_USER_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/customer/update`;
export const GET_USER_CUSTOMERS_LIST_END_POINT: string = `${environment.apiUrl}/customer/list_customer_select_option`;


//PRODUCTS ENDPOINTS
export const GET_USER_PRODUCTS_END_POINT: string = `${environment.apiUrl}/products/get`;
export const ADD_USER_PRODUCTS_END_POINT: string = `${environment.apiUrl}/products/add`;
export const DELETE_USER_PRODUCTS_END_POINT: string = `${environment.apiUrl}/products/delete`;
export const PUT_PRODUCTS_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/products/update`;



//SERVICES ENDPOINTS
export const GET_USER_SERVICES_END_POINT: string = `${environment.apiUrl}/services/get`;
export const POST_USER_SERVICES_END_POINT: string = `${environment.apiUrl}/services/add`;
export const PUT_SERVICES_END_POINT: string = `${environment.apiUrl}/services/update`;
export const DELETE_USER_SERVICES_END_POINT: string = `${environment.apiUrl}/services/delete`;

// SUPPLIETS
export const GET_SUPPLIETS_SERVICES_END_POINT: string = `${environment.apiUrl}/suppliers/get`;
export const POST_SUPPLIETS_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/suppliers/add`;
export const PUT_SUPPLIETS_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/suppliers/update`;
export const DELETE_SUPPLIETS_CUSTOMERS_END_POINT: string = `${environment.apiUrl}/suppliers/delete`;

//INVOICES ENDPOINTS
export const GET_USER_INVOICES_END_POINT: string = `${environment.apiUrl}/invoices/get`;

//TRANSACTIONS ENDPOINTS
export const GET_USER_TRANSACTIONS_PRODUCTS_END_POINT: string = `${environment.apiUrl}/products/get/transactions`;

export const GET_USER_TRANSACTIONS_SERVICES_END_POINT: string = `${environment.apiUrl}/services/get/transactions`;

