import { Metadata } from '@redwoodjs/web'

import GameSessionCell from 'src/components/GameSessionCell'

type GamePageProps = {
  id: number
}

const GamePage = ({ id }: GamePageProps) => {
  return (
    <>
      <Metadata title="Игра" description="Карточка игровой встречи" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <GameSessionCell id={id} />
      </div>
    </>
  )
}

export default GamePage
