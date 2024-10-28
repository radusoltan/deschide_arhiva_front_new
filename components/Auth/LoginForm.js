"use client"

import AuthSessionStatus from "@/components/Auth/AuthSessionStatus";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/auth";
import {useRouter} from "next/navigation";
import { useIntl } from 'react-intl'

const LoginForm = ()=>{
  const intl = useIntl()
  const router = useRouter()

  const {login} = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: '/dashboard'
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset))
    } else {
      setStatus(null)
    }
  })

  const submitForm = async event => {
    event.preventDefault()
    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus
    })
  }

  return <>
    <AuthSessionStatus className="mb-4" status={status} />
    <form className="max-w-sm mx-auto" onSubmit={submitForm}>
      <div className="mb-5">
        <label htmlFor="email"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {intl.formatMessage({id: "email"})}
        </label>
        <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {intl.formatMessage({ id: 'password' })}
        </label>
        <input
            type="password" id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            value={password}
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              name="remember"
              onChange={(event) => setShouldRemember(event.target.checked)}
          />
        </div>
        <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {intl.formatMessage({ id: 'remember' })}
        </label>
      </div>
      <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
      </button>
    </form>
  </>
}

export default LoginForm