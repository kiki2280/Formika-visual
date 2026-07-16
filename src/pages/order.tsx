import { lazy, Suspense, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import ProductTypeSelector from "@/components/ProductTypeSelector";
import SectionHeading from "@/components/home/SectionHeading";
import type { ProductType } from "@/lib/types";

const FrameBuilder = lazy(() => import("@/components/FrameBuilder"));
const KeychainBuilder = lazy(() => import("@/components/KeychainBuilder"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Order() {
  const [selected, setSelected] = useState<ProductType>(null);
  const [confirmed, setConfirmed] = useState(false);

  const selectProduct = (type: ProductType) => {
    setSelected(type);
    setConfirmed(Boolean(type));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backToProducts = () => {
    setConfirmed(false);
    setSelected(null);

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
                eyebrow="Начните с формата"
                title="Создайте свою уникальную композицию"
                subtitle="Выберите тип товара — дальше мы проведём вас по всем шагам сборки."
              />
            </div>

            <ProductTypeSelector
              selected={selected}
              onSelect={selectProduct}
            />
          </>
        ) : (
          <>
            {selected !== "frame" && (
              <button
                type="button"
                onClick={backToProducts}
                className="
                  mb-6 inline-flex items-center gap-1.5
                  font-sans text-sm font-semibold
                  text-muted-foreground
                  transition-colors duration-200
                  hover:text-primary
                "
                data-testid="btn-back-to-products"
              >
                <ChevronLeft className="h-4 w-4" />
                Назад к выбору товара
              </button>
            )}

            <Suspense
              fallback={
                <div className="min-h-[420px] animate-pulse rounded-3xl border border-border bg-card/60" />
              }
            >
              {selected === "frame" && (
                <FrameBuilder onExit={backToProducts} />
              )}

              {selected === "keychain" && <KeychainBuilder />}
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
