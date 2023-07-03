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

const MENUITEMS     = [
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
        state: 'employees',
        short_label: 'EMP',
        name: 'EMPLOYEES',
        type: 'link',
        icon: 'fas fa-user-friends',
        routerLink:"/app/employers"
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
        state: 'folders',
        short_label: 'T',
        name: 'FOLDERS',
        type: 'link',
        icon: 'fas fa-solid fa-folder',
        routerLink:"/app/folders"
      },
      {
        state: 'Work order Client',
        short_label: 'K',
        name: 'Unhandled work order',
        type: 'link',
        icon: 'fas fa-solid fa-briefcase',
        routerLink:"/app/listWorkOrdersClient"
      }
      

    ],
  },
];
const MENUITEMSCLT  =  [
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
        state: 'word',
        short_label: 'T',
        name: 'Work Order CLT',
        type: 'link',
        icon: 'fas fa-solid fa-folder',
        routerLink:"/app/ClientDashboardWok"
      },
    ],
  },
 
];
const MENUITEMSTECH = [
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
        state: 'word2',
        short_label: 'T',
        name: 'Work Order',
        type: 'link',
        icon: 'fas fa-solid fa-folder',
        routerLink:"/app/workorderListTechClt"
      },
    ],
  },
 
];
@Injectable()
export class MenuItems {
  getAll(userRole:any): Menu[] {
    if(userRole == 'admin'){return MENUITEMS}
    if(userRole == 'client'){return MENUITEMSCLT }
    if(userRole == 'technician'){return MENUITEMSTECH}
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
