// GET|HEAD        http://localhost:8000/api/admin/livetexts ............................. livetexts.index › Admin\LiveTextController@index
// POST            http://localhost:8000/api/admin/livetexts ............................. livetexts.store › Admin\LiveTextController@store
// GET|HEAD        http://localhost:8000/api/admin/livetexts/{livetext} .................... livetexts.show › Admin\LiveTextController@show
// PUT|PATCH       http://localhost:8000/api/admin/livetexts/{livetext} ................ livetexts.update › Admin\LiveTextController@update
// DELETE          http://localhost:8000/api/admin/livetexts/{livetext} .............. livetexts.destroy › Admin\LiveTextController@destroy
// GET|HEAD        http://localhost:8000/api/admin/livetexts/{livetext}/records .. livetexts.records.index › LiveTextRecordController@index
// POST            http://localhost:8000/api/admin/livetexts/{livetext}/records .. livetexts.records.store › LiveTextRecordController@store
// GET|HEAD        http://localhost:8000/api/admin/records/{record} .......................... records.show › LiveTextRecordController@show
// PUT|PATCH       http://localhost:8000/api/admin/records/{record} ...................... records.update › LiveTextRecordController@update
// DELETE          http://localhost:8000/api/admin/records/{record} .................... records.destroy › LiveTextRecordController@destroy

import useSWR from "swr";
import axios from "@/lib/axios";

const fetcher = (url) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then((res) => res.json());

export const useLiveText = ({id}={})=>{
  const {data, mutate, error, isLoading} = useSWR(`/api/admin/live-text`, async ()=>{

    const response = await fetch(`http://localhost:8000/api/admin/livetexts`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    })
        .catch(error=>{
          console.log(error)
        })
    return await response.json()
  })

  const { data: liveTextDetails, isLoading: ltdLoading, mutate: ltMutate } = useSWR(
      `http://localhost:8000/api/admin/livetexts/${id}`,
      async () => {
        const res = await fetch(`http://localhost:8000/api/admin/livetexts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          }
        });
        return res.json();
      }
  )

  const addLiveTextRecord = async ({ id, content, tg_embed, title }) => {

    const resp = await axios.post(`/api/admin/livetexts/${id}/records`,{
      content, tg_embed, title
    })


    ltMutate();

    return resp;
  };


  return {
    data,
    liveTextDetails,
    ltdLoading, addLiveTextRecord
  }
}