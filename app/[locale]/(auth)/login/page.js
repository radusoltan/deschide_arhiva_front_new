import ServerIntlProvider from "@/components/ServerIntlProvider"
import getIntl from "@/app/intl";
import LoginForm from "@/components/Auth/LoginForm";

const LoginPage = async (props)=>{

  const params = await props.params;

  const {
    locale
  } = params;

  const intl = await getIntl(locale, 'home');

  return <ServerIntlProvider messages={intl.messages} locale={locale}>
    <LoginForm />
  </ServerIntlProvider>
}

export default LoginPage