// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/7/writing-stories/args

import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Primary: Story = {}
