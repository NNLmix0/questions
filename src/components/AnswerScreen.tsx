import { useState } from 'react'
import type { Lang, Rebuttal } from '../types'
import { t } from '../i18n/ui'

interface Props {
  lang: Lang
  objectionLabel: string
  stageLabel: string
  rebuttal: Rebuttal
}

export function AnswerScreen({ lang, objectionLabel, stageLabel, rebuttal }: Props) {
  return (
    <div className="fade-in">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-300">
        {t('step3Title', lang)}
      </p>
      <h1 className="mt-1.5 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {objectionLabel}
        <span className="text-bronze"> · </span>
        <span className="text-cream-dim">{stageLabel}</span>
      </h1>

      {rebuttal.draft && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-bronze/30 bg-bronze/5 px-4 py-3 text-sm">
          <span className="mt-0.5 text-bronze">✦</span>
          <div>
            <div className="font-semibold text-bronze-300">
              {t('draftBadge', lang)}
            </div>
            <div className="mt-0.5 text-cream-dim">{t('draftNote', lang)}</div>
          </div>
        </div>
      )}

      {/* Базовый скрипт */}
      <section className="mt-6">
        <SectionTitle>{t('baseAnswer', lang)}</SectionTitle>
        <ScriptCard lang={lang} text={rebuttal.answer[lang]} accent />
      </section>

      {/* Ветви what-if */}
      <section className="mt-8">
        <SectionTitle>{t('whatIf', lang)}</SectionTitle>
        <div className="mt-3 space-y-3">
          {rebuttal.branches.map((b, i) => (
            <div
              key={i}
              className="card-elev rounded-2xl border hairline bg-navy-700/60 p-5"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-xl font-semibold gold-text">
                  {b.label[lang]}
                </span>
                <span className="text-sm text-cream-dim">
                  <span className="font-semibold text-bronze-300">
                    {t('condition', lang)}:
                  </span>{' '}
                  {b.condition[lang]}
                </span>
              </div>
              <div className="mt-3">
                <ScriptCard lang={lang} text={b.response[lang]} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-300">
      {children}
    </h2>
  )
}

function ScriptCard({
  lang,
  text,
  accent = false,
}: {
  lang: Lang
  text: string
  accent?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard недоступен — игнорируем */
    }
  }

  return (
    <div
      className={`relative rounded-xl border p-4 pr-12 leading-relaxed ${
        accent
          ? 'mt-3 border-bronze/40 bg-navy-600/70 text-[15px] text-cream'
          : 'hairline bg-navy-600/50 text-sm text-cream/90'
      }`}
    >
      {text}
      <button
        onClick={copy}
        title={t('copy', lang)}
        className="absolute right-2.5 top-2.5 rounded-lg border hairline px-2 py-1 text-xs text-cream-dim transition hover:border-bronze hover:text-bronze"
      >
        {copied ? t('copied', lang) : t('copy', lang)}
      </button>
    </div>
  )
}
