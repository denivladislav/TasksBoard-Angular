import { Injectable } from '@angular/core';
import { Locale } from './locale.service.types';

@Injectable({
    providedIn: 'root',
})
export class LocaleService {
    public locales: Locale[] = [
        {
            id: 'en',
            name: 'EN',
            url: 'http://localhost:4200',
        },
        {
            id: 'ru',
            name: 'RU',
            url: 'http://localhost:4201',
        },
    ];

    public get currentLocale(): string | undefined {
        return this.locales.find((locale) => window.location.href.includes(locale.url))?.id;
    }

    public onLocaleChange(localeId: string) {
        const newUrl = this.locales.find((locale) => locale.id === localeId)?.url;
        if (newUrl) {
            window.location.href = newUrl;
        }
    }
}
