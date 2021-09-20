import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { Permission } from 'src/app/models/role';
import { DashboardStats } from 'src/app/models/ui/dashboardStats';

import { MenuGroup } from './../../../models/ui/menuGroup';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private update: BehaviorSubject<DashboardStats>;
  public onUpdate: Observable<DashboardStats>;

  constructor(
    private processService: ProcessesService,
    private orderService: OrdersService,
    private authService: AuthService
  ) {
    this.update = new BehaviorSubject(null);
    this.onUpdate = this.update.asObservable();

    this.processService.onProcessChange.subscribe(async (id) => {
      this.update.next(await this.getStats());
    });

    this.orderService.onOrdersChange.subscribe(async (id) => {
      this.update.next(await this.getStats());
    });
  }

  async getStats(): Promise<DashboardStats> {
    let processes = await this.processService.getAll().toPromise();
    let orders = await this.orderService.getAll().toPromise();
    let localUser = this.authService.getLocalUser();

    return {
      overall: {
        inProgress: processes.reduce<number>((count, process) => count += process.status == 'in_progress' ? 1 : 0, 0),
        finished: processes.reduce<number>((count, process) => count += process.status == 'completed' ? 1 : 0, 0)
      },
      assigned: {
        inProgress: processes.reduce<number>((count, process) => count += process.assignedUserId == localUser.id &&  process.status == 'in_progress' ? 1 : 0, 0),
        finished: processes.reduce<number>((count, process) => count += process.assignedUserId == localUser.id && process.status == 'completed' ? 1 : 0, 0)
      },
      orders: {
        drafts: orders.reduce<number>((count, order) => count += order.status == 'in_preparation' ? 1 : 0, 0),
        notStarted: orders.reduce<number>((count, order) => count += order.status == 'released' ? 1 : 0, 0),
      }
    }
  }

  async getMenu(): Promise<MenuGroup[]> {
    return <MenuGroup[]>[
      {
        name: 'Order',
        icon: 'icon-hierarchy-56',
        background: 'assets/img/theme/order.jpg',
        items: [
          {
            name: 'Overview',
            route: '/orders/overview',
            neededPermissions: Permission.ORDER_VIEW
          },
          {
            name: 'Create New',
            route: '/orders/draft',
            neededPermissions: Permission.ORDER_EDIT
          }
        ]
      },
      {
        name: 'Process',
        icon: 'icon-configuration-tool',
        background: 'assets/img/theme/process.jpg',
        items: [
          {
            name: 'Overview',
            route: '/processes/overview',
            neededPermissions: Permission.PROCESS_VIEW
          }
        ]
      },
      {
        name: 'Template',
        icon: 'icon-web-design-2',
        background: 'assets/img/theme/template.jpg',
        items: [
          {
            name: 'Product',
            route: '/templates/product',
            neededPermissions: Permission.TEMPLATE_VIEW
          },
          {
            name: 'Process',
            route: '/templates/process',
            neededPermissions: Permission.TEMPLATE_VIEW
          }
        ]
      },
      {
        name: 'Manual',
        icon: 'icon-web-design-2',
        background: 'assets/img/theme/template.jpg',
        items: [
          {
            name: 'Overview',
            route: '/manuals/overview',
            neededPermissions: Permission.MANUAL_VIEW
          },
          {
            name: 'Create New',
            route: '/templates/process/new',
            return: 'manual',
            neededPermissions: Permission.TEMPLATE_EDIT
          }
        ]
      },
      {
        name: 'Administration',
        icon: 'icon-folder-shared',
        background: 'assets/img/theme/admin.jpg',
        items: [
          {
            name: 'Users',
            route: '/users',
            neededPermissions: Permission.USER_VIEW
          },
          {
            name: 'Roles',
            route: '/roles',
            neededPermissions: Permission.ROLE_VIEW
          }
        ]
      },
      {
        name: 'Statistics',
        icon: 'icon-chemistry',
        background: 'assets/img/theme/profile-cover.jpg',
        items: [
          {
            name: 'Overview',
            route: '/statistics/overview',
            neededPermissions: Permission.STATISTIC_VIEW
          }
        ]
      }
    ];
  }
}
