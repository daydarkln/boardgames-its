import EditPlayerPostCell from 'src/components/Admin/PlayerPost/EditPlayerPostCell'

type PlayerPostPageProps = {
  id: number
}

const EditPlayerPostPage = ({ id }: PlayerPostPageProps) => {
  return <EditPlayerPostCell id={id} />
}

export default EditPlayerPostPage
