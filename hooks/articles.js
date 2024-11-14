"use client"

import useSWR from "swr";
import {client} from "@/lib/elastic";

export const useArticles = () => {

  const {data} = useSWR(`/api/admin/articles?page=1&locale=ro`, async ()=>{

    return await client.search({
      index: 'articles',
      query: {
        bool: {
          must: [
            {match: {'language': "ro"}}
          ]
        }
      }
    });


  })

  return {
    articles: data
  }

}