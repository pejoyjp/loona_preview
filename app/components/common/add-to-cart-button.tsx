import { CartForm, type OptimisticCartLineInput } from "@shopify/hydrogen";
import type { FetcherWithComponents } from "react-router";
import { Button } from "../ui/button";

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  variant,
  onClick,
  className,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "link"
    | "destructive"
    | "ghost"
    | null
    | undefined;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <CartForm route="/cart" inputs={{ lines }} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
          <Button
            type="submit"
            variant={variant}
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== "idle"}
            className={className}
          >
            {children}
          </Button>
        </>
      )}
    </CartForm>
  );
}
