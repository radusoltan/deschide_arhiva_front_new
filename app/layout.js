
import "./globals.css";
import i18nConfig from "@/i18nConfig";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { Poppins } from 'next/font/google'

export const metadata = {
  title: "Arhiva Deschide.MD",
  description: "Rămâi la curent cu Deschide, cel mai important portal de știri din Moldova. Oferim știri de ultimă oră, analize și reportaje din politică, afaceri și multe altele. Citește acum!",
  verification: {
    google: "-rDqDICX_ImOW78yT0FZM0kUFLXOek0SKsIClP6YNTs"
  }
};

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300','400','500','600','700','800','900'],
})

export const generateStaticParams = ()=>{
  return i18nConfig.locales.map(locale=>({locale}))
}

export default async function RootLayout(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  return <html lang={locale} className="h-full bg-gray-100">
  <GoogleAnalytics gaId="G-7E5YRG7F5M" />
  <GoogleTagManager gtmId="GTM-WJW23Z" />
    <body className={poppins.className + ` h-full`}>
      {children}
      <Script id="clarity-script" strategy="afterInteractive">
        {`
        (function (c, l, a, r, i, t, y){
          c[a] = c[a] || function () {
            (c[a].q = c[a].q || []).push(arguments)
          };
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "on1o6a29dr");
      `}
      </Script>
    </body>
  </html>
}
