// app/routes/api.predictive-search.tsx
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { storefront } = context;
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q") || "";

  // 使用 Storefront API 的 predictiveSearch 进行高效查询
  const data = await storefront.query(PREDICTIVE_SEARCH_QUERY, {
    variables: { query: searchTerm },
  });

  return data.predictiveSearch;
}

const PREDICTIVE_SEARCH_QUERY = `#graphql
  query SimplePredictiveSearch($query: String!) {
    predictiveSearch(query: $query, limit: 5) {
      queries { text }
      products {
        id
        title
        handle
        trackingParameters
        variants(first: 1) { nodes { image { url } } }
      }
    }
  }
`;
