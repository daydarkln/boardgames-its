import type { Meta, StoryObj } from '@storybook/react'

import AccountProfilePage from './AccountProfilePage'

const meta: Meta<typeof AccountProfilePage> = {
  component: AccountProfilePage,
}

export default meta

type Story = StoryObj<typeof AccountProfilePage>

export const Primary: Story = {}
