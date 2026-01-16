import { DynamicFlag } from "@sankyu/react-circle-flags";
import { ChevronDownIcon } from "lucide-react";
import { Form } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Locale } from "~/data/countries";

type LanguageDropDownProps = {
  locales: Locale[];
  selectedLocale: Locale;
  pathWithSearch: string;
  className?: string;
};

export function LanguageDropDown({
  locales,
  selectedLocale,
  pathWithSearch,
  className,
}: LanguageDropDownProps) {
  const activeLocale =
    locales.find(
      (locale) =>
        locale.language === selectedLocale.language && locale.country === selectedLocale.country,
    ) ?? locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <button
          type="button"
          className="flex flex-col bg-muted hover:bg-muted/80 overflow-hidden group relative w-full"
          aria-label={`${activeLocale.country} locale options`}
        >
          <div className="flex">
            <div className="flex items-center gap-3">
              <DynamicFlag code={activeLocale.country} height={24} width={24} />
              <p>{activeLocale.label}</p>
            </div>
            <div className="flex items-center gap-4 transition-transform duration-300 absolute -right-8 group-hover:-translate-x-8 group-data-[state=open]:-translate-x-8">
              <p>{activeLocale.language}</p>
              <ChevronDownIcon className="size-4" />
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full ">
        {locales.map((locale) => {
          const localeKey = `${locale.language}-${locale.country}`;
          const isActive =
            locale.language === selectedLocale.language &&
            locale.country === selectedLocale.country;

          return (
            <Form method="post" action="/locale" key={localeKey}>
              <input type="hidden" name="language" value={locale.language} />
              <input type="hidden" name="country" value={locale.country} />
              <input type="hidden" name="path" value={pathWithSearch} />
              <DropdownMenuItem asChild disabled={isActive}>
                <button
                  type="submit"
                  className={`flex w-full items-center justify-between ${
                    isActive ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isActive}
                >
                  <span className="flex items-center gap-3">
                    <DynamicFlag code={locale.country} height={20} width={20} />
                    <span className="text-left">{locale.label}</span>
                  </span>
                  <span className="text-muted-foreground">{locale.language}</span>
                </button>
              </DropdownMenuItem>
            </Form>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
