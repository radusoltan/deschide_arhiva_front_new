import AppLogo from "@/components/AppLogo"

const AuthCard = ({children})=>{

  return <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <AppLogo className="h-12" />
    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      {children}
    </div>
  </div>
}

export default AuthCard