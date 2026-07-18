import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import Hero from "@/components/home/Hero";

const WorksGallery = lazy(() => import("@/components/home/WorksGallery"));
const OrderProcess = lazy(() => import("@/components/home/OrderProcess"));
const Personalization = lazy(() => import("@/components/home/Personalization"));
const LightingOptions = lazy(() => import("@/components/home/LightingOptions"));
const OtherProducts = lazy(() => import("@/components/home/OtherProducts"));
const Advantages = lazy(() => import("@/components/home/Advantages"));
const Reviews = lazy(() => import("@/components/home/Reviews"));
const CommunityCTA = lazy(() => import("@/components/home/CommunityCTA"));
const FinalCTA = lazy(() => import("@/components/home/FinalCTA"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Home() {
  const [showDeferred, setShowDeferred] = useState(false);

  useEffect(() => {
    const revealDeferredContent = () => setShowDeferred(true);
    const id = window.setTimeout(revealDeferredContent, 2500);

    window.addEventListener("scroll", revealDeferredContent, {
      once: true,
      passive: true,
    });
    window.addEventListener("pointerdown", revealDeferredContent, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", revealDeferredContent, { once: true });

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("scroll", revealDeferredContent);
      window.removeEventListener("pointerdown", revealDeferredContent);
      window.removeEventListener("keydown", revealDeferredContent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-clip">
      <PageBackground />

      <Navbar />

      <main className="flex-1 z-10 relative">
        <Hero />
        {showDeferred && (
          <Suspense fallback={null}>
            <OrderProcess />
            <WorksGallery />
            <Personalization />
            <LightingOptions />
            <OtherProducts />
            <Advantages />
            <Reviews />
            <CommunityCTA />
            <FinalCTA />
          </Suspense>
        )}
      </main>

      {showDeferred && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}
