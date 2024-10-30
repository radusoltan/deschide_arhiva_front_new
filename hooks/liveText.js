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

export const useLiveText = ({id}={})=>{
  const {data, mutate, error, isLoading} = useSWR(`/api/admin/livetexts`, async ()=>{
    const response = await axios.get(`/api/admin/livetexts/`);
    return response.data
  })

  const { data: liveTextDetails, isLoading: ltdLoading, mutate: ltMutate } = useSWR(
      `/api/admin/livetexts/${id}`, async ()=>{
        const response = await axios.get(`/api/admin/livetexts/${id}`);
        return response.data
      }
  )

  const addLiveTextRecord = async ({ id, content, tg_embed, title, successAdd }) => {

    const resp = await axios.post(`/api/admin/livetexts/${id}/records`, {
      content,
      tg_embed,
      title
    });
    if (resp.status === 200) {
      successAdd();
    }
    ltMutate(); // Actualizează datele pentru LiveText-ul specific
    return resp;
  };

  const updateLiveTextRecord = async ({ recordId, content, tg_embed, title, success })=>{
    await axios.patch(`/api/admin/records/${recordId}`, {
      content,
      tg_embed,
      title
    }).then(() => {
      ltMutate(); // Actualizează datele după editare
      success(true);
    });
  }

  const deleteLiveTextRecord = async (recordId)=>{
    await axios.delete(`/api/admin/records/${recordId}`).then(() => ltMutate());
  }

  const {data: publicLiveText} = useSWR(`/live-text`, async ()=>{

    const response = await fetch('/live-text')
    return await response.json();

  })


  return {
    data,
    liveTextDetails,
    ltdLoading,
    addLiveTextRecord,
    deleteLiveTextRecord,
    updateLiveTextRecord,
    publicLiveText
  }
}