import {client} from "@/lib/elastic";
import Image from "next/image";

import ServerIntlProvider from "@/components/ServerIntlProvider";
import getIntl from "@/app/intl";

const getArticle = async (id)=>{

  const response = await client.get({
    index: 'articles',
    id: id,
  })

  return {
    ...response._source
  }

}

const ArticlePage = async (props)=>{

  const params = await props.params
  const {id, locale} = params

  const article = await getArticle(id, locale)

  console.log(article)

  const mainImage = article.images.find(({is_main})=>is_main)

  const intl = await getIntl(locale, 'home');

  return <ServerIntlProvider messages={intl.messages} locale={locale}>
  <div className="bg-gray-50 py-6">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">

          <div className="flex-shrink max-w-full w-full overflow-hidden">
            <div className="w-full py-3 mb-3">
              <h2 className="text-gray-800 text-3xl font-bold">
                <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
                {article.title}
              </h2>
            </div>
            <div className="flex flex-row flex-wrap -mx-3">
              <div className="max-w-full w-full px-4">

                {/* Article Content */}
                <article className="pb-4">
                  <p className="mb-5" dangerouslySetInnerHTML={{__html: article.lead ?? article.lead}}/>
                  <figure className="text-center mb-6">
                    <Image
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + mainImage.path + mainImage.name} alt={article.title}
                        width={mainImage.width}
                        height={mainImage.height}
                        className="max-w-full h-auto"
                        priority
                    />
                  </figure>
                  <div className="mb-5 article-body" dangerouslySetInnerHTML={{__html: article.body}}/>
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                       role="alert">{intl.formatMessage({ id: 'disclaimer' })}</div>
                </article>

              </div>
            </div>
          </div>

        </div>
      </div>

  </div>
  </ServerIntlProvider>
}

export default ArticlePage