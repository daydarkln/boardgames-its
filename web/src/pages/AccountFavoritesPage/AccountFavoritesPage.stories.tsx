import type { Meta, StoryObj } from '@storybook/react'

import AccountFavoritesPage from './AccountFavoritesPage'

const meta: Meta<typeof AccountFavoritesPage> = {
  component: AccountFavoritesPage,
}

export default meta

type Story = StoryObj<typeof AccountFavoritesPage>

export const Primary: Story = {}
