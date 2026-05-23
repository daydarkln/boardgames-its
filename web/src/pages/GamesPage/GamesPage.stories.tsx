import type { Meta, StoryObj } from '@storybook/react'

import GamesPage from './GamesPage'

const meta: Meta<typeof GamesPage> = {
  component: GamesPage,
}

export default meta

type Story = StoryObj<typeof GamesPage>

export const Primary: Story = {}
