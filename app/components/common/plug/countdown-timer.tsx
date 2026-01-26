import { useEffect } from "react";
import { useNonce } from "@shopify/hydrogen";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "web-component-embed": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        id?: string;
        app_slug?: string;
      };
    }
  }
}

export function CountdownTimer() {
  useEffect(() => {
    if (document.getElementById("powr-js")) return;

    const script = document.createElement("script");
    script.id = "powr-js";
    script.src = "https://app.powr.io/assets/webcomponent.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return <web-component-embed id="GzWygR" app_slug="countdown-timer" />;
}
