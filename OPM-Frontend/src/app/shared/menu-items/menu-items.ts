import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  routerLink?:string
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS:Menu[] = [
  {
    label: 'APP',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'DASHBOARD',
        type: 'link',
        icon: 'fas fa-chart-line',
        routerLink:"/app/dashboard"
      },
      {
        state: 'accounting-plan',
        short_label: 'A-P',
        name: 'ACCOUNTING_PLAN',
        type: 'link',
        icon: 'fas fa-receipt',
        routerLink:"/app/accounting/plan"
      },
      {
        state: 'company',
        short_label: 'C',
        name: 'COMPANY',
        type: 'link',
        icon: 'fas fa-building',
        routerLink:"/app/company"
      },
      {
        state: 'tax',
        short_label: 'T',
        name: 'TAX',
        type: 'link',
        icon: 'fas fa-file-invoice-dollar',
        routerLink:"/app/tax"
      },
      {
        state: 'employees',
        short_label: 'EMP',
        name: 'EMPLOYEES',
        type: 'link',
        icon: 'fas fa-user-friends',
        routerLink:"/app/employees"
      },

    ],
  },
  {//expenses
    label: 'EXPENSES_SALES',
    main: [
      {
        state: 'transactions',
        short_label: 'E-T',
        name: 'TRANSACTIONS',
        type: 'link',
        icon: 'fas fa-donate',
        routerLink:'/app/expenses-sales/transactions'
      },
      {
        state: 'products-services',
        short_label: 'P-S',
        name: 'PRODUCTS_SERVICES',
        type: 'link',
        icon: 'fas fa-box',
        routerLink:'/app/expenses-sales/products-services'
      },
      {
        state: 'suppliers',
        short_label: 'S',
        name: 'SUPPLIERS',
        type: 'link',
        icon: 'fas fa-users',
        routerLink:'/app/expenses-sales/suppliers'
      },
      {
        state: 'customers',
        short_label: 'C',
        name: 'CUSTOMERS',
        type: 'link',
        icon: 'fas fa-user-tie',
        routerLink:"/app/expenses-sales/customers"
      },
    ]
  },


  // {
  //   label: 'Map And Extra Pages ',
  //   main: [
  //     {
  //       state: 'map',
  //       short_label: 'M',
  //       name: 'Maps',
  //       type: 'link',
  //       icon: 'ti-map-alt',
  //       routerLink:''

  //     },
  //     {
  //       state: 'authentication',
  //       short_label: 'A',
  //       name: 'Authentication',
  //       type: 'sub',
  //       icon: 'ti-id-badge',
  //       children: [
  //         {
  //           state: 'login',
  //           type: 'link',
  //           name: 'Login',
  //           target: true
  //         }, {
  //           state: 'registration',
  //           type: 'link',
  //           name: 'Registration',
  //           target: true
  //         }
  //       ]
  //     },
  //     {
  //       state: 'user',
  //       short_label: 'U',
  //       name: 'User Profile',
  //       type: 'link',
  //       icon: 'ti-user'
  //     }
  //   ]
  // },
  // {
  //   label: 'Other',
  //   main: [
  //     {
  //       state: '',
  //       short_label: 'M',
  //       name: 'Menu Levels',
  //       type: 'sub',
  //       icon: 'ti-direction-alt',
  //       children: [
  //         {
  //           state: '',
  //           name: 'Menu Level 2.1',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.2',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.2',
  //               target: true
  //             }
  //           ]
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.3',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.4',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.2',
  //               target: true
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       state: 'simple-page',
  //       short_label: 'S',
  //       name: 'Simple Page',
  //       type: 'link',
  //       icon: 'ti-layout-sidebar-left'
  //     }
  //   ]
  // },
  // {
  //   label: 'Support',
  //   main: [
  //     {
  //       state: 'Upgrade To Pro',
  //       short_label: 'U',
  //       // external: 'https://codedthemes.com/item/guru-able-admin-template/',
  //       name: 'Upgrade To Pro',
  //       type: 'external',
  //       icon: 'ti-layout-list-post',
  //       target: true
  //     }
  //   ]
  // }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
