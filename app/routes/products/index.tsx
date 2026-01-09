import { useTranslationContext } from "~/hooks/use-translation-context";

export async function loader() {}

export default function AllProducts() {
  const { t } = useTranslationContext();

  return (
    <div className=" h-[300px]">
      <h1 className="text-3xl">{t["home.hero.cta"]}</h1>
    </div>
  );
}
