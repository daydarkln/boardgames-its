import { cn } from 'src/lib/cn'

type Tab = {
  value: string
  label: string
}

type TabsProps = {
  tabs?: Tab[]
  value?: string
  onChange?: (value: string) => void
}

const Tabs = ({
  tabs = [{ value: 'default', label: 'Tab' }],
  value = tabs[0]?.value,
  onChange,
}: TabsProps) => {
  return (
    <div className="bg-white/7 inline-flex rounded-lg border border-white/10 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={cn(
            'rounded-md px-4 py-2 text-sm font-semibold text-slate-400 transition',
            value === tab.value &&
              'bg-violet-500 text-white shadow shadow-violet-950/30'
          )}
          onClick={() => onChange?.(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
