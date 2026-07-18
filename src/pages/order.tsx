import { lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import ProductTypeSelector from "@/components/ProductTypeSelector";
import SectionHeading from "@/components/home/SectionHeading";
import type { ProductType } from "@/lib/types";
import { useTranslation } from "react-i18next";
import {
  ORDER_PRODUCT_TYPE_STORAGE_KEY,
  clearBuilderState,
  isStoredProductType,
  loadBuilderState,
  saveBuilderState,
} from "@/lib/builderPersistence";

const FrameBuilder = lazy(() => import("@/components/FrameBuilder"));
const KeychainBuilder = lazy(() => import("@/components/KeychainBuilder"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Order() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<ProductType>(
    () =>
      loadBuilderState(
        ORDER_PRODUCT_TYPE_STORAGE_KEY,
        isStoredProductType,
      ) ?? null,
  );

  const confirmed = selected !== null;

  const selectProduct = (type: ProductType) => {
    setSelected(type);

    if (type) {
      saveBuilderState(ORDER_PRODUCT_TYPE_STORAGE_KEY, type);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleReturnToProductSelection = () => {
    setSelected(null);
    clearBuilderState(ORDER_PRODUCT_TYPE_STORAGE_KEY);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {!confirmed ? (
          <>
            <div className="mb-10 md:mb-12">
              <SectionHeading
                eyebrow={t("orderSelection.eyebrow")}
                title={t("orderSelection.title")}
                subtitle={t("orderSelection.subtitle")}
              />
            </div>

            <ProductTypeSelector
              selected={selected}
              onSelect={selectProduct}
            />
          </>
        ) : (
          <>
            <Suspense
              fallback={
                <div className="min-h-[420px] animate-pulse rounded-3xl border border-border bg-card/60" />
              }
            >
              {selected === "frame" && (
                <FrameBuilder
                  onReturnToProductSelection={handleReturnToProductSelection}
                />
              )}

              {selected === "keychain" && (
                <KeychainBuilder
                  onReturnToProductSelection={handleReturnToProductSelection}
                />
              )}
            </Suspense>
          </>
        )}
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
