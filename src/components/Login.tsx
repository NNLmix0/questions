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

  const inputBase =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20'
  const labelBase =
    'mt-6 block text-xs font-semibold uppercase tracking-wider text-slate-500'
  const submitBase =
    'mt-6 w-full rounded-lg bg-accent px-4 py-3 font-semibold text-white transition hover:bg-accent-hover'

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-10">
      <div className="w-full max-w-md fade-in">
        <div className="mb-6 flex items-center justify-between">
          <Wordmark lang={lang} />
          <LangToggle lang={lang} onChange={onLangChange} />
        </div>

        <div className="card rounded-2xl border border-slate-200 bg-white p-7">
          {phase === 'email' ? (
            <form onSubmit={submitEmail} noValidate>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {t('loginTitle', lang)}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                {t('loginSubtitle', lang)}
              </p>

              <label htmlFor="login-email" className={labelBase}>
                {t('emailLabel', lang)}
              </label>
              <input
                id="login-email"
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder', lang)}
                className={inputBase}
              />

              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

              <button type="submit" className={submitBase}>
                {t('continue', lang)}
              </button>
            </form>
          ) : (
            <form onSubmit={submitCode} noValidate>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {t('twoFaTitle', lang)}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                {t('twoFaSubtitle', lang)} ·{' '}
                <span className="font-medium text-slate-700">{email}</span>
              </p>

              <label htmlFor="login-code" className={labelBase}>
                {t('codeLabel', lang)}
              </label>
              <input
                id="login-code"
                inputMode="numeric"
                autoFocus
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className={`${inputBase} text-center text-2xl tracking-[0.5em]`}
              />

              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

              <button type="submit" className={submitBase}>
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
                  className="font-medium text-slate-500 transition hover:text-slate-900"
                >
                  ← {t('back', lang)}
                </button>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="font-medium text-accent transition hover:text-accent-hover"
                >
                  {t('resend', lang)}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          {t('demoHint', lang)}
        </p>
      </div>
    </div>
  )
}

function Wordmark({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-xl font-bold text-white">
        C
      </span>
      <div className="leading-tight">
        <div className="text-lg font-bold text-slate-900">
          {t('appName', lang)}
        </div>
        <div className="text-[11px] text-slate-500">{t('appTagline', lang)}</div>
      </div>
    </div>
  )
}
