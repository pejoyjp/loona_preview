import type { SeoConfig } from "@shopify/hydrogen";
import type { Article, Blog, Page, ShopPolicy } from "@shopify/hydrogen/storefront-api-types";
import type { BreadcrumbList } from "schema-dts";
import { truncate } from "./utils";

export function home(): SeoConfig {
  return {
    title: "Home",
    titleTemplate: "%s | Weaverse Hydrogen Demo Store",
    description: "The best Shopify Hydrogen Theme Customizer",
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Home page",
    },
  };
}

export function article({
  article: articleData,
  url,
}: {
  article: Pick<Article, "title" | "contentHtml" | "seo" | "publishedAt" | "excerpt"> & {
    image?: null | Pick<NonNullable<Article["image"]>, "url" | "height" | "width" | "altText">;
  };
  url: Request["url"];
}): SeoConfig {
  return {
    title: articleData?.seo?.title ?? articleData?.title,
    description: truncate(articleData?.seo?.description ?? ""),
    titleTemplate: "%s | Journal",
    url,
    media: {
      type: "image",
      url: articleData?.image?.url,
      height: articleData?.image?.height,
      width: articleData?.image?.width,
      altText: articleData?.image?.altText,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      alternativeHeadline: articleData.title,
      articleBody: articleData.contentHtml,
      datePublished: articleData?.publishedAt,
      description: truncate(articleData?.seo?.description || articleData?.excerpt || ""),
      headline: articleData?.seo?.title || "",
      image: articleData?.image?.url,
      url,
    },
  };
}

export function blog({
  blog: blogData,
  url,
}: {
  blog: Pick<Blog, "seo" | "title">;
  url: Request["url"];
}): SeoConfig {
  return {
    title: blogData?.seo?.title,
    description: truncate(blogData?.seo?.description || ""),
    titleTemplate: "%s | Blog",
    url,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: blogData?.seo?.title || blogData?.title || "",
      description: blogData?.seo?.description || "",
      url,
    },
  };
}

export function page({
  page: pageData,
  url,
}: {
  page: Pick<Page, "title" | "seo">;
  url: Request["url"];
}): SeoConfig {
  return {
    description: truncate(pageData?.seo?.description || ""),
    title: pageData?.seo?.title ?? pageData?.title,
    titleTemplate: "%s | Page",
    url,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageData.title,
    },
  };
}

export function policy({
  policy: policyData,
  url,
}: {
  policy: Pick<ShopPolicy, "title" | "body">;
  url: Request["url"];
}): SeoConfig {
  return {
    description: truncate(policyData?.body ?? ""),
    title: policyData?.title,
    titleTemplate: "%s | Policy",
    url,
  };
}

export function policies({
  policies: policiesData,
  url,
}: {
  policies: Pick<ShopPolicy, "title" | "handle">[];
  url: Request["url"];
}): SeoConfig {
  const origin = new URL(url).origin;
  const itemListElement: BreadcrumbList["itemListElement"] = policiesData
    .filter(Boolean)
    .map((pol, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        name: pol.title,
        item: `${origin}/policies/${pol.handle}`,
      };
    });
  return {
    title: "Policies",
    titleTemplate: "%s | Policies",
    description: "Weaverse Hydrogen store policies",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        description: "Weaverse Hydrogen store policies",
        name: "Policies",
        url,
      },
    ],
  };
}
