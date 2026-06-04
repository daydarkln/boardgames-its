import { Tabs as TabsPrimitive } from 'radix-ui'

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
    <TabsPrimitive.Root value={value} onValueChange={onChange}>
      <TabsPrimitive.List className="inline-flex rounded-lg border border-white/10 bg-slate-950/55 p-1 shadow-inner shadow-black/30">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-bold text-slate-400 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-violet-300/50 data-[state=active]:bg-violet-500 data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:shadow-violet-950/30'
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  )
}

export default Tabs
