import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'

import { cn } from 'src/lib/cn'

type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
}

type OptionElementProps = {
  value?: string | number
  disabled?: boolean
  children?: ReactNode
}

type SelectProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: ReactNode
  options?: SelectOption[]
  children?: ReactNode
  disabled?: boolean
  name?: string
  required?: boolean
  className?: string
  contentClassName?: string
  'aria-label'?: string
}

const EMPTY_VALUE = '__empty__'

const toRadixValue = (value?: string) => (value === '' ? EMPTY_VALUE : value)
const fromRadixValue = (value: string) => (value === EMPTY_VALUE ? '' : value)

const optionsFromChildren = (children?: ReactNode): SelectOption[] => {
  const childOptions = Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      const option = child as ReactElement<OptionElementProps>

      return {
        value: String(option.props.value ?? ''),
        label: option.props.children,
        disabled: option.props.disabled,
      }
    })

  return childOptions.length > 0
    ? childOptions
    : [{ value: '', label: 'Select' }]
}

const Select = ({
  value,
  defaultValue,
  onValueChange,
  placeholder,
  options,
  children,
  disabled,
  name,
  required,
  className,
  contentClassName,
  'aria-label': ariaLabel,
}: SelectProps) => {
  const items = options ?? optionsFromChildren(children)

  return (
    <SelectPrimitive.Root
      value={toRadixValue(value)}
      defaultValue={toRadixValue(defaultValue)}
      onValueChange={(nextValue) => onValueChange?.(fromRadixValue(nextValue))}
      disabled={disabled}
      name={name}
      required={required}
    >
      <SelectPrimitive.Trigger
        className={cn(
          'site-control flex items-center justify-between gap-3 px-4 text-left text-white disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-slate-500',
          className
        )}
        aria-label={ariaLabel}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={8}
          className={cn(
            'z-50 max-h-[min(22rem,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-violet-300/25 bg-slate-950/95 text-slate-100 shadow-2xl shadow-black/40 backdrop-blur-xl',
            contentClassName
          )}
        >
          <SelectPrimitive.ScrollUpButton className="flex h-7 items-center justify-center text-slate-400">
            <ChevronUp className="h-4 w-4" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1">
            {items.map((item) => (
              <SelectPrimitive.Item
                key={`${item.value}-${String(item.label)}`}
                value={toRadixValue(item.value) ?? EMPTY_VALUE}
                disabled={item.disabled}
                className="relative flex min-h-9 cursor-default select-none items-center rounded-md py-2 pl-8 pr-3 text-sm font-semibold outline-none transition data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-500/25 data-[disabled]:text-slate-600 data-[highlighted]:text-white data-[state=checked]:text-white"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check className="h-4 w-4 text-violet-200" />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>
                  {item.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-7 items-center justify-center text-slate-400">
            <ChevronDown className="h-4 w-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export default Select
