
import axios from "@/lib/axios";

const getCategories = async (locale)=>{

  const response = await axios.get(`/api/categories?locale=${locale}`)

  console.log(response)

  return []
}

const CategoryPage = async (props)=>{

  const params = await props.params

  const {locale} = params


  const some = await getCategories()

  return <>
  </>
}

export default CategoryPage;