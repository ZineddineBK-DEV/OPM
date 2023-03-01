import { environment } from "../../environments/environment";

//AUTH ENDPOINTS
export const SIGNUP_END_POINT: string = `${environment.apiUrl}/auth/user/signup`;
export const VERIFY_ACCOUNT_END_POINT: string = `${environment.apiUrl}/auth/user/validate`;
export const SIGNIN_END_POINT: string = `${environment.apiUrl}/auth/user/signin`;
export const RESET_VERIFY_EMAIL_END_POINT: string = `${environment.apiUrl}/auth/user/verify/reset/email`;
export const RESET_VERIFY_CODE_END_POINT: string = `${environment.apiUrl}/auth/user/verify/reset/code`;
export const RESET_PASSWORD_END_POINT: string = `${environment.apiUrl}/auth/user/reset/password`;
export const GET_USER_REFRESH_TOKEN_END_POINT: string = `${environment.apiUrl}/auth/user/refresh`;
export const USER_LOGOUT_END_POINT: string = `${environment.apiUrl}/auth/user/logout`;

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
export const GET_USER_TAXES_END_POINT: string = `${environment.apiUrl}/tax/get`;
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

