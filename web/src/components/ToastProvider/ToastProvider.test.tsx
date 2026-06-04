import { act, render, screen } from '@redwoodjs/testing/web'

import ToastProvider, { notify } from './ToastProvider'

describe('ToastProvider', () => {
  it('renders emitted toast messages', async () => {
    render(<ToastProvider />)

    act(() => {
      notify.success('Готово')
    })

    expect(await screen.findByText('Готово')).toBeInTheDocument()
  })
})
