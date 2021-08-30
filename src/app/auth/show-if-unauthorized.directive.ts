import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Permission } from '../models/role';
import { AuthService } from './auth.service';

@Directive({
  selector: '[showIfUnauthorized]'
})
export class ShowIfUnauthorizedDirective implements OnInit{

  @Input('showIfUnauthorized') requiredPermission: Permission | Permission[];

  constructor(
    private element: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.hasPermissions(this.requiredPermission)) {
      this.element.nativeElement.style.setProperty('display', 'none', 'important');
    }
  }

}
