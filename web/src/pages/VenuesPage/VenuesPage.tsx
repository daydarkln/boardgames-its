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

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Город"
          title="Клубы и площадки"
          description="Клубы, кафе и пространства, где уже собираются игроки."
        />
        <div className="glass-panel mb-6 grid max-w-2xl gap-3 rounded-xl p-3 sm:grid-cols-[1fr_1fr]">
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
          <Select>
            <option value="">Тип места</option>
            <option value="club">Клуб</option>
            <option value="cafe">Кафе</option>
            <option value="loft">Лофт</option>
          </Select>
        </div>
        <VenuesCell input={district ? { district } : {}} />
      </div>
    </>
  )
}

export default VenuesPage
