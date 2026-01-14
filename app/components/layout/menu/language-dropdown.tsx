import { Link } from "react-router";
import { addLocaleToPath, type Locale } from "~/data/countries";
import { cn } from "~/lib/utils";

export function LanguageDropdown({
  locales,
  currentLanguage,
  pathname,
  isExpanded,
  search,
}: {
  locales: Locale[];
  currentLanguage?: string;
  pathname: string;
  isExpanded: boolean;
  search: string;
}) {
  return (
    <div
      className={cn(
        "w-full flex flex-col absolute bg-muted",
        "transition-all duration-200 ease-out",
        isExpanded
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none"
      )}
    >
      {locales.map((locale) => {
        if (currentLanguage && locale.language === currentLanguage) return null;

        const pathWithLocale = addLocaleToPath(pathname, locale, locales);
        const href = `https://${locale.host}${pathWithLocale}${search}`;

        return (
          <Link
            key={locale.language}
            to={href}
            className="text-muted-foreground flex justify-center items-center hover:bg-secondary h-12 border-t"
          >
            {locale.language}
          </Link>
        );
      })}
    </div>
  );
}
