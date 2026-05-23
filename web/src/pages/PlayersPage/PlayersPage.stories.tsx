import type { Meta, StoryObj } from '@storybook/react'

import PlayersPage from './PlayersPage'

const meta: Meta<typeof PlayersPage> = {
  component: PlayersPage,
}

export default meta

type Story = StoryObj<typeof PlayersPage>

export const Primary: Story = {}
