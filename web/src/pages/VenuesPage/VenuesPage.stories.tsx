import type { Meta, StoryObj } from '@storybook/react'

import VenuesPage from './VenuesPage'

const meta: Meta<typeof VenuesPage> = {
  component: VenuesPage,
}

export default meta

type Story = StoryObj<typeof VenuesPage>

export const Primary: Story = {}
