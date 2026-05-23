import GameSessionCell from 'src/components/Admin/GameSession/GameSessionCell'

type GameSessionPageProps = {
  id: number
}

const GameSessionPage = ({ id }: GameSessionPageProps) => {
  return <GameSessionCell id={id} />
}

export default GameSessionPage
