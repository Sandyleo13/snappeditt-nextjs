"use client";

import Script from "next/script";

const CRISP_WEBSITE_ID = "21a00db6-a294-4b15-b236-f1a4eb7ae3fb";

export default function CrispChat() {
  return (
    <Script
      id="crisp-chat"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";window.CRISP_RUNTIME_CONFIG={client_domain:"client.crisp.chat"};(function(){var d=document,s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
      }}
    />
  );
}