import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNonce } from "@shopify/hydrogen";

declare global {
  interface Window {
    omnisend?: unknown[];
  }
}

export function Omnisend() {
  const nonce = useNonce();
  const location = useLocation();

  useEffect(() => {
    if (document.getElementById("omnisend-js")) return;

    window.omnisend = window.omnisend || [];
    window.omnisend.push(["brandID", "6805f076aae9d7bc6fdc2d8f"]);

    const script = document.createElement("script");
    script.id = "omnisend-js";
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://omnisnippet1.com/inshop/launcher-v2.js";
    script.nonce = nonce;
    document.head.appendChild(script);
  }, [nonce]);

  useEffect(() => {
    if (window.omnisend) {
      window.omnisend.push(["track", "$pageViewed"]);
    }
  }, [location.pathname]);

  return null;
}
