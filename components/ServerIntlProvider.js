"use client"
import {IntlProvider} from 'react-intl'

const ServerIntlProvider = ({messages, locale, children})=>{
  return <IntlProvider locale={locale} messages={messages}>
    {children}
  </IntlProvider>
}

export default ServerIntlProvider