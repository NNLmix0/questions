import type { Lang } from '../types'

interface Props {
  lang: Lang
  onChange: (lang: Lang) => void
}

export function LangToggle({ lang, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full border hairline bg-navy-700/60 p-0.5 text-sm font-medium">
      {(['ru', 'pl'] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`rounded-full px-3 py-1 transition-colors ${
            lang === l
              ? 'bg-bronze text-navy'
              : 'text-cream-dim hover:text-cream'
          }`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
