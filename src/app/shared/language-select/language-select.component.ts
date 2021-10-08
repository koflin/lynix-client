import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { Language } from '../models/language';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  selectedLanguage: Language;

  Language = Language;

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = <any>this.cookieService.get('preferred_language') ?? Language.EN;
  }

  selectLanguage(language: Language) {
    this.selectedLanguage = language;
    this.cookieService.put('preferred_language', this.selectedLanguage);
  }
}
