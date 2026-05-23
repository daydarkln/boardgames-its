import type { Meta, StoryObj } from '@storybook/react'

import AccountCreateGamePage from './AccountCreateGamePage'

const meta: Meta<typeof AccountCreateGamePage> = {
  component: AccountCreateGamePage,
}

export default meta

type Story = StoryObj<typeof AccountCreateGamePage>

export const Primary: Story = {}
