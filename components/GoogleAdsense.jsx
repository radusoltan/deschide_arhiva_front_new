import Script from "next/script";

const GoogleAdsense = ()=>{

  return <Script
      async
      src={`
      https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7537724756068498
      `}
      crossOrigin="anonymous"
      strategy="afterInteractive"
  />
}
export default GoogleAdsense