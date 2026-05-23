import { Metadata } from '@redwoodjs/web'

import MyRegistrationsCell from 'src/components/MyRegistrationsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'

const AccountMyRegistrationsPage = () => {
  return (
    <>
      <Metadata title="Мои записи" description="Игры, на которые я записан" />

      <PageHeader
        eyebrow="Кабинет"
        title="Мои записи"
        description="Встречи, на которые вы уже записались."
      />
      <MyRegistrationsCell />
    </>
  )
}

export default AccountMyRegistrationsPage
