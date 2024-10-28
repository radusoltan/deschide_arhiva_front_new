import useSWR from "swr";
import axios from "@/lib/axios"

export const useCategories = ({locale, page} = {})=>{

  const {data, error, mutate, isLoading} = useSWR(`/api/categories?${locale}&page=${page}`, async ()=>{

    const response = await axios.get(`/api/admin/categories?${locale}&page=${page}`)
    return response.data
  })

  return {
    data, isLoading, error
  }
}