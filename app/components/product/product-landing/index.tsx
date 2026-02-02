import { useRef } from "react";
import { ProductDetails } from "../product-landing/product-details";
import { ProductFaq } from "../product-landing/product-faq";
import { ProductReviews } from "../product-landing/product-reviews";
import { ProductSpecs } from "../product-landing/product-specs";
import { ScrollspyNav } from "~/components/ui/scrollspy-nav";

export function ProductLanding() {
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
    <div>
      <ScrollspyNav sections={sections} />

      <div className="">
        <div ref={detailsRef} className="w-full h-screen">
          <ProductDetails />
        </div>
        <div ref={specsRef}>
          <ProductSpecs />
        </div>
        <div ref={reviewsRef}>
          <ProductReviews />
        </div>
        <div ref={faqRef}>
          <ProductFaq />
        </div>
      </div>
    </div>
  );
}
