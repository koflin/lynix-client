import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public onOrdersChange: Observable<void>;

  private orders: Order[] = [
    {
      companyId: 'c0',
      id: 'o0',
      status: 'completed',
      name: 'Order 0',
      description: 'Order for customer 1',
      products: [
        {
          templateId: 'pt0',
          quantity: 1
        }
      ]
    },
    {
      companyId: 'c0',
      id: 'o1',
      status: 'completed',
      name: 'Order 1',
      description: 'Order for customer 2',
      products: [
        {
          templateId: 'pt0',
          quantity: 2
        }
      ]
    }
  ];

  constructor() {
  }

  getAll(): Order[] {
    return this.orders;
  }
}

/*productTemplates: [
          {
            name: 'Boat 3000',
            processes: [
              {
                name: 'Hull',
                mainTasks: ['Task1', 'Task2'],
                estimatedTime: 3600,
                steps: [
                  {
                    title: 'Inner Hull',
                    keyMessage: 'KeyMessage1\n KeyMessage2\n',
                    materials: ['Wood'],
                    tasks: 'Task1\nTask2\n',
                    tools: ['Saw']
                  },
                  {
                    title: 'Outer Hull',
                    keyMessage: 'KeyMessage1\n KeyMessage2\n',
                    materials: ['Metal'],
                    tasks: 'Task1\nTask2\n',
                    tools: ['Welder']
                  }
                ]
              },
              {
                name: 'Sail',
                mainTasks: ['Task1', 'Task2', 'Task3'],
                estimatedTime: 7000,
                steps: [
                  {
                    title: 'Cutting',
                    keyMessage: 'KeyMessage1\n KeyMessage2\n',
                    materials: ['Cloth', 'Strings'],
                    tasks: 'Task1\nTask2\n',
                    tools: ['Sewing Machine']
                  }
                ]
              }
            ]
          }
        ],*/
