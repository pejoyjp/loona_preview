import { ProductCarousel } from "~/components/product/product-carousel";
import { ProductDesc } from "~/components/product/product-desc/index";
import { ProductFaq } from "~/components/product/product-desc/product-faq";
import { useTranslationContext } from "~/hooks/use-translation-context";

export async function loader() {}

export default function Products() {
  const { t } = useTranslationContext();

  return (
    <div className="">
      <div>
        <h1 className="text-3xl">{t("loona.desc", { test: "game", desc: "cool" })}</h1>
      </div>
      <ProductCarousel />
      <ProductDesc />
    </div>
  );
}
