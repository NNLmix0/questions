import { useState } from 'react'
import type { Lang } from '../types'
import { t } from '../i18n/ui'
import { LangToggle } from './LangToggle'

interface Props {
  lang: Lang
  onLangChange: (lang: Lang) => void
  requestCode: (email: string) => boolean
  verifyCode: (email: string, code: string) => boolean
}

export function Login({ lang, onLangChange, requestCode, verifyCode }: Props) {
  const [phase, setPhase] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  function submitEmail(e: React.FormEvent) {
    e.preventDefault()
    if (requestCode(email)) {
      setError(null)
      setPhase('code')
    } else {
      setError(t('invalidEmail', lang))
    }
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault()
    if (!verifyCode(email, code)) {
      setError(t('invalidCode', lang))
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-10">
      <div className="w-full max-w-md fade-in">
        <div className="mb-6 flex items-center justify-between">
          <Wordmark lang={lang} />
          <LangToggle lang={lang} onChange={onLangChange} />
        </div>

        <div className="card-elev rounded-2xl border hairline bg-navy-700/70 p-7 backdrop-blur">
          {phase === 'email' ? (
            <form onSubmit={submitEmail} noValidate>
              <h1 className="font-serif text-3xl font-semibold tracking-tight">
                {t('loginTitle', lang)}
              </h1>
              <p className="mt-1.5 text-sm text-cream-dim">
                {t('loginSubtitle', lang)}
              </p>

              <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-bronze-300">
                {t('emailLabel', lang)}
              </label>
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder', lang)}
                className="mt-2 w-full rounded-xl border hairline bg-navy-600/80 px-4 py-3 text-cream outline-none transition focus:border-bronze focus:ring-1 focus:ring-bronze/50"
              />

              {error && <p className="mt-2 text-sm text-bronze-300">{error}</p>}

              <button
                type="submit"
                className="gold-glow mt-6 w-full rounded-xl bg-bronze px-4 py-3 font-semibold text-navy transition hover:bg-bronze-400"
              >
                {t('continue', lang)}
              </button>
            </form>
          ) : (
            <form onSubmit={submitCode} noValidate>
              <h1 className="font-serif text-3xl font-semibold tracking-tight">
                {t('twoFaTitle', lang)}
              </h1>
              <p className="mt-1.5 text-sm text-cream-dim">
                {t('twoFaSubtitle', lang)} · <span className="text-cream">{email}</span>
              </p>

              <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-bronze-300">
                {t('codeLabel', lang)}
              </label>
              <input
                inputMode="numeric"
                autoFocus
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="mt-2 w-full rounded-xl border hairline bg-navy-600/80 px-4 py-3 text-center text-2xl tracking-[0.5em] text-cream outline-none transition focus:border-bronze focus:ring-1 focus:ring-bronze/50"
              />

              {error && <p className="mt-2 text-sm text-bronze-300">{error}</p>}

              <button
                type="submit"
                className="gold-glow mt-6 w-full rounded-xl bg-bronze px-4 py-3 font-semibold text-navy transition hover:bg-bronze-400"
              >
                {t('enter', lang)}
              </button>

              <div className="mt-4 flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setPhase('email')
                    setError(null)
                    setCode('')
                  }}
                  className="text-cream-dim transition hover:text-cream"
                >
                  ← {t('back', lang)}
                </button>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="text-bronze-300 transition hover:text-bronze"
                >
                  {t('resend', lang)}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-cream-dim/70">
          {t('demoHint', lang)}
        </p>
      </div>
    </div>
  )
}

function Wordmark({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border hairline bg-navy-600 font-serif text-xl font-bold gold-text">
        C
      </span>
      <div className="leading-tight">
        <div className="font-serif text-lg font-semibold">{t('appName', lang)}</div>
        <div className="text-[11px] uppercase tracking-widest text-cream-dim">
          {t('appTagline', lang)}
        </div>
      </div>
    </div>
  )
}
