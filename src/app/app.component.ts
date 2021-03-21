import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lynx';

  ngOnInit(): void {
    // Clear session storage
    if (sessionStorage.getItem('version') !== '0.0.0') {
      sessionStorage.clear();
      sessionStorage.setItem('version', '0.0.0');
    }
  }
}
