import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Process } from 'src/app/models/process';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit, OnDestroy {

  private apiSub: Subscription;

  constructor(
    private api: Apollo,
  ) { }

  ngOnInit(): void {
    this.apiSub = this.api.watchQuery<Process[]>({
      query: gql`query GetProcesses {
        processes(offset: 0, limit: 5) {
          name
          status
          order {
            deliveryDate
          }
          deliveryDate
          estimatedTime
          timeTaken
          occupiedById
          assignedUser {
            displayName
          }
        }
      }`,
    },
    ).valueChanges.subscribe((response) => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.apiSub.unsubscribe();
  }
}
