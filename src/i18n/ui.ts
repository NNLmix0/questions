import type { Lang } from '../types'

/** Подписи интерфейса (не контент скриптов) */
export const ui = {
  appName: { ru: 'Convvy', pl: 'Convvy' },
  appTagline: {
    ru: 'Скрипты отработки возражений',
    pl: 'Skrypty obsługi obiekcji',
  },

  // Auth
  loginTitle: { ru: 'Вход для агентов', pl: 'Logowanie agentów' },
  loginSubtitle: {
    ru: 'Доступ только для сотрудников Convvy',
    pl: 'Dostęp tylko dla pracowników Convvy',
  },
  emailLabel: { ru: 'Рабочая почта', pl: 'Email służbowy' },
  emailPlaceholder: { ru: 'agent@convvy.com', pl: 'agent@convvy.com' },
  continue: { ru: 'Продолжить', pl: 'Dalej' },
  twoFaTitle: { ru: 'Подтверждение входа', pl: 'Potwierdzenie logowania' },
  twoFaSubtitle: {
    ru: 'Мы отправили 6-значный код на вашу почту',
    pl: 'Wysłaliśmy 6-cyfrowy kod na Twój email',
  },
  codeLabel: { ru: 'Код из письма', pl: 'Kod z wiadomości' },
  enter: { ru: 'Войти', pl: 'Zaloguj' },
  resend: { ru: 'Отправить код повторно', pl: 'Wyślij kod ponownie' },
  back: { ru: 'Назад', pl: 'Wstecz' },
  logout: { ru: 'Выйти', pl: 'Wyloguj' },
  demoHint: {
    ru: 'Демо-режим: код подтверждения — 000000',
    pl: 'Tryb demo: kod potwierdzenia — 000000',
  },
  invalidEmail: { ru: 'Введите корректную почту', pl: 'Podaj poprawny email' },
  invalidCode: { ru: 'Неверный код. Попробуйте 000000', pl: 'Błędny kod. Spróbuj 000000' },

  // Steps
  step: { ru: 'Шаг', pl: 'Krok' },
  step1Title: { ru: 'Выберите возражение', pl: 'Wybierz obiekcję' },
  step2Title: { ru: 'Этап разговора', pl: 'Etap rozmowy' },
  step3Title: { ru: 'Готовый ответ', pl: 'Gotowa odpowiedź' },
  stepperObjection: { ru: 'Возражение', pl: 'Obiekcja' },
  stepperStage: { ru: 'Этап', pl: 'Etap' },
  stepperAnswer: { ru: 'Ответ', pl: 'Odpowiedź' },

  // Answer screen
  baseAnswer: { ru: 'Базовый скрипт', pl: 'Skrypt bazowy' },
  whatIf: { ru: 'Варианты развития · what-if', pl: 'Warianty rozwoju · what-if' },
  condition: { ru: 'Если', pl: 'Jeśli' },
  copy: { ru: 'Копировать', pl: 'Kopiuj' },
  copied: { ru: 'Скопировано', pl: 'Skopiowano' },
  draftBadge: {
    ru: 'Черновик · ждём финальный текст',
    pl: 'Wersja robocza · czekamy na finał',
  },
  draftNote: {
    ru: 'Шаблон-заглушка. Реальные скрипты заказчик пришлёт структурно — подставятся в это поле.',
    pl: 'Szablon zastępczy. Finalne skrypty zostaną podstawione w to miejsce.',
  },

  // Misc
  langRu: { ru: 'RU', pl: 'RU' },
  langPl: { ru: 'PL', pl: 'PL' },
} as const

export type UiKey = keyof typeof ui

export function t(key: UiKey, lang: Lang): string {
  return ui[key][lang]
}
