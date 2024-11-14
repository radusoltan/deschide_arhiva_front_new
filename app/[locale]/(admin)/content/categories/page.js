import Categories from "@/components/Admin/Content/Categories";


const CategoryPage = async (props)=>{

  const params = await props.params

  const {locale} = params

  console.log(locale)

  return <Categories/>
}

export default CategoryPage;