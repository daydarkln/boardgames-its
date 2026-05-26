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

import HomeIntroBlock from './HomeIntroBlock'

const meta: Meta<typeof HomeIntroBlock> = {
  component: HomeIntroBlock,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HomeIntroBlock>

export const Primary: Story = {}
