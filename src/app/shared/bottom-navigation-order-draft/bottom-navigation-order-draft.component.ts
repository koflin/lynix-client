import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation-order-draft',
  templateUrl: './bottom-navigation-order-draft.component.html',
  styleUrls: ['./bottom-navigation-order-draft.component.scss']
})
export class BottomNavigationOrderDraftComponent implements OnInit {
  @Input() noPadding: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
