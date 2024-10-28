"use client"

import {useState} from "react";
import {useLiveText} from "@/hooks/liveText";
import {useParams} from "next/navigation";
import LiveTextEditor from "./LiveTextEditor"

const LiveTextRecord = ({record})=> {
  const {id} = useParams()
  const {deleteLiveTextRecord} = useLiveText({id, recordId: record.id})

  const [isEdit, setIsEdit] = useState(false)
  return ( isEdit ? <LiveTextEditor data={record} successEdit={(prop)=>setIsEdit(prop)}/> :
      <li className="mb-10 ms-4" key={record.id}>
    <div
        className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
      {record.published_at}
    </time>

    <div className="editor-content"
       dangerouslySetInnerHTML={{__html: record.content}}/>


    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button type="button"
              onClick={()=>setIsEdit(true)}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        Edit
      </button>
      <button type="button"
              onClick={()=>deleteLiveTextRecord(record.id)}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        Delete
      </button>
    </div>
  </li>)
}

export default LiveTextRecord;