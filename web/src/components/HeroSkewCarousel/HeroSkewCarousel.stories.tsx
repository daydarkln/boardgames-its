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

import HeroSkewCarousel from './HeroSkewCarousel'

const meta: Meta<typeof HeroSkewCarousel> = {
  component: HeroSkewCarousel,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HeroSkewCarousel>

export const Primary: Story = {}

export const TtrpgActive: Story = {
  args: {
    initialSlideId: 'ttrpg',
  },
}
