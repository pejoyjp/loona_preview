import { index, prefix, type RouteConfig, route } from "@react-router/dev/routes";
import { hydrogenRoutes } from "@shopify/hydrogen";

export default hydrogenRoutes([
  route("robots.txt", "routes/seo/robots.ts"),
  ...prefix(":locale?", [
    index("routes/home.tsx"),
    ...prefix("products", [
      index("routes/products/index.tsx"),
      route(":handle", "routes/products/handle.tsx"),
    ]),
    ...prefix("collections", [
      index("routes/collections/index.tsx"),
      route(":handle", "routes/collections/handle.tsx"),
      route("all-collections", "routes/collections/all-collections.tsx"),
    ]),
    ...prefix("blogs", [
      index("routes/blogs/index.tsx"),
      route(":blogHandle", "routes/blogs/handle.tsx"),
      route(":blogHandle/:articleHandle", "routes/blogs/articles-handle.tsx"),
    ]),
    ...prefix("search", [
      index("routes/search.tsx"),
    ]),
    ...prefix("policies", [
      index("routes/policies/index.tsx"),
      route(":policyHandle", "routes/policies/handle.tsx"),
    ]),
    ...prefix("cart", [
      index("routes/cart/index.tsx"),
      route(":lineHandle", "routes/cart/line.tsx"),
    ]),
    ...prefix("account", [
      index("routes/account/index.tsx"),
      ...prefix("address", [
        index("routes/account/address/index.tsx"),
        route("list", "routes/account/address/handle.tsx"),
      ]),
      ...prefix("auth", [
        route("authorize", "routes/account/auth/authorize.ts"),
        route("login", "routes/account/auth/login.ts"),
        route("logout", "routes/account/auth/logout.ts"),
      ]),
      ...prefix("orders", [
        index("routes/account/orders/index.tsx"),
        route(":orderHandle", "routes/account/orders/handle.tsx"),
      ]),
      route("profile", "routes/account/profile/index.tsx"),
      route("*", "routes/account/catch-all.tsx"),
    ]),
    ...prefix("api", [
      route("products", "routes/api/products.ts"),
      route("countries", "routes/api/countries.ts"),
      route(":version/graphql.json", "routes/api/graphql-version.ts"),
    ]),
    route("*", "routes/catch-all.tsx"),
    route("discount/:code", "routes/discount-code.tsx"),
    route("sitemap.xml", "routes/seo/sitemap.ts"),
    route("sitemap/:type/:page.xml", "routes/seo/sitemap-page.ts"),
  ]),
]) satisfies RouteConfig;
