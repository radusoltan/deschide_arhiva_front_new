"use client"
import {useLiveText} from "@/hooks/liveText";
import moment from "moment";


const LiveText = (props) => {
  const {publicLiveText} = useLiveText()

  moment.locale('ro')

  return <ol className="relative border-s border-gray-400 dark:border-gray-700">
      {
        publicLiveText && publicLiveText.records.map(record=> <li key={record.id} className="mb-10 ms-4">
          <div
              className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-red-400">

            {moment(record.published_at,'YYYY-MM-DD HH:mm:ss').fromNow()}
          </time>

          <div className="editor-content"
               dangerouslySetInnerHTML={{__html: record.content}}/>

        </li>)
      }
    </ol>
}

export default LiveText