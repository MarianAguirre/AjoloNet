import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: { [key: string]: string } } = {
    en: {
      'OCCUPIED': 'Ocupado',
      'AVAILABLE': 'Disponible',
      'END_DEVICE': 'DISPOSITIVO FINAL',
      'PATCH_PANEL': 'PATCH PANEL'
    }
    // Agrega más idiomas y traducciones según sea necesario
  };

  private currentLang: string = 'en';

  constructor() { }

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  translate(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }
}
