"use client"
import {useCategories} from "@/hooks/categories";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import { useIntl } from 'react-intl';
import {faCircleLeft, faCircleRight, faLanguage, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import ListSkeleton from "@/components/Skeletons/ListSekeleton";
import ReactPaginate from "react-paginate";

const CategoriesIndex = ()=> {
  // const {locale} = useParams()
  // const pathName = usePathname()
  // const router = useRouter()
  // const params = useSearchParams()
  //
  //
  // const [page, setPage] = useState(Number(params.get('page')) || 1)
  // const [size, setSize] = useState(Number(params.get('size')) || 10)
  // const [categories, setCategories] = useState([])
  // const [total, setTotal] = useState()
  //
  // const {data, isLoading} = useCategories({locale, page})
  //
  // useEffect(() => {
  //
  //   if (data){
  //     setCategories(data.data)
  //     setPage(data.current_page)
  //     setSize(data.per_page)
  //     setTotal(data.total)
  //   }
  //
  // }, [data, page]);
  //
  // const handlePageChange = e => {
  //
  //   router.push(pathName+`?page=${e.selected+1}&size=${size}`)
  // }

  // if (isLoading) return <ListSkeleton />

  return <div className="mx-auto max-w-md bg-white rounded-2xl px-2 py-6 sm:px-6 lg:px-8">
    <ul role="list" className="divide-y divide-gray-100">
      {
       // categories.map((category) => (
       //    <li key={category.id} className="flex justify-between gap-x-6 py-5">
       //      <div className="flex min-w-0 gap-x-4">
       //        <div className="min-w-0 flex-auto">
       //          <p className="text-sm font-semibold leading-6 text-gray-900">{category.title}</p>
       //        </div>
       //      </div>
       //      <div className="inline-flex rounded-md shadow-sm sm:flex sm:items-end" role="group">
       //        <button type="button"
       //                className="px-4 py-2 text-sm rounded-s font-medium focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900">
       //          <FontAwesomeIcon icon={faPenToSquare} />
       //        </button>
       //        <button type="button"
       //                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
       //          <FontAwesomeIcon icon={faLanguage} />
       //        </button>
       //        <button type="button"
       //                className="px-4 py-2 text-sm font-medium rounded-e-lg focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
       //          <FontAwesomeIcon icon={faTrashCan} />
       //        </button>
       //      </div>
       //    </li>
       //  ))
      }
    </ul>
  </div>
}

export default CategoriesIndex;