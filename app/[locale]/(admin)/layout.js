"use client"
import  {useAuth} from '@/hooks/auth'
import Navigation from "@/components/Admin/Navigation";
const AdminLayout = ({children})=>{
  const {user} = useAuth({middleware: "auth"})
  return <div className="min-h-screen bg-gray-100">
    <Navigation />
    <main>{children}</main>
  </div>
}

export default AdminLayout