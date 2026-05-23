import { useState } from 'react'

import { Metadata } from '@redwoodjs/web'

import PageHeader from 'src/components/PageHeader/PageHeader'
import Select from 'src/components/Select/Select'
import VenuesCell from 'src/components/VenuesCell'

const VenuesPage = () => {
  const [district, setDistrict] = useState('')

  return (
    <>
      <Metadata
        title="Площадки"
        description="Клубы и места для настольных игр"
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Город"
          title="Клубы и площадки"
          description="Клубы, кафе и пространства, где уже собираются игроки."
        />
        <div className="mb-6 max-w-xs">
          <Select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
          >
            <option value="">Все районы</option>
            <option value="Тверская">Тверская</option>
            <option value="Бауманская">Бауманская</option>
            <option value="Стартаковская">Стартаковская</option>
            <option value="Курская">Курская</option>
          </Select>
        </div>
        <VenuesCell input={district ? { district } : {}} />
      </div>
    </>
  )
}

export default VenuesPage
