export const LOCALIZATION_OPTIONS_QUERY = `#graphql
  query LocalizationOptions {
    localization {
      availableCountries {
        isoCode
        name
        defaultLanguage{
          isoCode
          name
          endonymName
        }
        availableLanguages{
          isoCode
          name
          endonymName
        }
        currency {
          isoCode
          symbol
        }
      }
    }
  }
` as const;
