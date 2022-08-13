import { createI18n } from 'vue-i18n';
import en from '@/locales/en';

export const availableLocales =  {'en': en };

let selectedLocale = 'en';
if (typeof window?.localStorage !== 'undefined')
{
  const value = window.localStorage.getItem('locale');
  if (value) selectedLocale = value;
}

export function setLocale(lang: any)
{
    i18n.global.locale.value = lang;

    if (typeof window?.localStorage !== 'undefined')
    {
        window.localStorage.setItem('locale', lang);
    }
}

export function getLocale(): string
{
  return i18n.global.locale.value || selectedLocale;
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: selectedLocale,
  fallbackLocale: 'en',
  messages: availableLocales
});

export default i18n;
