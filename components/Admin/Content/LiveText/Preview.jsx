"use client"
import {useLiveText} from "@/hooks/liveText";
import Link from "next/link";
import {useParams} from "next/navigation";

const PreviewLiveText = ()=>{
  const {data} = useLiveText()
const {locale} = useParams()
  

  return <>
    <button onClick={()=>{

    }}>ADD</button>

    {
      data?.map(({id, name, records})=> <div key={id}>
        <Link href={`/${locale}/content/live-text/${id}`}>
        <h1>{name}</h1>
        </Link>
      </div>)
    }


  </>
}

export default PreviewLiveText