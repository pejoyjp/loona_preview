import { getOkendoProviderData, OkendoProvider } from "@okendo/shopify-hydrogen";
import { Analytics, getShopAnalytics, useNonce } from "@shopify/hydrogen";
import {
  isRouteErrorResponse,
  Links,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunction,
  useRouteError,
  useRouteLoaderData,
} from "react-router";
import favicon from "~/assets/favicon.svg";
import { getCountries, getRootDomain } from "~/data/countries";
import resetStyles from "~/styles/reset.css?url";
import type { Route } from "./+types/root";
import { PageLayout } from "./components/layout/layout";
import { FOOTER_QUERY, HEADER_QUERY } from "./graphql/fragments";
import { TranslationProvider } from "./lib/i18n/translation-context";
import { getLocaleFromRequest } from "./lib/locale-from-request";
import tailwindCss from "./styles/tailwind.css?url";

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({ formMethod, currentUrl, nextUrl }) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== "GET") return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: "preconnect",
      href: "https://cdn.shopify.com",
    },
    {
      rel: "preconnect",
      href: "https://shop.app",
    },
    { rel: "icon", type: "image/svg+xml", href: favicon },
  ];
}

const SUPPORTED_LOCALES = ["en", "fr"] as const;
export async function loader(args: Route.LoaderArgs) {

  const {locale} = args.params;
  if (locale && !SUPPORTED_LOCALES.includes(locale as any)) {
    throw new Response("Not Found", { status: 404 });
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);


  const { storefront, env } = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const { storefront } = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: "main-menu", // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return { header };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, request }: LoaderFunctionArgs) {
  const { storefront, customerAccount, cart } = context;

  const url = new URL(request.url);
  const rootDomain = getRootDomain(url.host);

  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: "footer",
      },
    })
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
    selectedLocale: getLocaleFromRequest(request),
    countries: getCountries(rootDomain),
    okendoProviderData: getOkendoProviderData({
      context,
      subscriberId: "63676b51-1ecc-4241-95b8-1e4c501bc9fb",
    }),
  };
}

export function Layout({ children }: { children?: React.ReactNode }) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss} />
        <link rel="stylesheet" href={resetStyles} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>("root");

  if (!data) {
    return (
      <TranslationProvider locale={{ language: "EN", country: "US" }}>
        <Outlet />
      </TranslationProvider>
    );
  }

  return (
    <OkendoProvider okendoProviderData={data.okendoProviderData}>
      <Analytics.Provider cart={data.cart} shop={data.shop} consent={data.consent}>
        <TranslationProvider
          locale={{
            language: data.consent.language,
            country: data.consent.country,
          }}
        >
          <PageLayout {...data}>
            <Outlet />
          </PageLayout>
        </TranslationProvider>
      </Analytics.Provider>
    </OkendoProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "Unknown error";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}
