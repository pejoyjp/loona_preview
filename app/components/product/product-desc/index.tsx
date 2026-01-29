import { useRef } from "react";
import { ProductDetails } from "./product-details";
import { ProductFaq } from "./product-faq";
import { ProductReviews } from "./product-reviews";
import { ProductSpecs } from "./product-specs";
import { ScrollspyNav } from "~/components/ui/scrollspy-nav";

export function ProductDesc() {
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

      <div className="space-y-6">
        <div ref={detailsRef}>
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
