import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { DashboardStats } from 'src/app/models/ui/dashboardStats';

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
}
