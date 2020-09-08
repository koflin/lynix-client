import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: BehaviorSubject<Order[]>;
  public onOrdersChange: Observable<Order[]>;

  constructor() {
    this.orders = new BehaviorSubject([
      {
        id: '1000',
        companyId: '0',
        status: 'in_progress',
        name: 'Order 1000',
        description: 'Order for customer 1',
        processes: [
          {
            id: '1',
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
            ],
            currentStep: 0,
            quantityDone: 0,
            quantityTotal: 1,
            timeTaken: 200,
            status: 'in_progress'
          },
          {
            id: '2',
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
            ],
            currentStep: 0,
            quantityDone: 0,
            quantityTotal: 1,
            timeTaken: 0,
            status: 'released'
          }
        ]
      },
      {
        id: '1001',
        companyId: '0',
        status: 'completed',
        name: 'Order 1001',
        description: 'Order for customer 2',
        processes: [
          {
            id: '3',
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
            ],
            currentStep: 0,
            quantityDone: 2,
            quantityTotal: 2,
            timeTaken: 7000,
            status: 'completed'
          },
          {
            id: '4',
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
            ],
            currentStep: 0,
            quantityDone: 1,
            quantityTotal: 2,
            timeTaken: 8000,
            status: 'in_progress'
          }
        ]
      }
    ] as Order[]);

    this.onOrdersChange = this.orders.asObservable();
  }

  getAll(): Order[] {
    return this.orders.value;
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
