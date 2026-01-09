export const CUSTOMER_UPDATE_MUTATION = `#graphql
mutation customerUpdate(
  $customer: CustomerUpdateInput!
  $customerAccessToken: String!
) {
  customerUpdate(
    customer: $customer
    customerAccessToken: $customerAccessToken
  ) {
    userErrors {
      field
      message
    }
  }
}
`;
