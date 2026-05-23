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

import EmptyState from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof EmptyState>

export const Primary: Story = {}
