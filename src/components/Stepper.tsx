import type { Lang } from '../types'
import { t } from '../i18n/ui'

interface Crumb {
  key: 'stepperObjection' | 'stepperStage' | 'stepperAnswer'
  value?: string
  onClick?: () => void
}

interface Props {
  lang: Lang
  active: 1 | 2 | 3
  crumbs: Crumb[]
}

export function Stepper({ lang, active, crumbs }: Props) {
  return (
    <nav className="mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      {crumbs.map((c, i) => {
        const step = (i + 1) as 1 | 2 | 3
        const isActive = step === active
        const done = step < active
        const clickable = done && c.onClick
        return (
          <span key={c.key} className="flex items-center gap-2">
            {i > 0 && <span className="text-bronze/50">/</span>}
            <button
              disabled={!clickable}
              onClick={c.onClick}
              className={`flex items-center gap-2 rounded-full px-2.5 py-1 transition ${
                isActive
                  ? 'text-cream'
                  : clickable
                    ? 'text-cream-dim hover:text-cream'
                    : 'text-cream-dim/50'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                  isActive
                    ? 'bg-bronze text-navy'
                    : done
                      ? 'border hairline text-bronze-300'
                      : 'border hairline text-cream-dim/50'
                }`}
              >
                {step}
              </span>
              <span className="whitespace-nowrap">
                {c.value ?? t(c.key, lang)}
              </span>
            </button>
          </span>
        )
      })}
    </nav>
  )
}
