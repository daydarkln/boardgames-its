import type { Meta, StoryObj } from '@storybook/react'

import VenuePage from './VenuePage'

const meta: Meta<typeof VenuePage> = {
  component: VenuePage,
}

export default meta

type Story = StoryObj<typeof VenuePage>

export const Primary: Story = {}
