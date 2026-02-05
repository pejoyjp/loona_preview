import { useRef } from "react";
import { ProductDetails } from "../product-landing/product-details";
import { ProductFaq } from "../product-landing/product-faq";
import { ProductReviews } from "../product-landing/product-reviews";
import { ProductSpecs } from "../product-landing/product-specs";
import { ScrollspyNav } from "~/components/ui/scrollspy-nav";
import type { ProductFragment } from "storefrontapi.generated";

export function ProductLanding({ product }: { product: ProductFragment }) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const sections = [
    { ref: detailsRef, label: "Product Details" },
    { ref: specsRef, label: "Specifications" },
    { ref: reviewsRef, label: "Reviews" },
    { ref: faqRef, label: "FAQ" },
  ];

  return (
    <div className="">
      <ScrollspyNav
        sections={sections}
        className="top-14 left-0 right-0 sticky bg-black/20 text-white z-10 backdrop-blur-md"
      />

      <div ref={detailsRef} id="landing">
        <ProductDetails />
      </div>

      <div className="bg-black ">
        <div className="xl:w-300 m-auto">
          <div ref={specsRef}>
            <ProductSpecs />
          </div>
          <div ref={reviewsRef}>
            <ProductReviews product={product} />
          </div>
          <div ref={faqRef}>
            <ProductFaq />
          </div>
        </div>
      </div>
    </div>
  );
}
