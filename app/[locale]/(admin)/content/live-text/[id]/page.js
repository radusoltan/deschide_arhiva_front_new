import LiveText from "@/components/Admin/Content/LiveText/LiveText";



const LiveTextDetailsPage = async props => {
  const params = await props.params;

  const {
    id
  } = params;

  // const {id} = useParams()
  return <div className="m-5 bg-white rounded-lg shadow-sm">
    <LiveText id={id} />
  </div>
}

export default LiveTextDetailsPage;