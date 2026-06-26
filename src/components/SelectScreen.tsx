import type { Lang } from '../types'

export interface SelectItem {
  id: string
  label: string
  hint: string
}

interface Props {
  lang: Lang
  stepLabel: string
  title: string
  items: SelectItem[]
  onSelect: (id: string) => void
  columns?: 2 | 3
}

export function SelectScreen({
  stepLabel,
  title,
  items,
  onSelect,
  columns = 2,
}: Props) {
  const grid =
    columns === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2'

  return (
    <div className="fade-in">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-300">
        {stepLabel}
      </p>
      <h1 className="mt-1.5 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>

      <div className={`mt-7 grid gap-3.5 ${grid}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="gold-glow card-elev group flex min-h-[104px] flex-col items-start justify-between rounded-2xl border hairline bg-navy-700/70 p-5 text-left transition hover:bg-navy-600/80"
          >
            <span className="font-serif text-2xl font-semibold text-cream">
              {item.label}
            </span>
            <span className="mt-2 flex w-full items-center justify-between text-sm text-cream-dim">
              <span>{item.hint}</span>
              <span className="text-bronze opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">
                →
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
