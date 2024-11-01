import Pagination from "@/components/App/Pagination";
import {client} from "@/lib/elastic";
import Link from 'next/link'

const getArticles = async (locale, page, size)=>{

  const countResponse = await client.count({
    query: {
      bool: {
        must: [
          { match: { "language": locale} }
        ]
      }
    }
  })

  const from = (page-1) * size

  const response = await client.search({
    query: {
      bool: {
        must: [
          { match: { "language": locale } },
        ]
      }
    },
    size,
    from,
    sort: [
      { 'published_at': { "order": "desc", format: "strict_date_optional_time_nanos" } },
    ]
  })

  return {
    articles: response.hits.hits,
    total: countResponse.count
  }
}

const HomePage = async (props)=>{

  const params = await props.params;

  const searchParams = await props.searchParams || {};

  const {
    locale
  } = params

  let {page, size} = searchParams

  if (!page || !size) {
    page = 1
    size = 20
  }

  const {total, articles} = await getArticles(locale, page, size);
  console.log(articles)

  return <main>
    <div className="bg-gray-50 py-6">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-row flex-wrap -mx-3">
            {articles.map(article=> <div key={article._id} className="flex w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-300">
              <div className="flex flex-row sm:block">
                <div className="py-0 sm:py-3 pl-3 sm:pl-0">
                  <Link href={`/${locale}/${article._source.category.slug}/${article._id}/${article._source.slug}`}>
                    <h3 className="text-lg font-bold leading-tight mb-2">
                      {article._source.title}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>)}
            <Pagination
              total={total}
              page={page}
              size={size}
            />
          </div>
        </div>
      </div>
    </div>
  </main>
}

export default HomePage