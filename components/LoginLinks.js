"use client"

import {useAuth} from "@/hooks/auth";
import Link from "next/link";
import {useParams} from "next/navigation";
import { useIntl } from 'react-intl';

const LoginLinks = ()=>{
  const {locale} = useParams()
  const {user} = useAuth({
    middleware: 'guest',
  })
  const intl = useIntl();
  return <div className="hidden px-6 py-4 sm:block">
    {user ?
        (<Link href={`/${locale}/dashboard`}>
          {intl.formatMessage({id: "dashboard"})}
        </Link>) :
        (<Link href={`/${locale}/login`}>{
          intl.formatMessage({id: "login"})
        }</Link>)}
  </div>
}
export default LoginLinks;