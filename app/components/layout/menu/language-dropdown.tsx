import { Link } from "react-router";
import { addLocaleToPath, type Locale } from "~/data/countries";

export function LanguageDropdown({
  locales,
  currentLanguage,
  pathname,
  search,
}: {
  locales: Locale[];
  currentLanguage?: string;
  pathname: string;
  search: string;
}) {
  return (
    <div className="w-full flex flex-col absolute bg-muted">
      {locales.map((locale) => {
        if (currentLanguage && locale.language === currentLanguage) return null;

        const pathWithLocale = addLocaleToPath(pathname, locale, locales);
        const href = `https://${locale.host}${pathWithLocale}${search}`;

        return (
          <Link key={locale.language} to={href} className="text-muted-foreground flex justify-center items-center hover:bg-secondary h-12 border-t">
            {locale.language}
          </Link>
        );
      })}
    </div>
  );
}
