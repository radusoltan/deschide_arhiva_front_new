"use client"

import {useLiveText} from "@/hooks/liveText";
import LiveTextEditor from "./LiveTextEditor";
import Script from "next/script";
const LiveText = ({id}) => {

  const {liveTextDetails, ltdLoading} = useLiveText({id})

  if (ltdLoading) return <>LOADING ...</>



  return <div className="p-5">
    <h1 className="mx-5 text-2xl ">{liveTextDetails?.name}</h1>

    <div>
      {/*<form action={handleForm}>*/}
        <LiveTextEditor
            data={liveTextDetails}
            onFinish={(editor) => {
              console.log('editor', editor)
            }}
            onEdit={(editor)=>{
              console.log('editor', editor)
            }}
        />
        {/*<button type="submit">SAVE</button>*/}
      {/*</form>*/}


      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {
          liveTextDetails?.records.map(record => <li className="mb-10 ms-4" key={record.id}>
            <div
                className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {record.published_at}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{
              record.title
            }</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: record.content }} />

            <a href="#"
               className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn
              more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg></a>
          </li>)
        }
      </ol>
    </div>
  </div>
}

export default LiveText