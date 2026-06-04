import { fireEvent, render, screen } from '@redwoodjs/testing/web'

import Modal from './Modal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Modal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Modal />)
    }).not.toThrow()
  })

  it('renders open dialog content and closes through Radix close', () => {
    const onClose = jest.fn()

    render(
      <Modal open title="Настройки" onClose={onClose}>
        Контент
      </Modal>
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Контент')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }))

    expect(onClose).toHaveBeenCalled()
  })
})
