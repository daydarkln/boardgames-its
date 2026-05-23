import EditGameSessionCell from 'src/components/Admin/GameSession/EditGameSessionCell'

type GameSessionPageProps = {
  id: number
}

const EditGameSessionPage = ({ id }: GameSessionPageProps) => {
  return <EditGameSessionCell id={id} />
}

export default EditGameSessionPage
