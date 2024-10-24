import ServerIntlProvider from "@/components/ServerIntlProvider";
import getIntl from "@/app/intl";
import i18nConfig from "@/i18nConfig";
import Header from "@/components/App/Header";
import Footer from "@/components/App/Footer"
export const generateStaticParams = ()=>{
  return i18nConfig.locales.map(locale=>({locale}))
}

const AppLayout = async props => {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  const intl = await getIntl(locale, 'home');
  return <ServerIntlProvider messages={intl.messages} locale={locale}>
    <Header />
    {children}
    <Footer />
  </ServerIntlProvider>
}

export default AppLayout