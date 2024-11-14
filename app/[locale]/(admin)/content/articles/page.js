import {client} from "@/lib/elastic";

const getArticles = async ({locale, page, size})=>{

  const from = (Number(page) - 1) * Number(size)

  const response = await client.search({
    index: 'articles',
    query: {
      bool: {
        must: [
          {
            match: { 'language': locale },
          }
        ]
      }
    },
    from,
    size: Number(size)
  })

  return {
    articles: response.hits.hits,
    total: response.hits.total,
  }
}

const ArticlesPage = async ({params, searchParams})=>{


  const locale = (await params).locale

  const { page = '1', size = '20' } = await searchParams

  const data = await getArticles({locale, page, size})

  console.log(data)

  return <div className="mx-auto max-w-7xl bg-white rounded-sm px-2 py-6 sm:px-6 lg:px-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Article Title
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          Published AT
        </th>
      </tr>
      </thead>
        <tbody>
        {
          // data.articles.map(article => <tr key={article._source._id}
          //                         className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          //   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          //     {article._source.title}
          //   </th>
          //   <td className="px-6 py-4">
          //     {article._source.published_at}
          //   </td>
          //   <td className="px-6 py-4">
          //     {article._source.published_at}
          //   </td>
          // </tr>)
        }
          </tbody>
    </table>

</div>
}

export default ArticlesPage;