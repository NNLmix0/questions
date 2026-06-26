import type { Lang } from '../types'
import { t } from '../i18n/ui'
import { LangToggle } from './LangToggle'

interface Props {
  lang: Lang
  email: string
  onLangChange: (lang: Lang) => void
  onLogout: () => void
  onHome: () => void
}

export function Header({ lang, email, onLangChange, onLogout, onHome }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b hairline bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button onClick={onHome} className="flex items-center gap-2.5 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border hairline bg-navy-600 font-serif text-xl font-bold gold-text">
            C
          </span>
          <div className="leading-tight">
            <div className="font-serif text-base font-semibold">
              {t('appName', lang)}
            </div>
            <div className="hidden text-[10px] uppercase tracking-widest text-cream-dim sm:block">
              {t('appTagline', lang)}
            </div>
          </div>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden max-w-[160px] truncate text-xs text-cream-dim md:inline">
            {email}
          </span>
          <LangToggle lang={lang} onChange={onLangChange} />
          <button
            onClick={onLogout}
            className="rounded-full border hairline px-3 py-1.5 text-sm text-cream-dim transition hover:border-bronze hover:text-cream"
          >
            {t('logout', lang)}
          </button>
        </div>
      </div>
    </header>
  )
}
