"use client"

import {useLiveText} from "@/hooks/liveText";
import LiveTextEditor from "./LiveTextEditor";
import LiveTextRecord from "@/components/Admin/Content/LiveText/LiveTextRecord";
import CustomEditor from "@/components/Admin/Content/LiveText/CustomEditor";
const LiveText = ({id}) => {

  const {liveTextDetails, ltdLoading} = useLiveText({id})

  if (ltdLoading) return <>LOADING ...</>

  return <div className="p-5">
    <h1 className="mx-5 text-2xl ">{liveTextDetails?.name}</h1>

    <div>
      <CustomEditor data={null} />
      <div className="mt-10" />
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {
          liveTextDetails?.records.map(record => <LiveTextRecord key={record.id} record={record} />)
        }
      </ol>
    </div>
  </div>
}

export default LiveText