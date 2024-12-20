import useSWR from "swr"
import axios from "@/lib/axios"
import {useEffect} from "react"
import {useRouter} from "next/navigation"

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()

  const { data: user, error, mutate } = useSWR('/api/user', () =>
      axios
          .get('/api/user')
          .then(res => res.data)
          .catch(error => {
            if (error.response.status !== 409) throw error

            router.push('/verify-email')
          }),
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const login = async ({setErrors, setStatus, ...props})=>{

    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('login', props)
      .then((response) => {
        const token = response.data.token
        localStorage.setItem('access_token', token)
        mutate()
      })
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate())
    }

    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated)

    if (middleware === 'auth' && error) logout()

  }, [user, error])


  return {
    user,
    login,
    logout,
  }
}