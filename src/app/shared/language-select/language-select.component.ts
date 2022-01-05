import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { Language } from '../models/language';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit, DoCheck {

  selectedLanguage: Language;

  Language = Language;

  availableLanguages: Language[];

  @Input() small: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ngDoCheck();
  }

  ngDoCheck(): void {
    const current = <any>this.cookieService.get('preferred_language');

    if (!current || current != this.selectedLanguage) {
      this.selectLanguage(current ?? Language.EN);
    }
  }

  selectLanguage(language: Language) {
    this.selectedLanguage = language;

    let expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    this.cookieService.put('preferred_language', this.selectedLanguage, { expires: expirationDate, path: '/' });

    this.availableLanguages = Object.values(Language).filter(x => (typeof x === "string") && x != this.selectedLanguage);
  }

  getCurrentRoute() {
    return this.router.url;
  }
}
