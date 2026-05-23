import PlayerPostCell from 'src/components/Admin/PlayerPost/PlayerPostCell'

type PlayerPostPageProps = {
  id: number
}

const PlayerPostPage = ({ id }: PlayerPostPageProps) => {
  return <PlayerPostCell id={id} />
}

export default PlayerPostPage
